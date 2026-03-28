import { DataTypes } from "#database/database.sequelize.js";
import DatabaseService from "#database/database.service.js";
import { getTable } from "#database/database.registry.js";

const service = new DatabaseService
const responseField = {
  id: {},
  item_id: {
    searchable: false,
  },
  name: {
    relation: true,
    searchable: true,
    value: "item.name",
  },
  code: {
    relation: true,
    searchable: true,
    value: "item.code",
  },
  sku: {
    relation: true,
    searchable: true,
    value: "item.sku",
  },
  item_name_record_type: {
    relation: true,
    searchable: false,
    value: (row) => `${row.item?.name} (${row.record_type})`,
  },
  price: {
    searchable: true,
  },
  price_format: {
    searchable: false,
    value: row => parseInt(row.price).toLocaleString('id-ID')
  },
  unit: {
    searchable: true,
  },
  thumbnail_url: {
    searchable: false,
  },
  record_type: {
    searchable: false,
  },
  created_at: {
    searchable: false,
  },
};

export default {
  name: "sls_products",

  schema: {
    fields: {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      item_id: {
        type: DataTypes.BIGINT.UNSIGNED,
      },

      price: {
        type: DataTypes.DECIMAL(18, 2),
      },

      unit: {
        type: DataTypes.STRING(50),
      },

      record_type: {
        type: DataTypes.STRING(50),
      },

      thumbnail_url: {
        type: DataTypes.STRING(255),
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
        modelName: "inv_items",
        type: "belongsTo",
        as: "item",
        foreignKey: "item_id",
      },
    ],

    options: {
      tableName: "sls_products",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
  },

  permissions: [
    "sls_products.list",
    "sls_products.single",
    "sls_products.create",
    "sls_products.update",
    "sls_products.delete",
  ],

  response: {
    list: responseField,
    single: responseField,
  },

  events: {
    beforeCreate: async context => {
      const payload = {...context.payload}
      const itemTable = getTable('inv_items')
      const item = await service.create(itemTable, {
        name: payload.name,
        sku: payload.sku,
        code: payload.code,
        unit: payload.unit
      })

      delete payload.name
      delete payload.sku
      delete payload.code
      payload.item_id = item.id

      context.payload = payload

    },
    beforeUpdate: async context => {
      if(context.payload.thumbnail_url == '')
      {
        delete context.payload.thumbnail_url
      }

      const payload = {...context.payload}
      const itemTable = getTable('inv_items')
      await service.update(itemTable, context.oldData.item_id, {
        name: payload.name,
        sku: payload.sku,
        code: payload.code,
        unit: payload.unit
      })

      delete payload.name
      delete payload.sku
      delete payload.code
      payload.item_id = context.oldData.item_id

      context.payload = payload
    }
  }
};
