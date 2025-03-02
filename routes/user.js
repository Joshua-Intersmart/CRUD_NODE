const express = require("express");
const { fetchOneUser, updateUser } = require("../controller/user");
const router = express.Router();

router.get("/:id", fetchOneUser);
router.put("/:id", updateUser);

module.exports = router;
