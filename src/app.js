const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url , techs} = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  repositories.push(repository)
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repository = repositories.findIndex(repos => repos.id === id);
  if(repository < 0){
    return response.status(400).send();
  }

  const { title, url , techs} = request.body;

  repositories[repository].title = title;
  repositories[repository].url = url;
  repositories[repository].techs = techs;
  
  return response.json(repositories[repository])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repository = repositories.findIndex(repos => repos.id === id);
  if(repository < 0){
    return response.status(400).send();
  }
  repositories.splice(repository,1);
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.findIndex(repos => repos.id === id);
  
  if(repository < 0){
    return response.status(400).send();
  }
  
  repositories[repository].likes += 1;

  return response.json(repositories[repository]);  
});

module.exports = app;
