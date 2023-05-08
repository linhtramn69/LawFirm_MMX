const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TypePay = require("../services/typePay.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const typePay = new TypePay(MongoDB.client);
        documents = await typePay.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all typePays")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const typePay = new TypePay(MongoDB.client);
        const document = await typePay.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find typePay by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const typePay = new TypePay(MongoDB.client);
        const document = await typePay.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating typePay")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const typePay = new TypePay(MongoDB.client);
        const document = await typePay.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update typePay")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const typePay = new TypePay(MongoDB.client);
        const document = await typePay.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete typePay")
        );
    }
}