const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Contract = require("../services/contract.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const contract = new Contract(MongoDB.client);
        documents = await contract.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all contracts")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const contract = new Contract(MongoDB.client);
        const document = await contract.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find contract by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const contract = new Contract(MongoDB.client);
        const document = await contract.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating contract")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const contract = new Contract(MongoDB.client);
        const document = await contract.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update contract")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const contract = new Contract(MongoDB.client);
        const document = await contract.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete contract")
        );
    }
}