const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TimePay = require("../services/timePay.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const timePay = new TimePay(MongoDB.client);
        documents = await timePay.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all timePays")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const timePay = new TimePay(MongoDB.client);
        const document = await timePay.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find timePay by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const timePay = new TimePay(MongoDB.client);
        const document = await timePay.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating timePay")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const timePay = new TimePay(MongoDB.client);
        const document = await timePay.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update timePay")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const timePay = new TimePay(MongoDB.client);
        const document = await timePay.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete timePay")
        );
    }
}