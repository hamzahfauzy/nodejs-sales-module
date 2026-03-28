import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    people_id: {},
    plan_id: {},
    start_date: {},
    next_billing_date: {},
    status: {}
}

export default {

    name: 'subscriptions',

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

            people_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            plan_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            start_date: {
                type: DataTypes.DATEONLY
            },

            end_date: {
                type: DataTypes.DATEONLY
            },

            next_billing_date: {
                type: DataTypes.DATEONLY
            },

            auto_renew: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            status: {
                type: DataTypes.ENUM('active','paused','cancelled','expired')
            },

            metadata: {
                type: DataTypes.JSON
            },

            next_reminder_date: {
                type: DataTypes.DATEONLY
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
            tableName: 'subscriptions',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    },

    permissions: [
        'subscriptions.list',
        'subscriptions.single',
        'subscriptions.create',
        'subscriptions.update',
        'subscriptions.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    }

}