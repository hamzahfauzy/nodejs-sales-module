import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
  id: {},
  name: { searchable: true },
  organization_id: {},
  organization_name: {
    relation: true,
    searchable: true,
    value: "organization.name",
  },
  price: {},
  description: {},
  billing_interval: {},
  billing_interval_count: {},
  trial_days: {},
  status: {},
  created_at: {},
  updated_at: {},
};

export default {
  name: "sls_subscription_plans",

  schema: {
    fields: {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      organization_id: {
        type: DataTypes.BIGINT.UNSIGNED,
      },

      name: {
        type: DataTypes.STRING(255),
      },

      description: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.DECIMAL(18, 2),
      },

      billing_interval: {
        type: DataTypes.STRING(50),
      },

      billing_interval_count: {
        type: DataTypes.INTEGER,
      },

      trial_days: {
        type: DataTypes.INTEGER,
      },

      status: {
        type: DataTypes.ENUM("active", "inactive"),
      },

      created_at: {
        type: DataTypes.DATE,
      },

      updated_at: {
        type: DataTypes.DATE,
      },

      deleted_at: {
        type: DataTypes.DATE,
      },
    },

    relations: [
      {
        modelName: "organizations",
        type: "belongsTo",
        as: "organization",
        foreignKey: "organization_id",
      },
    ],

    options: {
      tableName: "sls_subscription_plans",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
  },

  permissions: [
    "sls_subscription_plans.list",
    "sls_subscription_plans.create",
    "sls_subscription_plans.update",
    "sls_subscription_plans.delete",
  ],

  response: {
    list: responseField,
    single: responseField,
  },
};
