const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const PhuCap = require("../services/phuCap.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const phuCap = new PhuCap(MongoDB.client);
        documents = await phuCap.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all phu cap")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const phuCap = new PhuCap(MongoDB.client);
        const document = await phuCap.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find phu cap by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const phuCap = new PhuCap(MongoDB.client);
        const document = await phuCap.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating phu cap")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const phuCap = new PhuCap(MongoDB.client);
        const document = await phuCap.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update phu cap")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const phuCap = new PhuCap(MongoDB.client);
        const document = await phuCap.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete phu cap")
        );
    }
}