const express = require("express");
const degree = require("../controllers/degree.controller");

const router = express.Router();

router.route("/")
    .get(degree.findAll)
    .post(degree.create);

router.route("/:id")
    .get(degree.findById)
    .put(degree.update)
    .delete(degree.delete);

    
module.exports = router;