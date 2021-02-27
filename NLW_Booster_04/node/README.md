# 👊 NPS - Net Promoter Score

## Como executar o projeto

Dentro do diretório `node`

Instale as dependência com `yarn` ou `npm install`

Execute as migrations `yarn typeorm migrate:run` ou `npm typeorm migrate:run`

Executar o projeto `yarn dev` ou `npm dev`

A porta usada é 3333 mas pode ser modificada em `src/server.ts`

```ts
app.listen(3333);
```

### Rotas disponíveis ✔

- POST `/users` Cria um usuário.

- GET `/users` Lista todos os usuário.

- POST `/surveys` Criar uma survey.
- GET `/surveys` Lista todas surveys.

- POST `/sendMail` Envia um e-mail.

- GET `answers/:value` Através do e-mail é enviado uma nota.

- GET `nps/:survey_id` Lista o calculo de NPS.

### Debug

Para executar os teste de integração.

Execute `yarn test` ou `npm test`

Para ajudar no debug da aplicação foi usado o insomnia, para obter o projeto completo

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=NLW_03_Happy&uri=https%3A%2F%2Fraw.githubusercontent.com%2FDenisMedeirosSDK%2FRocketseat-events%2Fmaster%2FNLW_Booster_03%2F.github%2FInsomnia_2020-10-14_Happy)
