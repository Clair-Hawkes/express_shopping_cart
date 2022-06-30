"use strict";
/** Simple demo shopping cart app. */

const express = require("express");
const { items } = require("./fakeDb");
// ############## Must import Routing File to use in app.use("/items,userRoutes" line 19)
const userRoutes = require("./patch");

const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { response } = require("express");

app.use(express.json());

app.use("/items", userRoutes);

/** Returns JSON of all items in shopping cart
 * {items: [name: "popsicle", price: 1.45] } */
app.get("/items", function (req, res) {
  debugger;
  return res.json({ items: items });
});

/** Accept JSON body, add item, and return item
 * {added: {name: "popsicle", price: 1.45}}:  */
app.post("/items", function (req, res) {
  // Catch the incoming JSON
  // Push to the Shopping Cart
  // Return {name: "popsicle", price: 1.45}}
  debugger;
  const first = req.body;
  const received = req.body.name;
  items.push(req.body);
  return res.status(201).json({ added: req.body });
});

/** Resturns JSON of single item in shopping cart, matching url param "name" */
app.get("/items/:name", function (req, res) {
  // For of loop through the array
  // Checking for the name of object == req.params.name
  //Return that object
  debugger;
  for (let item of items) {
    if (item.name === req.params.name) {
      return res.json(item);
    }
  }
});

// app.patch("/items/:name", function (req, res) {
//   debugger;
//   for (let item of items) {
//     if (item.name === req.params.name) {
//       item.price = req.body.price;
//       return res.json({ updated: item });
//     }
//   }
// });

app.delete("/items/:name", function (req, res) {
  debugger;
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === req.params.name) {
      items.splice(i, 1);
      return res.json({ message: "Deleted", items: items });
    }
  }
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
