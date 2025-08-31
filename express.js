const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;
const { products } = require(path.join(__dirname, "data", "products"));


main().then(()=>{
  console.log("Connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/products');
}


app.listen(port, () => {
  console.log(`GAURI app is running at http://localhost:${port}`);                            
}); 

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cart.html"));
});

app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "checkout.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// API: Products
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/new-arrivals", (req, res) => {
  res.json(products.newArrivals || []);
});

app.get("/api/products/summer-collection", (req, res) => {
  res.json(products.summerCollection || []);
});

app.get("/api/products/all", (req, res) => {
  res.json(products.allProducts || []);
});
