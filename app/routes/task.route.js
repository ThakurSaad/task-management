const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/create-task", verifyToken, taskController.createTask);
router.get("/get-task/:id", verifyToken, taskController.getTask);
router.get("/get-all-task", verifyToken, taskController.getAllTask);
router.delete("/delete-task/:id", verifyToken, taskController.deleteTaskById)

module.exports = router;
