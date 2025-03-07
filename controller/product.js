const { db } = require("../models");

exports.createProduct = async (req, res, next) => {
    try {
        const { product_name, description, price } = req.body;
        const { userId } = req;

        const createdProduct = await db.Products.create({
            product_name,
            description,
            price,
            created_by: userId,
        });

        if (!createdProduct) {
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
        const { product_name, description, price } = req.body;

        const existProduct = await db.Products.findByPk(id);
        if (!existProduct) {
            return next(Object.assign(new Error("Product not found!"), { status: 404 }));
        }

        const [updatedRows] = await db.Products.update(
            { product_name, description, price },
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

        return res.status(204).json({
            success: true,
            message: "Product deleted successfully!",
        });

    } catch (error) {
        next(error);
    }
};

exports.fetchOneProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const products = await db.Products.findByPk(id);

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            products
        });

    } catch (error) {
        next(error);
    }
};

exports.fetchAllProduct = async (req, res, next) => {
    try {
        const products = await db.Products.findAll();

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            products
        });

    } catch (error) {
        next(error);
    }
};
