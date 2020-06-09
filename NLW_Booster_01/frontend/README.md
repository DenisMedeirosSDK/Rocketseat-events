# Frontend WEB 🖥

## Tecnologia usadas para construção ⛏

* [React](https://pt-br.reactjs.org/)
* [Axios](https://github.com/axios/axios)
* [Typescript](https://www.typescriptlang.org/)
* [Leaflet](https://leafletjs.com/)
* [React leaflet](https://react-leaflet.js.org/)
* [IBGE](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-_)
* [Dropzone](https://github.com/react-dropzone/react-dropzone)


## Procedimento para executar o frontend 🛠

Execute os seguintes comando:

`npm install` ou `yarn` para instalar todas as dependencias.

`npm start` ou `yarn start` para iniciar.


## Debug

Caso tenha trocado a porta no backend sera preciso trocar no arquivo `src/services/api.ts`

```ts
  baseURL: 'http://localhost:3333/'
```