const express = require("express");
const degree = require("../controllers/degree.controller");

const router = express.Router();

router.route("/")
    .get(degree.findAll)
    .post(degree.create);

router.route("/:id")
    .get(degree.findById)
    .patch(degree.update)
    .delete(degree.delete);

router.route("/findByStaff/:id")
    .get(degree.findByStaff)

module.exports = router;