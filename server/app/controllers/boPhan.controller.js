const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const BoPhan = require("../services/boPhan.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const boPhan = new BoPhan(MongoDB.client);
        documents = await boPhan.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all boPhans")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const boPhan = new BoPhan(MongoDB.client);
        const document = await boPhan.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find boPhan by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const boPhan = new BoPhan(MongoDB.client);
        const document = await boPhan.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating boPhan")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const boPhan = new BoPhan(MongoDB.client);
        const document = await boPhan.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update boPhan")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const boPhan = new BoPhan(MongoDB.client);
        const document = await boPhan.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete boPhan")
        );
    }
}