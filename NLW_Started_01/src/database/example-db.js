// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./src/database/database.db');

db.serialize(() => {
/* //Cria o banco dados
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)
  */

/* // Inserir um dado no bando de dados
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

db.run(query);

const values = [
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "Papersider",
  "Guilherme Gemballa, Jardim América",
  "Nº 260",
  "Santa Catarina",
  "Rio do Sul",
  "Resíduos Eletronicos, Lâmpadas"
]
function afterInsertData(err) {
  if (err) {
    return console.log(err)
  }

  console.log("Cadastrado com sucesso");
  console.log(this)
}

*/

/* // Seleciona dado do banco de dados
db.all(`SELECT * FROM places`, function (err, rows) {
  if (err) {
    return console.log(err)
  }

  console.log('Aqui estão seus registro:');
  console.log(rows);
})

*/

/* // Deleta um dado com do banco de dados usando o id

db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
  if (err) {
    return console.log(err)
  }

  console.log("Registro deletado com sucesso.")
})

*/
})

// module.exports = db