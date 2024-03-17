const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

const productList = [
  {
    id: 1,
    title: "Apple Book",
    price: 3000,
    description: "ABC",
    imageURL:
      "hinh1.jpg",
  },
  {
    id: 2,
    title: "Microsoft Book",
    price: 2000,
    description: "ABC",
    imageURL:
      "hinh1.jpg",
  },
  {
    id: 3,
    title: "VFast Book",
    price: 1000,
    description: "ABC",
    imageURL:
      "hinh1.jpg",
  },
  {
    id: 4,
    title: "LG Book",
    price: 4000,
    description: "ABC",
    imageURL:
      "hinh1.jpg",
  },
];

app.get("/", (req, res) => {
  res.render("home.ejs", {products: productList});
});

app.get("/product", (req, res) => {
  res.send(`<p>Đây là trang Product</p>`);
});

app.get("/addnew", (req, res) => {
  res.render("addnew.ejs");
});

app.get("/shop", (req, res) => {
  res.render("shop.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
