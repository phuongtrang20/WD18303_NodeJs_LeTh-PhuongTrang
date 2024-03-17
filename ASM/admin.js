const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require('multer');


const path = require('path');

const port = 3300;

app.use(express.static(path.join(__dirname, 'admin')));

var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
app.set("views", "./admin/views");
app.set("assets", "./admin/assets");



app.use(express.static("./admin/public/img"));



app.get("/", (req, res) => {
    res.render("admin-index", {categories: shoesAdminCategories});
});

app.get("/product", (req, res) => {
    res.render("admin-product", {products: shoesAdminProduct});
});


const shoesAdminProduct = [
    {
        id: 1,
        title: 'NIKE',
        price: 3000,
        description: "Nike là một thương hiệu toàn cầu nổi tiếng với sản phẩm chất lượng cao và sự đổi mới trong ngành công nghiệp thể thao và đời sống hàng ngày.",
        imageURL: "home1.jpg"
    },
    {
        id: 2,
        title: 'Adidas UltraBoost',
        price: 3000,
        description: "Một đôi giày chạy bộ với sự kết hợp hoàn hảo giữa thiết kế đẹp mắt và hiệu suất tuyệt vời.",
        imageURL: "home2.jpg"
    },
    {
        id: 3,
        title: 'Puma Future Rider',
        price: 3000,
        description: "Thiết kế retro với sự thoải mái và độ bền đáng kinh ngạc, phản ánh phong cách cá nhân của bạn.",
        imageURL: "home3.jpg"
    },
    {
        id: 4,
        title: 'New Balance',
        price: 3000,
        description: "Một sự kết hợp tuyệt vời giữa thiết kế hiện đại và sự thoải mái tối đa, phù hợp cho cả đi bộ và chạy bộ.",
        imageURL: "home4.jpg"
    },  {
        id: 5,
        title: 'Under Armour HOVR Infinite',
        price: 3000,
        description: "Sự kết hợp hoàn hảo giữa công nghệ và thiết kế, mang lại trải nghiệm thoải mái và hỗ trợ tốt nhất cho các hoạt động thể chất.",
        imageURL: "home5.jpg"
    },
    {
        id: 6,
        title: 'Reebok Classic Leather',
        price: 3000,
        description: "Kiểu dáng classic, mang đến sự thoải mái và phong cách đầy tự tin cho mỗi bước đi của bạn.",
        imageURL: "home6.jpg"
    },
    {
        id: 7,
        title: 'Asics Gel-Kayano',
        price: 3000,
        description: "Đôi giày chạy bộ cao cấp với công nghệ đệm tốt nhất, giúp giảm căng thẳng và giữ cho đôi chân của bạn luôn trong tình trạng tốt nhất.s!",
        imageURL: "home7.jpg"
    },
    {
        id: 8,
        title: 'Vans Old Skool',
        price: 3000,
        description: "Kiểu dáng retro độc đáo với sự thoải mái và độ bền chắc chắn, phù hợp với nhiều phong cách thời trang.",
        imageURL: "home8.jpg"
    },
]

const shoesAdminCategories= [
    {
        id: 1,
        name: "Nkie"
    },
    {
        id: 2,
        name: "Adidas"
    },
    {
        id: 3,
        name:"Puma"
    }
]





app.listen(port, () => {
    console.log(`Example app listening on port Admin http://127.0.0.1:${port}`);
  });