const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Step = require("../services/step.service");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const step = new Step(MongoDB.client);
        documents = await step.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all steps")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const step = new Step(MongoDB.client);
        const document = await step.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find step by id")
        );
    }
}

exports.findByIdService = async (req, res, next) => {
    try{
        const step = new Step(MongoDB.client);
        const document = await step.findByIdService(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find step by id service")
        );
    }
}

exports.findByChiPhiCoDinh = async (req, res, next) => {
    let documents = [];
    try{
        const step = new Step(MongoDB.client);
        documents = await step.findByChiPhiCoDinh(req.body);
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all steps by id chi phi co dinh")
        );
    }
}

exports.create = async (req, res, next) => {
    try{
        const step = new Step(MongoDB.client);
        const document = await step.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the step")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const step = new Step(MongoDB.client);
        const document = await step.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update the step")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const step = new Step(MongoDB.client);
        const document = await step.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete the step")
        );
    }
}