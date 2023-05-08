const express = require("express");
const salary = require("../controllers/salary.controller")

const router = express.Router();

router.route("/")
    .get(salary.findAll)
    .post(salary.create);

router.route("/:id")
    .get(salary.findById)
    .put(salary.update)
    .delete(salary.delete);

module.exports = router;