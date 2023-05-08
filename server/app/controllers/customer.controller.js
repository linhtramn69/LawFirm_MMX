const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Customer = require("../services/customer.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const customer = new Customer(MongoDB.client);
        documents = await customer.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all customers")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const customer = new Customer(MongoDB.client);
        const document = await customer.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find customer by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const customer = new Customer(MongoDB.client);
        const document = await customer.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating customer")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const customer = new Customer(MongoDB.client);
        const document = await customer.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update customer")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const customer = new Customer(MongoDB.client);
        const document = await customer.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete customer")
        );
    }
}

exports.login = async (req, res, next) => {
    try{
        const customer = new Customer(MongoDB.client);
        const document = await customer.login(req.body);
        if (document != null) {
            return res.send(document);
        } else {
            return res.send({ error: true });
        }
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while log in with this phone and password")
        );
    }
}