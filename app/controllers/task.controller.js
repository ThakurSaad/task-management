
const {
  createTaskService,
  findTaskByIdService,
  deleteTaskByIdService,
  findAllTaskByCreator,
  updateTaskByIdService,
} = require("../services/task.services");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

exports.createTask = asyncHandler(async (req, res) => {
  const creator = req.decoded._id;
  const taskData = { ...req.body, creator };
  const task = await createTaskService(taskData);

  res.status(201).json({
    status: "Success",
    message: "Task created successfully",
    data: task,
  });
});

exports.getTask = asyncHandler(async (req, res) => {
  const task = await findTaskByIdService(req.params.id);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res.status(200).json({
    status: "Success",
    message: "Task found",
    data: task,
  });
});

exports.getAllTask = asyncHandler(async (req, res) => {
  const creatorId = req.decoded._id;
  const { count, myTasks } = await findAllTaskByCreator(creatorId);

  res.status(200).json({
    status: "Success",
    message: "Tasks retrieved successfully",
    data: { count, myTasks },
  });
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await updateTaskByIdService(id, req.body);

  if (!result) {
    throw new ApiError(404, "Task not found");
  }

  res.status(200).json({
    status: "Success",
    message: "Task updated successfully",
    data: result,
  });
});

exports.deleteTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteTaskByIdService(id);

  if (!result) {
    throw new ApiError(404, "Task not found");
  }

  res.status(200).json({
    status: "Success",
    message: "Task deleted successfully",
    data: result,
  });
});
