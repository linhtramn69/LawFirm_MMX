const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TypeFee = require("../services/typeFee.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const typeFee = new TypeFee(MongoDB.client);
        documents = await typeFee.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all typeFees")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const typeFee = new TypeFee(MongoDB.client);
        const document = await typeFee.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find typeFee by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const typeFee = new TypeFee(MongoDB.client);
        const document = await typeFee.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating typeFee")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const typeFee = new TypeFee(MongoDB.client);
        const document = await typeFee.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update typeFee")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const typeFee = new TypeFee(MongoDB.client);
        const document = await typeFee.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete typeFee")
        );
    }
}