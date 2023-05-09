const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Period = require("../services/period.service");
const Matter = require("../services/matter.service");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const period = new Period(MongoDB.client);
        documents = await period.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all periods")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const period = new Period(MongoDB.client);
        const document = await period.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find period by id")
        );
    }
};
exports.findByMatter = async (req, res, next) => {
    try {
        const period = new Period(MongoDB.client);
        const documents = await period.findByMatter(req.params.id);
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find task by id matter")
        );
    }
};
exports.create = async (req, res, next) => {
    try{
        const period = new Period(MongoDB.client);
        const matter = new Matter(MongoDB.client)
        const document = await period.create(req.body);
        const rs = await period.findByMatter(req.body.vu_viec)
        const update = await matter.updateProgress(req.body.vu_viec, rs)
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating period")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const period = new Period(MongoDB.client);
        const matter = new Matter(MongoDB.client)
        const document = await period.update(req.params.id, req.body.status);
        const rs = await period.findByMatter(req.body.vu_viec)
        const update = await matter.updateProgress(req.body.vu_viec, rs)
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update period")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const period = new Period(MongoDB.client);
        const matter = new Matter(MongoDB.client);
        const rs = await period.findById(req.params.id)
        let id = rs.vu_viec
        const document = await period.delete(req.params.id);
        const result = await period.findByMatter(id)
        const update = await matter.updateProgress(id, result)
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete period")
        );
    }
}