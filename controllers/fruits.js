// controllers/fruits.js
const express = require("express");
const router = express.Router();

const Fruit = require("../models/fruit.js");

router.get("/new", (req, res) => {
  res.render("fruits/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    await Fruit.create(req.body);
    req.session.message = "Fruit successfully created!"
    res.redirect("/fruits");
  } catch (error) {
    res.render("error.ejs", {msg: error.message})
    res.redirect("/fruits");
  };
});

router.get("/", async (req, res) => {
  const foundFruits = await Fruit.find();
  res.status(500).render("fruits/index.ejs", { fruits: foundFruits });
});

module.exports = router;