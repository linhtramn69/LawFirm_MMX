const express = require("express");
const timeAppointment = require("../controllers/timeAppointment.controller")

const router = express.Router();

router.route("/")
    .get(timeAppointment.findAll)
    .post(timeAppointment.create);

router.route("/:id")
    .get(timeAppointment.findById)
    .put(timeAppointment.update)
    .delete(timeAppointment.delete);

router.route("/getByTime")
    .post(timeAppointment.getByTime)

router.route("/findByStaff")
    .post(timeAppointment.findByStaff)
module.exports = router;