const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Bill = require("../services/bill.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const bill = new Bill(MongoDB.client);
        documents = await bill.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all bills")
        );
    }
}
exports.findByMatter = async (req, res, next) => {
    try {
        const bill = new Bill(MongoDB.client);
        const documents = await bill.findByMatter(req.body);
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find fee by id")
        );
    }
};
exports.findById = async (req, res, next) => {
    try{
        const bill = new Bill(MongoDB.client);
        const document = await bill.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find bill by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const bill = new Bill(MongoDB.client);
        const document = await bill.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating bill")
        );
    }
}

exports.getByMonthAndType = async (req, res, next) => {
    let arrs = [];
    // try {
    //     let total = 0;
    //     const bill = new Bill(MongoDB.client);
    //     for(let i=1; i<=12; i++){
    //         const documents = await bill.getByMonthAndType(req.body, i);
    //         const arr = documents.map((item) => {return item.tong_gia_tri})
    //         arr.length > 0 ?
    //         total = arr.reduce((tong, currentValue) => {
    //             arrs.push(tong + currentValue)
    //         }) : arrs.push(0)
    //     }
    //     return res.send(arrs);
    // }
    // catch (error) {
    //     return next(
    //         new ApiError(500, "An error occured while find fee by year and type")
    //     );
    // }
};

exports.update = async (req, res, next) => {
    try{
        const bill = new Bill(MongoDB.client);
        const document = await bill.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update bill")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const bill = new Bill(MongoDB.client);
        const document = await bill.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete bill")
        );
    }
}