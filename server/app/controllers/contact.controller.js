const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Contact = require("../services/contact.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const contact = new Contact(MongoDB.client);
        documents = await contact.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all contact")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const contact = new Contact(MongoDB.client);
        const document = await contact.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find contact by id")
        );
    }
};

exports.findByMatter = async (req, res, next) => {
    try {
        const contact = new Contact(MongoDB.client);
        const documents = await contact.findByMatter(req.body);
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find contact by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const contact = new Contact(MongoDB.client);
        const document = await contact.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating contact")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const contact = new Contact(MongoDB.client);
        const document = await contact.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update contact")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const contact = new Contact(MongoDB.client);
        const document = await contact.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete contact")
        );
    }
}