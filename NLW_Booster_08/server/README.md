# NLW 08 - Node

## 📝 Projeto

Esse projeto backend feito para a NLW 08 Return, tem como o objetivo cadastrar e enviar menssagens de feedback dos usuários.

## 🛠 Tecnologias

- [NodeJS](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io/)
- [NodeMailer](https://nodemailer.com/)
- [Jest](https://jestjs.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Mailtrap.io](https://mailtrap.io/)
- [SQLite](https://www.sqlite.org/)

---

## Executando

```bash
$ git clone https://github.com/DenisMedeirosSDK/Rocketseat-events.git

$ cd Rocketseat-events/NLW_Booster_08/server

$ npm install
```

Crie um arquivo `.env` com as variáveis de ambiente igual ao arquivo `.env.example`.

Configure o `.env` com suas variáveis de ambiente. Para o envio de email recomendo usar o [mailtrap.io](https://mailtrap.io/) ou [ethreal](https://ethereal.email/) em desenvolvimento.

```bash
$ npx prisma migrate dev # Criação das migrations no banco de dados

$ npm run test # Executar testes unitários

$ npm run dev # http://localhost:3000/
```

### Rotas

- **POST** : `/feedbacks` Cadastra um feedback do usuário.

  - **Body** : `{ "type": "string", "comment": "string", "screenshot": "string" }`
