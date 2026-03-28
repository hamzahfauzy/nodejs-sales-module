import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    code: { searchable: true },
    sku: { searchable: true },
    price: {},
    unit: {},
    status: {}
}

export default {

    name: 'sls_products',

    schema: {

        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            item_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            price: {
                type: DataTypes.DECIMAL(18,2)
            },

            unit: {
                type: DataTypes.STRING(50)
            },
            
            thumbnail_url: {
                type: DataTypes.STRING(255)
            },

            status: {
                type: DataTypes.ENUM('active','inactive')
            },

            created_at: {
                type: DataTypes.DATE
            },

            updated_at: {
                type: DataTypes.DATE
            },

            deleted_at: {
                type: DataTypes.DATE
            }

        },

        options: {
            tableName: 'sls_products',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    },

    permissions: [
        'sls_products.list',
        'sls_products.single',
        'sls_products.create',
        'sls_products.update',
        'sls_products.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    }

}