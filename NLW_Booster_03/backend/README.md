### Como executar o projeto 🕹

Acesse a pasta backend `cd backend`

Instalar as dependencia com `yarn` ou `npm install`

Execute as migrations `yarn typeorm migrate:run` ou `npm typeorm migrate:run`

Executar o projeto `yarn dev` ou `npm dev`

A porta usada é 3333 mas pode ser modificada em `src/server.ts`

```ts
server.listen(3333);
```

### Rotas disponiveis ✔

- GET `/orphanages` Lista todos orfanatos

- GET `/orphanages/:id` Lista um orfanato especifico

- POST `/orphanages` Criar um orfanato

- DELETE `/orphanages/:id` Deleta um orfanato especifico

### Debug

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=NLW_03_Happy&uri=https%3A%2F%2Fraw.githubusercontent.com%2FDenisMedeirosSDK%2FRocketseat-events%2Fmaster%2FNLW_Booster_03%2F.github%2FInsomnia_2020-10-14_Happy)
