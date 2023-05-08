const express = require("express");
const chucVu = require("../controllers/chucVu.controller")

const router = express.Router();

router.route("/")
    .get(chucVu.findAll)
    .post(chucVu.create);

router.route("/:id")
    .get(chucVu.findById)
    .put(chucVu.update)
    .delete(chucVu.delete);

router.route("/findByBoPhan")
    .post(chucVu.findByBoPhan);

module.exports = router;