const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ChucVu = require("../services/chucVu.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const chucVu = new ChucVu(MongoDB.client);
        documents = await chucVu.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all chucVus")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const chucVu = new ChucVu(MongoDB.client);
        const document = await chucVu.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find chucVu by id")
        );
    }
};

exports.findByBoPhan = async (req, res, next) => {
    try{
        const chucVu = new ChucVu(MongoDB.client);
        const document = await chucVu.findByBoPhan(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find chucVu by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const chucVu = new ChucVu(MongoDB.client);
        const document = await chucVu.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating chucVu")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const chucVu = new ChucVu(MongoDB.client);
        const document = await chucVu.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update chucVu")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const chucVu = new ChucVu(MongoDB.client);
        const document = await chucVu.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete chucVu")
        );
    }
}