const express = require("express");
const {
  createList,
  getLists,
  updateList,
  createItem,
  getItems,
  getItem,
  updateItem,
} = require("../controller/userController");

const router = express.Router();

router.post("/create-list", createList);
router.get("/get-lists", getLists);
router.patch("/update-list/:listId", updateList);
router.post("/add-item/:listId", createItem);
router.get("/list-items/:listId", getItems);
router.get("/list-items/:listId/item/:itemId", getItem);
router.patch("/list-items/:listId/item/:itemId", updateItem);

module.exports = {
  routes: router,
};
