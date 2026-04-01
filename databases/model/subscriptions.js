import { DataTypes } from "#database/database.sequelize.js";
import { getModel, getTable } from "#database/database.registry.js";

const responseField = {
  id: {},
  organization_id: {},
  organization_name: {
    relation: true,
    searchable: true,
    value: "organization.name",
  },
  plan_id: {},
  plan_name: {
    relation: true,
    searchable: true,
    value: "plan.name",
  },
  plan: {
    relation: true,
    as: 'plan',
    fields: () => {
      const planTable = getTable('sls_subscription_plans')
      return planTable.response.single
    }
  },
  code: {},
  ref_id: {},
  ref_name: {},
  start_date: {},
  end_date: {},
  auto_renew: {},
  next_billing_date: {},
  status: {},
  next_reminder_date: {},
  metadata: {},
  created_at: {},
  updated_at: {},
  reference: {
    morph: true,
    typeField: 'ref_name',
    idField: 'ref_id',
  },
  subscription_list_name: {
    value: row => `${row.code} - ${row.reference.name}`
  },
  items: {
    relation: true,
    as: 'items',
    fields: {
      id: {},
      qty: {},
      price: {},
      total_price: {},
      product: {
        relation: true,
        as: 'product',
        fields: {
          price: {},
          price_format: {
            value: row => parseInt(row.price).toLocaleString('id-ID')
          },
          unit: {},
          thumbnail: {},
          item: {
            relation: true,
            as: 'item'
          }
        }
      }
    }
  }
};

const singleResponseField = {
  ...responseField,
  customer: {
    relation: true,
    pivoting: true,
    tableName: 'sls_customers',
    typeField: 'ref_name',
    idField: 'ref_id',
  },
}

export default {
  name: "sls_subscriptions",
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

      plan_id: {
        type: DataTypes.BIGINT.UNSIGNED,
      },

      ref_id: {
        type: DataTypes.BIGINT.UNSIGNED,
      },

      ref_name: {
        type: DataTypes.STRING(255),
      },
      
      code: {
        type: DataTypes.STRING(255),
      },

      start_date: {
        type: DataTypes.DATEONLY,
      },

      end_date: {
        type: DataTypes.DATEONLY,
      },

      next_billing_date: {
        type: DataTypes.DATEONLY,
      },

      auto_renew: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      status: {
        type: DataTypes.ENUM("active", "paused", "cancelled", "expired"),
      },

      metadata: {
        type: DataTypes.JSON,
      },

      next_reminder_date: {
        type: DataTypes.DATEONLY,
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
      {
        modelName: "sls_subscription_plans",
        type: "belongsTo",
        as: "plan",
        foreignKey: "plan_id",
      },
      {
        modelName: "sls_subscription_items",
        type: "hasMany",
        as: "items",
        foreignKey: "subscription_id",
      },
    ],

    options: {
      tableName: "sls_subscriptions",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
  },

  permissions: [
    "sls_subscriptions.list",
    "sls_subscriptions.single",
    "sls_subscriptions.create",
    "sls_subscriptions.update",
    "sls_subscriptions.delete",
  ],

  response: {
    list: responseField,
    single: singleResponseField,
  },

  events: {
    beforeCreate: async (context) => {
      if(context.payload.customer_id)
      {
        const customerModel = getModel('sls_customers')
        const customer = await customerModel.findByPk(context.payload.customer_id)
        context.payload.ref_name = customer.ref_name
        context.payload.ref_id = customer.ref_id

        delete context.payload.customer_id
      }
    },
    afterCreate: async (context) => {
      const payload = { ...context.payload };
      const items = payload.items || [];
      items.forEach((item) => {
        const invoiceItem = getModel("sls_subscription_items");
        invoiceItem.create({
          subscription_id: context.data.id,
          product_id: item.product_id,
          qty: item.qty,
        });
      });
    },
    beforeUpdate: async (context) => {
      if(context.payload.customer_id)
      {
        const customerModel = getModel('sls_customers')
        const customer = await customerModel.findByPk(context.payload.customer_id)
        context.payload.ref_name = customer.ref_name
        context.payload.ref_id = customer.ref_id

        delete context.payload.customer_id
      }
    },
  },
};
