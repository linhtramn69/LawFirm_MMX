const express = require("express");
const period = require("../controllers/period.controller")

const router = express.Router();

router.route("/")
    .get(period.findAll)
    .post(period.create);

router.route("/:id")
    .get(period.findById)
    .patch(period.update)
    .delete(period.delete);

router.route("/findByMatter/:id")
    .get(period.findByMatter)
    
module.exports = router;