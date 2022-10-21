const router = require("express").Router();
const userfunctions  = require("../controllers/usersControllers");

router.post("/register", userfunctions.login);

module.exports = router;