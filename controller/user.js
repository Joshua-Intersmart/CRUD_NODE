const { db } = require("../models");

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const existUser = await db.Users.findByPk(id);
        if (!existUser) {
            return next(Object.assign(new Error("User not found!"), { status: 404 }));
        }

        const [updatedRows] = await db.Users.update(
            { name, email, phone },
            { where: { id } }
        );

        if (updatedRows === 0) {
            return next(Object.assign(new Error("User not updated!"), { status: 400 }));
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
        });

    } catch (error) {
        next(error);
    }
};

exports.fetchOneProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await db.Products.findByPk(id);

        return res.status(204).json({
            success: true,
            message: "Product fetched successfully!",
            user
        });

    } catch (error) {
        next(error);
    }
};