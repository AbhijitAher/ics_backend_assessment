const express = require("express");
const {
  sendBookNotification
} = require("../controllers/notifyController");

const router = express.Router();

router.post("/send-book-notification", sendBookNotification);

module.exports = router;
