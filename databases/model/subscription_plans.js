import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    name: { searchable: true },
    price: {},
    billing_interval: {},
    status: {}
}

export default {

    name: 'subscription_plans',

    schema: {

        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            organization_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            name: {
                type: DataTypes.STRING(255)
            },

            description: {
                type: DataTypes.TEXT
            },

            price: {
                type: DataTypes.DECIMAL(18,2)
            },

            billing_interval: {
                type: DataTypes.STRING(50)
            },

            billing_interval_count: {
                type: DataTypes.INTEGER
            },

            trial_days: {
                type: DataTypes.INTEGER
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
            tableName: 'subscription_plans',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    },

    permissions: [
        'subscription_plans.list',
        'subscription_plans.create',
        'subscription_plans.update',
        'subscription_plans.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    }

}