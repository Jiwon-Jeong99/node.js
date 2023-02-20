import * as express from "express";

const router = express.Router();

// get / router
router.get("/", (req, res) => {
  res.send("Hello, Express");
});

module.exports = router;
