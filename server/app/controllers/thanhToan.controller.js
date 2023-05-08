const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ThanhToan = require("../services/thanhToan.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const thanhToan = new ThanhToan(MongoDB.client);
        documents = await thanhToan.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all thanhToans")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const thanhToan = new ThanhToan(MongoDB.client);
        const document = await thanhToan.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find thanhToan by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const thanhToan = new ThanhToan(MongoDB.client);
        const document = await thanhToan.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating thanhToan")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const thanhToan = new ThanhToan(MongoDB.client);
        const document = await thanhToan.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update thanhToan")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const thanhToan = new ThanhToan(MongoDB.client);
        const document = await thanhToan.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete thanhToan")
        );
    }
}