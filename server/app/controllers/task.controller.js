const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Task = require("../services/task.service");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const task = new Task(MongoDB.client);
        documents = await task.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all tasks")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const task = new Task(MongoDB.client);
        const document = await task.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find task by id")
        );
    }
};
exports.findByDate = async (req, res, next) => {
    let documents = [];
    try{
        const task = new Task(MongoDB.client);
        documents = await task.findByDate({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find task by id")
        );
    }
};
exports.findByMatter = async (req, res, next) => {
    try {
        const task = new Task(MongoDB.client);
        const documents = await task.findByMatter(req.body);
        return res.send(documents);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find task by id matter")
        );
    }
};

exports.findByStaff = async (req, res, next) => {
    let documents = [];
    try{
        console.log(req.body);
        const task = new Task(MongoDB.client);
        console.log(req.body);
         documents = await task.findByStaff(req.body);
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find task by id phu trach")
        );
    }
};

exports.findByStaffPhanCong = async (req, res, next) => {
    let documents = [];
    try{
        const task = new Task(MongoDB.client);
        documents = await task.findByStaffPhanCong(req.body);
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find task by id phan cong")
        );
    }
};

exports.findByStatus = async (req, res, next) => {
    try{
        const task = new Task(MongoDB.client);
        const document = await task.findByStatus(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find task by status")
        );
    }
}

exports.create = async (req, res, next) => {
    try{
        const task = new Task(MongoDB.client);
        const document = await task.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating task")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const task = new Task(MongoDB.client);
        const document = await task.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update task")
        );
    }
}

exports.setStatusPause = async (req, res, next) => {
    try{
        const task = new Task(MongoDB.client);
        const document = await task.setStatusPause(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update task")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const task = new Task(MongoDB.client);
        const document = await task.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete task")
        );
    }
}