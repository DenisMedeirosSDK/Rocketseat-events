### Como executar o projeto 🕹

Instalar as dependencia com `yarn` ou `npm install`

Execute as migrations `yarn knex:migrate` ou `npm knex:migrate`

Executar o projeto `yarn dev` ou `npm dev`

A porta usada é 3333 mas pode ser modificada em `src/server.ts`

```ts
  server.listen(3333)
```

Rotas disponiveis ✔

* POST `/classes` Criar usuario, categoria e agenda

* GET `/classes` Lista o usuario

  FILTROS
  * Por dia,
  * Horário
  * Matéria

* POST `/connections` Cria uma conexão do usuario

* GET `/connections` Lista um total de conexão
