import * as express from "express";

const router = express.Router();

//get /user router
router.get("/", (req, res) => {
  res.send("Hello, User");
});

module.exports = router;
