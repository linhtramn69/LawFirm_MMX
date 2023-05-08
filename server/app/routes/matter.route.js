const express = require("express");
const matter = require("../controllers/matter.controller")

const router = express.Router();

router.route("/")
    .get(matter.findAll)
    .post(matter.create);

router.route("/:id")
    .get(matter.findById)
    .put(matter.update)
    .delete(matter.delete);

router.route("/findByStatus/:id")
    .get(matter.findByStatus);

router.route("/setStatus/:id")
    .patch(matter.setStatus);

router.route("/setStatus-tt/:id")
    .patch(matter.setStatusTT);

router.route("/findByIdAccess")
    .post(matter.findByIdAccess);

router.route("/getRoseByMonth")
        .post(matter.getRoseByMonth)

router.route("/reminder")
        .post(matter.reminder)

router.route("/findFinishedMatterByYear")
    .post(matter.findFinishedByIdAndYear);

module.exports = router;