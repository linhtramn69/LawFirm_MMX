const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Period = require("../services/period.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const period = new Period(MongoDB.client);
        documents = await period.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all periods")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const period = new Period(MongoDB.client);
        const document = await period.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find period by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const period = new Period(MongoDB.client);
        const document = await period.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating period")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const period = new Period(MongoDB.client);
        const document = await period.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update period")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const period = new Period(MongoDB.client);
        const document = await period.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete period")
        );
    }
}