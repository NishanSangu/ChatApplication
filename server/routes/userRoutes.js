const router = require("express").Router();
const userfunctions  = require("../controllers/usersControllers");

router.post("/register", userfunctions.signup);
router.post("/login", userfunctions.login)
router.post("/setavatar/:id", userfunctions.setAvatar)

module.exports = router;