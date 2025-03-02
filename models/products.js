module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define(
        "products",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            product_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
            price: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            created_by: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "SET NULL",
            },
        },
        {
            timestamps: true,
        }
    );

    return Products;
};
