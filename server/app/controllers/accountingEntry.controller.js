const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const AccountingEntry = require("../services/accountingEntry.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const accountingEntry = new AccountingEntry(MongoDB.client);
        documents = await accountingEntry.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all accounting entry")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const accountingEntry = new AccountingEntry(MongoDB.client);
        const document = await accountingEntry.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find accounting entry by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const accountingEntry = new AccountingEntry(MongoDB.client);
        const document = await accountingEntry.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating accounting entry")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const accountingEntry = new AccountingEntry(MongoDB.client);
        const document = await accountingEntry.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update accounting entry")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const accountingEntry = new AccountingEntry(MongoDB.client);
        const document = await accountingEntry.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete accounting entry")
        );
    }
}