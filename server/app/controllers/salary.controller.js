const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Salary = require("../services/salary.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const salary = new Salary(MongoDB.client);
        documents = await salary.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all salarys")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const salary = new Salary(MongoDB.client);
        const document = await salary.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find salary by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const salary = new Salary(MongoDB.client);
        const document = await salary.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating salary")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const salary = new Salary(MongoDB.client);
        const document = await salary.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update salary")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const salary = new Salary(MongoDB.client);
        const document = await salary.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete salary")
        );
    }
}