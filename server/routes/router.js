const express = require("express");

const router = express.Router();

/* API routes */
router.use("/unit", require("./unitRoutes"));
router.use("/user", require("./userRoutes"));
router.use("/wf_item", require("./wf_itemRoutes"));
router.use("/task", require("./taskRoutes"));

module.exports = router;
