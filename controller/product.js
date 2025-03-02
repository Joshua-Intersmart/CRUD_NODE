const { db } = require("../models");

exports.createProduct = async (req, res, next) => {
    try {
        const { product_name, product_description, price, created_by } = req.body;

        const createdProduct = await db.Products.create({
            product_name,
            product_description,
            price,
            created_by,
        });

        if(!createdProduct) {
            return next(Object.assign(new Error("Product not created!"), { status: 400 }));
        }

        return res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: createdProduct,
        });

    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { product_name, product_description, price } = req.body;

        const existProduct = await db.Products.findByPk(id);
        if (!existProduct) {
            return next(Object.assign(new Error("Product not found!"), { status: 404 }));
        }

        const [updatedRows] = await db.Products.update(
            { product_name, product_description, price },
            { where: { id } }
        );

        if (updatedRows === 0) {
            return next(Object.assign(new Error("Product not updated!"), { status: 400 }));
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
        });

    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedRows = await db.Products.destroy({ where: { id } });

        if (!deletedRows) {
            return next(Object.assign(new Error("Product not found!"), { status: 404 }));
        }

        return res.status(204).send();

    } catch (error) {
        next(error);
    }
};
