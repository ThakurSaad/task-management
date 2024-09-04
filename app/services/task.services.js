const Task = require("../models/Task");

exports.createTaskService = async (user) => {
  return await Task.create(user);
};

exports.findTaskByIdService = async (id) => {
  return await Task.findById(id);
};

exports.findAllTaskByIdCreatorEmail = async (email) => {
  const myTasks = await Task.find({ creator_email: email });
  const count = myTasks.length;
  return { myTasks, count };
};

exports.deleteTaskByIdService = async (id) => {
  const task = await this.findTaskByIdService(id);

  if (!task) {
    return;
  } else {
    return await Task.findByIdAndDelete(id);
  }
};
