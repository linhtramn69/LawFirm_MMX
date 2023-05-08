const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TypeService = require("../services/typeService.service");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const typeService = new TypeService(MongoDB.client);
        documents = await typeService.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all typeServices")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const typeService = new TypeService(MongoDB.client);
        const document = await typeService.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find one typeService by id")
        );
    }
};

exports.findByName = async (req, res, next) => {
    try{
        const typeService = new TypeService(MongoDB.client);
        const document = await typeService.findByName(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find one typeService by name")
        );
    }
}

exports.create = async (req, res, next) => {
    try{
        const typeService = new TypeService(MongoDB.client);
        const document = await typeService.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the typeService")
        );
    }
};

exports.update = async (req, res, next) => {
    try{
        const typeService = new TypeService(MongoDB.client);
        const document = await typeService.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update typeService")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const typeService = new TypeService(MongoDB.client);
        const document = await typeService.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete typeService")
        );
    }
}

