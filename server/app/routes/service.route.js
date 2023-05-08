const express = require("express");
const service = require("../controllers/service.controller");

const router = express.Router();

router.route("/")
    .get(service.findAll)
    .post(service.create);

router.route("/:id")
    .put(service.update)
    .delete(service.delete)
    .get(service.findById);

router.route("/findByType/:id")
    .get(service.findAllByTypeService);

module.exports = router;