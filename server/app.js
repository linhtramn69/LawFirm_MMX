const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// define Route
const ApiError = require("./app/api-error");
const typeServiceRoute = require("./app/routes/typeService.route");
const serviceRoute = require("./app/routes/service.route");
const stepRoute = require("./app/routes/step.route");
const userRoute = require("./app/routes/user.route");
const degreeRoute = require("./app/routes/degree.route");
const typeDegreeRoute = require("./app/routes/typeDegree.route");
const chucVuRoute = require("./app/routes/chucVu.route");
const boPhanRoute = require("./app/routes/boPhan.route");
const phuCapRoute = require("./app/routes/phuCap.route");
const salaryRoute = require("./app/routes/salary.route");
const quoteFormRoute = require("./app/routes/quoteForm.route");
const contractRoute = require("./app/routes/contract.route");
const matterRoute = require("./app/routes/matter.route");
const taskRoute = require("./app/routes/task.route");
const typeFeeRoute = require("./app/routes/typeFee.route");
const feeRoute = require("./app/routes/fee.route");
const periodRoute = require("./app/routes/period.route");
const billRoute = require("./app/routes/bill.route");
const thanhToanRoute = require("./app/routes/thanhToan.route");
const typePayRoute = require("./app/routes/typePay.route");
const timePayRoute = require("./app/routes/timePay.route");
const timeAppointmentRoute = require("./app/routes/timeAppointment.route");
const typeAppointmentRoute = require("./app/routes/typeAppointment.route");
const accountingEntryRoute = require("./app/routes/accountingEntry.route");

// use Route
app.use("/api/type-service", typeServiceRoute);
app.use("/api/service", serviceRoute);
app.use("/api/step", stepRoute);
app.use("/api/user", userRoute);
app.use("/api/degree", degreeRoute);
app.use("/api/type-degree", typeDegreeRoute);
app.use("/api/bo-phan", boPhanRoute);
app.use("/api/chuc-vu", chucVuRoute);
app.use("/api/phu-cap", phuCapRoute);
app.use("/api/salary", salaryRoute);
app.use("/api/quote-form", quoteFormRoute);
app.use("/api/contract", contractRoute);
app.use("/api/matter", matterRoute);
app.use("/api/task", taskRoute);
app.use("/api/type-fee", typeFeeRoute);
app.use("/api/fee", feeRoute);
app.use("/api/period", periodRoute);
app.use("/api/bill", billRoute);
app.use("/api/hinh-thuc-thanh-toan", thanhToanRoute);
app.use("/api/type-pay", typePayRoute);
app.use("/api/time-pay", timePayRoute);
app.use("/api/time-appointment", timeAppointmentRoute);
app.use("/api/type-appointment", typeAppointmentRoute);
app.use("/api/accounting-entry", accountingEntryRoute);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// define error 
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal server Error",
    });
});

module.exports = app;