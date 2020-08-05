### Como executar o projeto 🕹

Instalar as dependencia com `yarn` ou `npm install`

Execute as migrations `yarn knex:migrate` ou `npm knex:migrate`

Executar o projeto `yarn dev` ou `npm dev`

A porta usada é 3333 mas pode ser modificada em `src/server.ts`

```ts
  server.listen(3333)
```

### Rotas disponiveis ✔

* POST `/classes` Criar usuario, categoria e agenda

* GET `/classes` Lista o usuario

  FILTROS
  * Por dia,
  * Horário
  * Matéria

* POST `/connections` Cria uma conexão do usuario

* GET `/connections` Lista um total de conexão


### Debug

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=NLW%2002&uri=https%3A%2F%2Fraw.githubusercontent.com%2FDenisMedeirosSDK%2FRocketseat-events%2Fmaster%2FNLW_Booster_02%2F.github%2FInsomnia_2020-08-04.json)
