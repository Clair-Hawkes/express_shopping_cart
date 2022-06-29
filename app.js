"use strict";
/** Simple demo shopping cart app. */

const express = require("express");
const {items} = require('./fakeDb');
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");


app.use(express.json());

/** Returns JSON of all items in shopping cart
 * {items: [name: "popsicle", price: 1.45] } */
app.get("/items", function (req, res) {
  debugger
  return res.json({items:items});
});

/** Accept JSON body, add item, and return item
 * {added: {name: "popsicle", price: 1.45}}:  */
app.post('/items',function(req,res){
  // Catch the incoming JSON
  // Push to the Shopping Cart
  // Return {name: "popsicle", price: 1.45}}
  debugger
  const first = req.body;
  const recieved = req.body.name;
  items.push(req.body);
  return res.json({"added":req.body});
})

/** Resturns JSON of single item in shopping cart, matching url param "name" */
app.get('/items/:name',function(req,res){
  // For of loop through the array
  // Checking for the name of object == req.params.name
  //Return that object



})








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
