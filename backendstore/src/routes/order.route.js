const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");


router.post("/orders", orderController.createOrder);
router.get("/orders/user/:userId", orderController.getOrdersByUserId);
router.get("/orders", orderController.getAllOrders);
router.put("/orders/:id", orderController.updateOrder);

module.exports = router;