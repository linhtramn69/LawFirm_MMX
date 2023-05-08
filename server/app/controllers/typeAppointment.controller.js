const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TypeAppointment = require("../services/typeAppointment.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const type = new TypeAppointment(MongoDB.client);
        documents = await type.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all type appointments")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const type = new TypeAppointment(MongoDB.client);
        const document = await type.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find type appointment by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const type = new TypeAppointment(MongoDB.client);
        const document = await type.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating type appointment")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const type = new TypeAppointment(MongoDB.client);
        const document = await type.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update type appointment")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const type = new TypeAppointment(MongoDB.client);
        const document = await type.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete type appointment")
        );
    }
}