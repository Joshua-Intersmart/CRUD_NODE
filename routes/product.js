const express = require("express");
const { fetchAllProduct, fetchOneProduct, createProduct, updateProduct, deleteProduct } = require("../controller/product");
const router = express.Router();

router.get("/", fetchAllProduct);
router.get("/:id", fetchOneProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
