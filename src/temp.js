// student/index
const express = require("express");
const router = express.Router();

router.get(
    "/:id",
    (req, res) => {
        // 获取学生...
    }
);

router.delete(
    "/:id",
    (req, res) => {
        // 添加学生...
    }
);

router.delete(
    "/:id",
    (req, res) => {
        // 删除学生...
    }
);

module.exports = router;