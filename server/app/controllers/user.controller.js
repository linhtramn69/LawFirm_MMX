const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const User = require("../services/user.service")
const cloudinary = require('../config/cloudinary')

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const user = new User(MongoDB.client);
        documents = await user.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all users")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const user = new User(MongoDB.client);
        const document = await user.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find user by id")
        );
    }
};

exports.findAllByBoPhan = async (req, res, next) => {
    let documents = [];
    try{
        const user = new User(MongoDB.client);
        documents = await user.findAllByBoPhan(req.params.id);
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all users by id bophan")
        );
    }
}
exports.findAllByBoss = async (req, res, next) => {
    let documents = [];
    try{
        const user = new User(MongoDB.client);
        documents = await user.findAllByBoss(req.params.id);
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all users by id bophan")
        );
    }
}
exports.findByMatter = async (req, res, next) => {
    let documents = [];
    try{
        const user = new User(MongoDB.client);
        documents = await user.findByMatter(req.body);
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all users by id bophan")
        );
    }
}

exports.create = async (req, res, next) => {
    let document = {}

    try{
        const user = new User(MongoDB.client);
        cloudinary.uploader.upload(req.body.avatar, {
            folder: "User"
        }).then((result) => {
            document = user.create({
            ...req.body,
            avatar: result.secure_url
        });
    })
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating user")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const user = new User(MongoDB.client);
        const document = await user.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update user")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const user = new User(MongoDB.client);
        const document = await user.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete user")
        );
    }
}

exports.login = async (req, res, next) => {
    try{
        const user = new User(MongoDB.client);
        const document = await user.login(req.body);
        if (document != null) {
            return res.send({
                token: {...document}
            });
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