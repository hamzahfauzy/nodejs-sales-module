import { DataTypes } from "#database/database.sequelize.js";
import { getModel } from "#database/database.registry.js";

const responseField = {
  id: {},
  organization_id: {},
  organization_name: {
    relation: true,
    searchable: true,
    value: "organization.name",
  },
  ref_id: {},
  ref_name: {},
};

export default {
  name: "sls_customers",

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

      ref_id: {
        type: DataTypes.BIGINT.UNSIGNED,
      },

      ref_name: {
        type: DataTypes.STRING(255),
      },
    },

    options: {
      tableName: "sls_customers",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },

    relations: [
      {
        modelName: "organizations",
        type: "belongsTo",
        as: "organization",
        foreignKey: "organization_id",
      },
    ],
  },

  permissions: [
    "sls_customers.list",
    "sls_customers.single",
    "sls_customers.create",
    "sls_customers.update",
    "sls_customers.delete",
  ],

  response: {
    list: responseField,
    single: responseField,
  },

  events: {
    beforeCreate: async function (context) {
      if (context.payload.ref_name == "people") {
        if (context.payload.create_type == "new") {
          var peoplePayload = { ...context.payload };

          delete peoplePayload.ref_people_id;
          delete peoplePayload.organization_id;
          delete peoplePayload.create_type;
          delete peoplePayload.ref_name;

          const people = getModel("people");
          const row = await people.create(peoplePayload);
          context.payload.ref_id = row.id;
        } else {
          context.payload.ref_id = context.payload.ref_people_id;
        }
      } else {
        if (context.payload.create_type == "new") {
          var organizationPayload = { ...context.payload };

          delete organizationPayload.ref_organization_id;
          delete organizationPayload.organization_id;
          delete organizationPayload.create_type;
          delete organizationPayload.ref_name;

          const organization = getModel("organizations");
          const row = await organization.create(organizationPayload);
          context.payload.ref_id = row.id;
        } else {
          context.payload.ref_id = context.payload.ref_organization_id;
        }
      }
    },
  },
};
