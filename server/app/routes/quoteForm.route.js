const express = require("express");
const quoteForm = require("../controllers/quoteForm.controller")

const router = express.Router();

router.route("/")
    .get(quoteForm.findAll)
    .post(quoteForm.create);

router.route("/:id")
    .get(quoteForm.findById)
    .put(quoteForm.update)
    .delete(quoteForm.delete);

router.route("/sendMail")
    .post(quoteForm.sendMail);

router.route("/findByTypeServiceAndYear")
    .post(quoteForm.findByTypeServiceAndYear)

router.route("/findByProvinceAndYear")
    .post(quoteForm.findByProvinceAndYear)

module.exports = router;