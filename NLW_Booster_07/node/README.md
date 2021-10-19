# NLW 07 - Node

## 📝 Projeto

Esse projeto backend feito para a NLW 07 Heat, tem como o objetivo cadastrar menssagem de usuários em tempo real. Para isso usamos o OAuth do Github juntamente com prisma para salvar as informações do usuário e suas mensagens.

## 🛠 Tecnologias

- [NodeJS](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io/)
- [Socket.io](https://socket.io/)
- [OAuth - Github](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
- [JWT](https://jwt.io/)

---

## Executando

```bash
$ git clone https://github.com/DenisMedeirosSDK/Rocketseat-events.git

$ cd Rocketseat-events/NLW_Booster_07/node

$ npm install

$ npx prisma migrate dev
```

### Rotas

- **POST** : `/authenticate` Cria uma sessão de autenticação do usuário.
- **POST** : `/messages` Cria uma nova menssagem.
- **GET** : `/messages/last3` Lista as últimas 3 menssagens cadastradas.
- **GET** : `/profile` Lista o perfil do usuário.
- **GET** : `/github` Redireciona para api de login do github.
- **GET** : `/signin/callback` Lista o **CODE** do usuário no github.

Faça o teste das rotas com insomnia com o arquivo dentro de `docs/Insomnia_2021-10-19.json`
