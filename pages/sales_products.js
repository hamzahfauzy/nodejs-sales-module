const appUrl = process.env.APP_URL;
export default {
  title: "Products",
  path: "sales/products",
  permission: "sls_products.list",

  content: {
    type: "crud",
    value: {
      endpoint: "/table/sls_products",

      create: {
        label: "Create",
        icon: "plus",
        permission: "sls_products.create",
        title: "Create Product",
        modalClass: "modal-lg",

        fields: [
          {
            name: "item_id",
            label: "Item",
            type: "select2",
            dropdownParent: "#create-modal",
            ajax: {
              useBearer: true,
              term: "search",
              response: { id: "id", text: "name" },
              url: appUrl + "/table/inv_items",
            },
          },
          {
            name: "price",
            label: "Price",
            type: "text",
            className: "col-md-6",
          },
          { name: "unit", label: "Unit", type: "text", className: "col-md-6" },
          {
            name: "thumbnail_url",
            label: "Thumbnail URL",
            type: "text",
            className: "col-md-6",
          },
          {
            name: "record_type",
            label: "Record Type",
            type: "text",
            className: "col-md-6",
          },
        ],
      },

      actions: [
        {
          label: "Detail",
          type: "view",
          icon: "eye",
          permission: "sls_products.single",
          title: "Product Detail",
          fields: [
            {
              name: "item_name",
              label: "Item",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "price",
              label: "Price",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "record_type",
              label: "Record Type",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "unit",
              label: "Unit",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "thumbnail_url",
              label: "Thumbnail URL",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "created_at",
              label: "Created At",
              type: "date",
              className: "col-md-6",
            },
          ],
        },
        {
          label: "Edit",
          type: "edit",
          icon: "edit-2",
          permission: "sls_products.update",
          title: "Edit Product",
          modalClass: "modal-lg",

          fields: [
            {
              name: "item_id",
              label: "Item",
              type: "select2",
              dropdownParent: "#edit-modal",
              ajax: {
                useBearer: true,
                term: "search",
                response: { id: "id", text: "name" },
                initList: {
                  url: "/table/inv_items",
                  key: "item_id",
                  response: { id: "id", text: "name" },
                },
                url: appUrl + "/table/inv_items",
                urlParams: [{ key: "id", value: "id" }],
              },
            },
            {
              name: "price",
              label: "Price",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "record_type",
              label: "Record Type",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "unit",
              label: "Unit",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "thumbnail_url",
              label: "Thumbnail URL",
              type: "text",
              className: "col-md-6",
            },
          ],
        },

        {
          label: "Delete",
          type: "delete",
          icon: "trash",
          class: "text-danger",
          permission: "sls_products.delete",
        },
      ],

      columns: [
        { key: "item_name", label: "Item", sortable: true, searchable: true },
        { key: "price", label: "Price", sortable: true, searchable: true },
        {
          key: "record_type",
          label: "Record Type",
          sortable: true,
          searchable: true,
        },
        { key: "unit", label: "Unit", sortable: true, searchable: true },
        { key: "thumbnail_url", label: "Thumbnail URL", sortable: true },
        {
          key: "created_at",
          label: "Created At",
          sortable: true,
          type: "date",
        },
      ],
    },
  },
};
