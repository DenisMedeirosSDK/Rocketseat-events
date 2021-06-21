import express from "express";

const app = express();

/*
  GET => Buscar uma informação
  POST => Inserir (Ciar) uma informação
  PUT => Alterar uma informação
  DELETE => Remover um dado
  PATCH => Alterar uma informação especifica
*/

app.get("/test", (request, response) => {
  // Request => Entrando
  // Response => Saindo

  return response.send("Olá NLW");
});

app.post("/test-post", (request, response) => {
  return response.send("Olá NLW método POST");
});

app.listen(3333, () => console.log("Server is running"));
