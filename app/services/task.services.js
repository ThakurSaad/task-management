const Task = require("../models/Task");

exports.createTaskService = async (task) => {
  return await Task.create(task);
};

exports.findTaskByIdService = async (id) => {
  return await Task.findById(id).populate("creator", "email firstName lastName");
};

exports.findAllTaskByCreator = async (creatorId) => {
  const myTasks = await Task.find({ creator: creatorId }).populate(
    "creator",
    "email firstName lastName"
  );
  const count = myTasks.length;
  return { myTasks, count };
};

exports.updateTaskByIdService = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

exports.deleteTaskByIdService = async (id) => {
  return await Task.findByIdAndDelete(id);
};
