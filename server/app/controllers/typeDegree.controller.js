const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TypeDegree = require("../services/typeDegree.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const typeDegree = new TypeDegree(MongoDB.client);
        documents = await typeDegree.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all type degrees")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const typeDegree = new TypeDegree(MongoDB.client);
        const document = await typeDegree.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find type degree by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const typeDegree = new TypeDegree(MongoDB.client);
        const document = await typeDegree.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating type degree")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const typeDegree = new TypeDegree(MongoDB.client);
        const document = await typeDegree.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update type degree")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const typeDegree = new TypeDegree(MongoDB.client);
        const document = await typeDegree.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete type degree")
        );
    }
}