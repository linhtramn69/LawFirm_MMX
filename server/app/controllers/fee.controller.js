const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Fee = require("../services/fee.service")
const cloudinary = require('../config/cloudinary')

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const fee = new Fee(MongoDB.client);
        documents = await fee.findAll({});
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find all fees")
        );
    }
}

exports.findById = async (req, res, next) => {
    try {
        const fee = new Fee(MongoDB.client);
        const document = await fee.findById(req.params.id);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find fee by id")
        );
    }
};

exports.findByMatter = async (req, res, next) => {
    try {
        const fee = new Fee(MongoDB.client);
        const documents = await fee.findByMatter(req.body);
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find fee by id")
        );
    }
};

exports.findByStatus = async (req, res, next) => {
    try{
        const fee = new Fee(MongoDB.client);
        const document = await fee.findByStatus(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find fee by status")
        );
    }
}

exports.create = async (req, res, next) => {
    let document = {}
    try{
        const fee = new Fee(MongoDB.client);
        cloudinary.uploader.upload(req.body.hinh_anh, {
            folder: "Fee"
        }).then((result) => {
            document = fee.create({
            ...req.body,
            hinh_anh: result.secure_url
        });
        })
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating fee")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const fee = new Fee(MongoDB.client);
        const document = await fee.update(req.params.id, req.body);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while update fee")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const fee = new Fee(MongoDB.client);
        const document = await fee.delete(req.params.id);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while delete fee")
        );
    }
}