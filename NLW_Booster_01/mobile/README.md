# Frontend Mobile 📱

## Tecnologia usadas para construção ⛏

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.io/)
* [React Navigation](https://reactnavigation.org/)
* [Axios](https://github.com/axios/axios)
* [Typescript](https://www.typescriptlang.org/)


## Procedimento para executar o frontend 🛠

Execute os seguintes comandos:

`npm install` ou `yarn` para instalar todas as dependencias.

`expo start` para iniciar a aplicação.

Você pode baixar o aplicativo do expo em seu dispositivo e escaniar o QRCODE.

## Debug

Apos iniciar verifique a o IP obtido na pagina de inicialização e troque em `src/services/api.ts`

```ts
  baseURL: 'http://192.168.25.14:3333'
```