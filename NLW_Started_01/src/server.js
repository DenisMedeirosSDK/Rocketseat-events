const express = require('express');
const nunjuck = require('nunjucks');
const db = require('./database/db');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended:true }));

server.use(express.static('public'));

// Template engine
nunjuck.configure('src/views', {
  express: server,
  noCache: true
})

server.get('/', (request, response) => {
  return response.render('index.html')
});

server.get('/createpoint', (request, response) => {
  const {  } = request.query;

  return response.render('createpoint.html')
});

server.post('/savepoint',(request, response) => {
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items

    ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [
   request.body.image,
   request.body.name,
   request.body.address,
   request.body.address2,
   request.body.state,
   request.body.city,
   request.body.items
  ]
  function afterInsertData(err){
    if(err){
      console.log(err)
      return response.send("Erro no cadastro!")
    }

    console.log("Cadastrado com sucesso");
    console.log(this)
    return response.render("createpoint.html",{ saved: true });
  }
  db.run(query, values, afterInsertData);
})

server.get('/search', (request, response) => {
  const search = request.query.search;
  if(search == ''){
    return response.render('searchResults.html', {total : 0});
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){

    if(err){
      console.log(errr)
    }

    const total = rows.length

    return response.render('searchResults.html', {places: rows, total});
  })

});

server.listen(3000);