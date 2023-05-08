const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const QuoteForm = require("../services/quoteForm.service")
const TypeService = require("../services/typeService.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const quoteForm = new QuoteForm(MongoDB.client);
        documents = await quoteForm.findAll({});
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find all quoteForms")
        );
    }
}

exports.findById = async (req, res, next) => {
    try {
        const quoteForm = new QuoteForm(MongoDB.client);
        const document = await quoteForm.findById(req.params.id);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find quoteForm by id")
        );
    }
};

exports.findByTypeServiceAndYear =  async (req, res, next) => {
    let documents = [];
    try {
        const quoteForm = new QuoteForm(MongoDB.client);
        documents = await quoteForm.findByTypeServiceAndYear(req.body);
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find all quoteForms")
        );
    }
    };
    exports.findByProvinceAndYear =  async (req, res, next) => {
        let documents = [];
        try {
            const quoteForm = new QuoteForm(MongoDB.client);
            documents = await quoteForm.findByProvinceAndYear(req.body);
            return res.send(documents);
        }
        catch (error) {
            return next(
                new ApiError(500, "An error occured while find all quoteForms")
            );
        }
        };

exports.create = async (req, res, next) => {
    try {
        const quoteForm = new QuoteForm(MongoDB.client);
        const document = await quoteForm.create(req.body);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while creating quoteForm")
        );
    }
}

exports.sendMail = async (req, res, next) => {
    try {
        const quoteForm = new QuoteForm(MongoDB.client);
        const document = await quoteForm.sendMail(req.body);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while send mail quoteForm")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const quoteForm = new QuoteForm(MongoDB.client);
        const document = await quoteForm.update(req.params.id, req.body);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while update quoteForm")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const quoteForm = new QuoteForm(MongoDB.client);
        const document = await quoteForm.delete(req.params.id);
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while delete quoteForm")
        );
    }
}