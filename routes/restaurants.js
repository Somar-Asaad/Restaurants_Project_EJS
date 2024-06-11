const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const { getStoredRestaurants, writeRestaurants } = require("../utils/utils");

router.get("/restaurants", function (req, res) {
  const storedRestaurants = getStoredRestaurants();
  let nextOrder = "desc";
  let orderName = req.query.order;

  if (orderName !== "asc" && orderName !== "desc") {
    orderName = "asc";
  }

  if (orderName === "desc") {
    nextOrder = "asc";
  }

  storedRestaurants.sort(function (resA, resB) {
    if (
      (orderName === "asc" && resA.name > resB.name) ||
      (orderName === "desc" && resA.name < resB.name)
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    order: nextOrder,
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const storedRestaurants = getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", {
        rid: restaurantId,
        restaurant: restaurant,
      });
    }
  }
  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuidv4();
  const storedRestaurants = getStoredRestaurants();

  storedRestaurants.push(restaurant);

  writeRestaurants(storedRestaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});
module.exports = router;
