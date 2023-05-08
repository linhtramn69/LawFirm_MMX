const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Degree = require("../services/degree.service");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const degree = new Degree(MongoDB.client);
        documents = await degree.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all degrees")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const degree = new Degree(MongoDB.client);
        const document = await degree.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find one degree by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const degree = new Degree(MongoDB.client);
        const document = await degree.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the degree")
        );
    }
};

exports.update = async (req, res, next) => {
    try{
        const degree = new Degree(MongoDB.client);
        const document = await degree.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update degree")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const degree = new Degree(MongoDB.client);
        const document = await degree.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete degree")
        );
    }
}

