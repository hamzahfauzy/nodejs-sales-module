import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    subscription_id: {},
    product_id: {},
    qty: {},
    price: {}
}

export default {

    name: 'sls_subscription_items',

    schema: {

        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            subscription_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            product_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            qty: {
                type: DataTypes.DECIMAL(12,2)
            },
            
            created_at: {
                type: DataTypes.DATE
            }

        },

        options: {
            tableName: 'sls_subscription_items',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },

    permissions: [
        'sls_subscription_items.list',
        'sls_subscription_items.create',
        'sls_subscription_items.update',
        'sls_subscription_items.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    }

}