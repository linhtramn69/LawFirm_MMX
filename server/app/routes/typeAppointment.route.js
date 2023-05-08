const express = require("express");
const typeAppointment = require("../controllers/typeAppointment.controller")

const router = express.Router();

router.route("/")
    .get(typeAppointment.findAll)
    .post(typeAppointment.create);

router.route("/:id")
    .get(typeAppointment.findById)
    .put(typeAppointment.update)
    .delete(typeAppointment.delete);

module.exports = router;