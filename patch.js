'use strict'

const express = require("express");

const { items } = require("./fakeDb");
const router = new express.Router();

// /** GET /users: get list of users */
// router.get("/", function (req, res) {
//   return res.json(db.User.all());
// });

// /** DELETE /users/[id]: delete user, return {message: Deleted} */
// router.delete("/:id", function (req, res) {
//   db.User.delete(req.params.id);
//   return res.json({ message: "Deleted" });
// });

router.patch("/:name", function (req, res) {
  debugger;
  for (let item of items) {
    if (item.name === req.params.name) {
      item.price = req.body.price;
      item.name = req.body.name;
      return res.json({ updated: item });
    }
  }
});

module.exports = router;