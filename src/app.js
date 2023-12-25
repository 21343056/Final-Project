const { MongoClient } = require("mongodb");
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../modules/order");
const hbs = require("hbs");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

mongoose.connect("mongodb://localhost:27017/tokoCuciSepatu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Halaman Index
app.get("", (req, res) => {
  res.render("index", {
    title: "",
    name: "",
  });
});

// Halaman Tracking
app.get("/Tracking", (req, res) => {
  res.render("tracking", {
    title: "Cek Resi",
    teksKeranjang: "",
    name: "",
  });
});

// Halaman Service_Menu
app.get("/Service_Menu", (req, res) => {
  res.render("service_menu", {
    title: "",
    teksKeranjang: "",
    name: "",
  });
});

// Halaman Pricelist
app.get("/Pricelist", (req, res) => {
  res.render("pricelist", {
    title: "",
    teksKeranjang: "",
    name: "",
  });
});

// Halaman Order
app.get("/Order", (req, res) => {
  res.render("order", {
    title: "",
    teksKeranjang: "",
    name: "",
  });
});

// database mongoDB : untuk menyimpan data
app.post("/input_data", async (req, res) => {
  const data = req.body;
  const client = new MongoClient("mongodb://localhost:27017/");

  try {
    await client.connect();
    const db = client.db("tokoCuciSepatu");
    const orders = db.collection("order");
    const result = await orders.insertOne(data);
    res.redirect("/keranjang");
    // res.send(`Successfully added data with ID: ${result.insertedId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add data to database");
  } finally {
    await client.close();
  }
});

// database mongoDB : untuk mengambil data
app.get("/keranjang", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("tokoCuciSepatu");
    const orders = db.collection("order");

    const result = await orders.find({}).toArray();

    res.render("keranjang", { orders: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch data from database");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
