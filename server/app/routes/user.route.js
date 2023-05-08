const express = require("express");
const user = require("../controllers/user.controller")

const router = express.Router();

router.route("/")
    .get(user.findAll)
    .post(user.create);

router.route("/:id")
    .get(user.findById)
    .put(user.update)
    .delete(user.delete);

router.route("/login")
    .post(user.login);

router.route("/findByBoPhan/:id")
    .get(user.findAllByBoPhan);

router.route("/findByBoss/:id")
    .get(user.findAllByBoss);
    
router.route("/findByMatter")
    .post(user.findByMatter);

module.exports = router;