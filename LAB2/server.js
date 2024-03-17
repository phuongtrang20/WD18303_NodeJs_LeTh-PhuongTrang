const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');

const app = express();
const port = 3300;


var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/home", (req, res) => {
  var today = new Date();
  currentDay = today.getDay();
  var day = "";
  switch (currentDay) {
    case 0:
      day = "Chủ nhật";
      break;
    case 1:
      day = "Thứ 2";
      break;
    case 2:
      day = "Thứ 3";
      break;
    case 3:
      day = "Thứ 4";
      break;
    case 4:
      day = "Thứ 5";
      break;
    case 5:
      day = "Thứ 6";
      break;
    case 6:
      day = "Thứ 7";
      break;

    default:
      console.log(`Error: ${currentDay}`);
  }
  res.render("home.ejs", { kindOfDay: day });
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/shop", (req, res) => {
  res.render("shop.ejs", { products: listProduct });
});

app.get("/add-product", (req, res) => {
  res.render("add-product.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});

var listProduct = [
  {
    id: 1,
    title: "Apple Book",
    price: 3000,
    description: "ABC",
    imageURL: "hinh1.png",
  },
  {
    id: 2,
    title: "Microsoft Book",
    price: 2000,
    description: "ABC",
    imageURL: "hinh1.png",
  },
  {
    id: 3,
    title: "VFast Book",
    price: 1000,
    description: "ABC",
    imageURL: "hinh1.png",
  },
  {
    id: 4,
    title: "LG Book",
    price: 4000,
    description: "ABC",
    imageURL: "hinh1.png",
  },
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/images');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

app.post('/addnew', upload.single('productImage'), (req, res) => {
  const file = req.file;
  const title = req.body['product-name'];
  const price = req.body['product-price'];
  const description = req.body['product-description'];
  const imageName = file.filename;

  const newProduct = {
      id: listProduct.length + 1,
      title: title,
      price: price,
      description: description,
      imageURL: imageName
  };

  listProduct.push(newProduct);

  res.redirect('/shop');
});

app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = listProduct.find(item => item.id === productId);
  if (!product) {
      res.status(404).send("Product not found");
      return;
  }
  res.render('product-detail', { product: product });
});