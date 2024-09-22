const express = require("express");
const router = express.Router();
const vesselController = require("../controllers/vessel.controller");

router.get("/", vesselController.getVessels);

module.exports = router;
