const express = require("express");
const typeService = require("../controllers/typeService.controller");

const router = express.Router();

router.route("/")
    .get(typeService.findAll)
    .post(typeService.create);

router.route("/:id")
    .get(typeService.findById)
    .post(typeService.findByName)
    .put(typeService.update)
    .delete(typeService.delete);

    
module.exports = router;