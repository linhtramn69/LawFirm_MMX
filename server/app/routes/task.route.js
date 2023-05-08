const express = require("express");
const task = require("../controllers/task.controller")

const router = express.Router();

router.route("/")
    .get(task.findAll)
    .post(task.create);

router.route("/:id")
    .get(task.findById)
    .put(task.update)
    .delete(task.delete);

router.route("/findByMatter")
    .post(task.findByMatter)

router.route("/findByStaff")
    .post(task.findByStaff)

router.route("/findByStatus")
    .post(task.findByStatus);

router.route("/findByStaffPhanCong")
    .post(task.findByStaffPhanCong);

router.route("/findByDate")
    .post(task.findByDate);

router.route("/setStatusPause")
    .patch(task.setStatusPause);

module.exports = router;