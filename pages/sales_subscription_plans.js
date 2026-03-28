const appUrl = process.env.APP_URL;
export default {
  title: "Subscription Plans",
  path: "sales/subscription-plans",
  permission: "sls_subscription_plans.list",

  content: {
    type: "crud",
    value: {
      endpoint: "/table/sls_subscription_plans",

      create: {
        label: "Create",
        icon: "plus",
        permission: "sls_subscription_plans.create",
        title: "Create Subscription Plan",
        modalClass: "modal-lg",

        fields: [
          {
            name: "organization_id",
            label: "Organization",
            type: "select2",
            dropdownParent: "#create-modal",
            ajax: {
              useBearer: true,
              term: "search",
              response: { id: "id", text: "name" },
              url: appUrl + "/table/organizations",
            },
          },
          {
            name: "name",
            label: "Name",
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
            name: "description",
            label: "Description",
            type: "textarea",
          },
          {
            name: "billing_interval",
            label: "Billing Interval",
            type: "text",
            className: "col-md-6",
          },
          {
            name: "billing_interval_count",
            label: "Billing Interval Count",
            type: "text",
            className: "col-md-6",
          },
          {
            name: "trial_days",
            label: "Trial Days",
            type: "text",
            className: "col-md-6",
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            className: "col-md-6",
            defaultValue: "active",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ],
      },

      actions: [
        {
          label: "Detail",
          type: "view",
          icon: "eye",
          permission: "sls_subscription_plans.single",
          title: "Subscription Plan Detail",
          fields: [
            {
              name: "organization_name",
              label: "Organization",
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
              name: "price",
              label: "Price",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
            },
            {
              name: "billing_interval",
              label: "Billing Interval",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "billing_interval_count",
              label: "Billing Interval Count",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "trial_days",
              label: "Trial Days",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "status",
              label: "Status",
              type: "status-badge",
              className: "col-md-6",
              badge: {
                color: {
                  active: "success",
                  inactive: "warning",
                },
                label: {
                  active: "Active",
                  inactive: "Inactive",
                },
              },
            },
            {
              name: "created_at",
              label: "Created At",
              type: "date",
              className: "col-md-6",
            },
            {
              name: "updated_at",
              label: "Updated At",
              type: "date",
              className: "col-md-6",
            },
          ],
        },
        {
          label: "Edit",
          type: "edit",
          icon: "edit-2",
          permission: "sls_subscription_plans.update",
          title: "Edit Subscription Plan",
          modalClass: "modal-lg",

          fields: [
            {
              name: "organization_id",
              label: "Organization",
              type: "select2",
              dropdownParent: "#edit-modal",
              ajax: {
                useBearer: true,
                term: "search",
                response: { id: "id", text: "name" },
                initList: {
                  url: "/table/organizations",
                  key: "item_id",
                  response: { id: "id", text: "name" },
                },
                url: appUrl + "/table/organizations",
                urlParams: [{ key: "id", value: "id" }],
              },
            },
            {
              name: "name",
              label: "Name",
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
              name: "description",
              label: "Description",
              type: "textarea",
            },
            {
              name: "billing_interval",
              label: "Billing Interval",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "billing_interval_count",
              label: "Billing Interval Count",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "trial_days",
              label: "Trial Days",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              className: "col-md-6",
              defaultValue: "active",
              options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ],
            },
          ],
        },

        {
          label: "Delete",
          type: "delete",
          icon: "trash",
          class: "text-danger",
          permission: "sls_subscription_plans.delete",
        },
      ],

      columns: [
        {
          key: "organization_name",
          label: "Organization",
          sortable: true,
          searchable: true,
        },
        { key: "name", label: "Name", sortable: true, searchable: true },
        { key: "price", label: "Price", sortable: true, searchable: true },
        {
          key: "billing_interval",
          label: "Billing Interval",
          sortable: true,
          searchable: true,
        },
        {
          key: "billing_interval_count",
          label: "Billing Interval Count",
          sortable: true,
          searchable: true,
        },
        {
          key: "trial_days",
          label: "Trial Days",
          sortable: true,
          searchable: true,
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          searchable: true,
          type: "status-badge",
          badge: {
            color: {
              active: "success",
              inactive: "warning",
            },
            label: {
              active: "Active",
              inactive: "Inactive",
            },
          },
        },
        {
          key: "created_at",
          label: "Created At",
          sortable: true,
          type: "date",
        },
        {
          key: "updated_at",
          label: "Updated At",
          sortable: true,
          type: "date",
        },
      ],
    },
  },
};
