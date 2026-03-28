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
          { name: "code", label: "Code", type: "text", className: "col-md-6" },
          { name: "sku", label: "SKU", type: "text", className: "col-md-6" },
          { name: "name", label: "Name", type: "text", className: "col-md-6" },
          { name: "unit", label: "Unit", type: "text", className: "col-md-6" },
          {
            name: "price",
            label: "Price",
            type: "text",
            className: "col-md-6",
          },
          {
            name: "thumbnail_url",
            label: "Thumbnail",
            type: "document",
            srcValue: 'file_url',
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
              name: "code",
              label: "Code",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "name",
              label: "Name",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "sku",
              label: "SKU",
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
              label: "Thumbnail",
              linkLabel: 'See Thumbnail',
              type: "link",
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
            { name: "code", label: "Code", type: "text", className: "col-md-6" },
            { name: "sku", label: "SKU", type: "text", className: "col-md-6" },
            { name: "name", label: "Name", type: "text", className: "col-md-6" },
            {
              name: "price",
              label: "Price",
              type: "text",
              className: "col-md-6",
            },
            { name: "unit", label: "Unit", type: "text", className: "col-md-6" },
            {
              name: "record_type",
              label: "Record Type",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "thumbnail_url",
              label: "Thumbnail",
              type: "document",
              srcValue: 'file_url',
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
        { key: "code", label: "Code", sortable: true, searchable: true },
        { key: "sku", label: "SKU", sortable: true, searchable: true },
        { key: "name", label: "Name", sortable: true, searchable: true },
        { key: "price_format", label: "Price", sortable: true, searchable: true },
        {
          key: "record_type",
          label: "Record Type",
          sortable: true,
          searchable: true,
        },
        { key: "unit", label: "Unit", sortable: true, searchable: true },
        // { key: "thumbnail_url", label: "Thumbnail URL", sortable: true },
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
