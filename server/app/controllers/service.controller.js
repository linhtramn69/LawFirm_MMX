const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Service = require("../services/service.service");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const service = new Service(MongoDB.client);
        documents = await service.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all services")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const service = new Service(MongoDB.client);
        const document = await service.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find service by id")
        );
    }
}

exports.findAllByTypeService = async (req, res, next) => {
    let documents = [];
    try{
        const service = new Service(MongoDB.client);
        documents = await service.findAllByTypeService(req.params.id);
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all services by id type service")
        );
    }
}

exports.create = async (req, res, next) => {
    try{
        const service = new Service(MongoDB.client);
        const document = await service.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the service")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const service = new Service(MongoDB.client);
        const document = await service.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update the service")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const service = new Service(MongoDB.client);
        const document = await service.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete the service")
        );
    }
}