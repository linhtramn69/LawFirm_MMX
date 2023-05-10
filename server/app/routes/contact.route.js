const express = require("express");
const contact = require("../controllers/contact.controller")

const router = express.Router();

router.route("/")
    .get(contact.findAll)
    .post(contact.create);

router.route("/:id")
    .get(contact.findById)
    .put(contact.update)
    .delete(contact.delete);

router.route("/findByMatter")
    .post(contact.findByMatter)

module.exports = router;