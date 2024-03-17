const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;
var jsonParser = bodyParser.json();

const productList = [];

app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.send(`<p>Đây là trang Home</p>`);
});

app.get("/product", (req, res) => {
  res.send(`<p>Đây là trang Product</p>`);
});

app.get("/add-product", (req, res) => {
  res.send(
    `<strong>Đây là trang Add-Product</strong>
    <form action="/product" method="POST" enctype="application/x-www-form-urlencoded">
      <input type="text" placeholder="productName" name="productName">
      <button type="submit">Add Product</button>
    </form>`
  );
});

app.post("/product", jsonParser, function (req, res) {
  console.log(req.body.productName);
  productList.unshift(req.body.productName);
  res.send(req.body);
});

//Bài 4
const inventors = [
  { id: 1, first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { id: 2, first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { id: 3, first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { id: 4, first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { id: 5, first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { id: 6, first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
];

app.get("/inventors", (req, res) => {
  let list = "<h2>Danh sách nhà khoa học<ul>";
  inventors.forEach((e) => {
    list += `<li><a style="text-decoration:none;color:green;" href="/inventor/${e.id}">${e.last}</a></li>`;
  });
  list += "</ul></h2>";
  res.send(list);
});

app.get("/inventor/:id", (req, res) => {
  let id = req.params.id;
  inventor = inventors.find((e) => e.id == id);
  info = `<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year}, Passed: ${inventor.passed}</h2>`;
  res.send(info);
});

app.get("/add-inventor", (req, res) => {
  res.send('<h1>Thêm Nhà Khoa Học</h1><form action="/inventor" method="POST"><input type="text"name="first" placeholder="input first name"><input type="text" name="last" placeholder="input last name"><br><inputtype="number" name="year" placeholder="Year"><input type="number" name="passed" placeholder="passed"><br><button type="submit">Add Product</button></form>');
});

app.post("/inventor", (req, res) => {
  let newInventor = req.body;
  newInventor.id = inventors.length + 1;
  inventors.push(newInventor);
  res.redirect("/inventors");
});

//Bài thêm
const baithem = [
  {
    id: 1,
    name: "laptop",
    price: 2000,
    shortDescription: "Laptop là thiết bị di động dùng để làm việc và giải trí.",
    description: "Laptop là một thiết bị di động có kích thước nhỏ gọn, được thiết kế để mang lại tính linh hoạt và tiện lợi cho người dùng khi làm việc, giải trí hoặc học tập.",
    images: ["https://laptopsieure.vn/image/cache/catalog/hinh-sp/asus/x515/asus-x515-core-i3-1115g4-ram-8gb-ssd-256gb-fhd-900x900.jpg", "https://product.hstatic.net/200000837185/product/stealth-14-studio-3_e46ae9abb80d4d74898fe7712644d064_master.jpg"],
    comments: []
  },

  {
      id: 2,
      name: "Điện thoại",
      price: 3000,
      shortDescription: "Điện thoại là thiết bị di động có thể gọi, nhắn tin và truy cập internet.",
      description: "Điện thoại là thiết bị di động tích hợp chức năng gọi điện, nhắn tin và truy cập internet.",
      images: ["https://didonghan.vn/pic/product/iphone-13-pro-max-quoc-te-256gb-mau-kem_638320160738904925.jpg.ashx?w=100.ashx?w=100", "https://xiaominamdinh.com.vn/pic/product/xiaomi-redmi-note-12-4gb_128gb-new-100-xanh-da-tro_638341965214510948.jpg.ashx?w=100.ashx?w=100"],
      comments: []
  }
];

app.get("/baithem", (req, res) => {
  let list = "<h2>Bài thêm<ul>";
  baithem.forEach((e) => {
      list += `<li><a style="text-decoration:none;color:green;" href="/baithem/${e.id}">${e.name}</a></li>`;
  });
  list += "</ul></h2>";
  res.send(list);
});

app.get("/baithem/:id", (req, res) =>{
  let id = req.params.id;
  let product = baithem.find((e) => e.id == id);
  let info = `<h2>Thông tin chi tiết sản phẩm: Tên sản phẩm: ${product.name}, Gía sản phẩm: ${product.price}, Mô tả ngắn:${product.shortDescription}, Mô tả chi tiết: ${product.description}</h2>`;
  let images = "<h3>Hình ảnh sản phẩm:</h3><ul>";
  product.images.forEach((image) => {
      images += `<li><img src="${image}" alt=""></li>`
  });
  images += "</ul>";
  
  let commentsBaithem = `
      <h3>Bình luận và đánh giá:</h3>
      <form action="/baithem/${id}/comment" method="POST" enctype="application/json">
          <textarea name="comment" placeholder="Nhập bình luận của bạn"></textarea><br>
          <button type="submit">Gửi bình luận</button>
      </form>
      <ul>
          ${product.comments.map(comment => `<li>${comment}</li>`).join('')}
      </ul>
  `;

  console.log(commentsBaithem); 
  
  res.send(info + images + commentsBaithem);
})

app.post("/baithem/:id/comment", jsonParser, (req, res) => {
  let id = req.params.id;
  let product = baithem.find((item) => item.id == id);
  if (!product) {
      return res.status(404).send("Sản phẩm không tồn tại");
  }
  let comment = req.body.comment;
  product.comments.push(comment);
  res.redirect(`/baithem/${id}`);
});


app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});






