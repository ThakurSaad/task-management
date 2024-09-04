const {
  createTaskService,
  findTaskByIdService,
  deleteTaskByIdService,
  findAllTaskByIdCreatorEmail,
} = require("../services/task.services");

exports.createTask = async (req, res) => {
  try {
    const creator_email = req.decoded.email;
    const createTask = { ...req.body, creator_email };
    const task = await createTaskService(createTask);

    res.status(200).json({
      status: "Success",
      message: "Task created successful",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Task creation not successful",
      error: error.message,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await findTaskByIdService(req.params.id);

    res.status(200).json({
      status: "Success",
      message: "Task found",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Task not found",
      error: error.message,
    });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const email = req.decoded.email;
    const { count, myTasks } = await findAllTaskByIdCreatorEmail(email);

    res.status(200).json({
      status: "Success",
      message: "Your Tasks found",
      data: { count, myTasks },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Your Tasks not found",
      error: error.message,
    });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const result = await deleteTaskByIdService(req.params.id);

    if (!result) {
      return res.status(404).json({
        status: "not found",
        message: "Task not found",
        data: result,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Task deleted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Task not deleted",
      error: error.message,
    });
  }
};
