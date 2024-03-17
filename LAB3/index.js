const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3300;
const mysql = require("mysql");

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'bookstore'
});

var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));




app.get("/", (req, res) => {
    let sql = `SELECT * FORM products`;
    db.query(sql, function(err, data) {
        if (err) throw err
        res.render("home.ejs", {products: data});
    })
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`);
  });