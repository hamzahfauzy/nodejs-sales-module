const appUrl = process.env.APP_URL;

var peopleConds = {
  type: "and",
  conditions: [
    {
      field: "ref_name",
      operator: "equals",
      value: "people",
    },
    {
      field: "create_type",
      operator: "equals",
      value: "new",
    },
  ],
};

var organizationConds = {
  type: "and",
  conditions: [
    {
      field: "ref_name",
      operator: "equals",
      value: "organizations",
    },
    {
      field: "create_type",
      operator: "equals",
      value: "new",
    },
  ],
};

export default {
  title: "Customers",
  path: "sales/customers",
  permission: "sls_customers.list",
  content: {
    type: "crud",
    value: {
      endpoint: "/table/sls_customers",
      create: {
        label: "Create",
        icon: "plus",
        permission: "sls_customers.create",
        title: "Create Customer",
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
              initList: {
                url: "/table/organizations",
                key: "organization_id",
                response: { id: "id", text: "name" },
              },
            },
            defaultValue: "organization_id",
            defaultFrom: "queryParam",
          },
          {
            name: "ref_name",
            label: "Customer Type",
            type: "select",
            defaultValue: "people",
            options: [
              { label: "People", value: "people" },
              { label: "Organization", value: "organizations" },
            ],
          },
          {
            name: "create_type",
            label: "Type",
            type: "select",
            defaultValue: "new",
            options: [
              { label: "New", value: "new" },
              { label: "Existing", value: "existing" },
            ],
          },
          {
            name: "ref_people_id",
            label: "Customer",
            type: "select2",
            dropdownParent: "#create-modal",
            ajax: {
              useBearer: true,
              term: "search",
              response: { id: "id", text: "full_name" },
              url: appUrl + "/table/people",
            },
            show_if: {
              type: "and",
              conditions: [
                {
                  field: "ref_name",
                  operator: "equals",
                  value: "people",
                },
                {
                  field: "create_type",
                  operator: "equals",
                  value: "existing",
                },
              ],
            },
          },
          {
            name: "ref_organization_id",
            label: "Customer",
            type: "select2",
            dropdownParent: "#create-modal",
            ajax: {
              useBearer: true,
              term: "search",
              response: { id: "id", text: "name" },
              url: appUrl + "/table/organizations",
              initList: {
                url: "/table/organizations",
                key: "organization_id",
                response: { id: "id", text: "name" },
              },
            },
            defaultValue: "organization_id",
            defaultFrom: "queryParam",
            show_if: {
              type: "and",
              conditions: [
                {
                  field: "ref_name",
                  operator: "equals",
                  value: "organizations",
                },
                {
                  field: "create_type",
                  operator: "equals",
                  value: "existing",
                },
              ],
            },
          },
          {
            name: "code",
            label: "Code",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "identity_number",
            label: "Identity Number",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "first_name",
            label: "First Name",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "last_name",
            label: "Last Name",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "gender",
            label: "Gender",
            type: "select",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ],
            show_if: peopleConds,
          },
          {
            name: "birth_date",
            label: "Birth Date",
            type: "datePicker",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "birth_place",
            label: "Birth Place",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "email",
            label: "Email",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "phone",
            label: "Phone",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "address",
            label: "Address",
            type: "textArea",
            className: "col-md-12",
            show_if: peopleConds,
          },
          {
            name: "city",
            label: "City",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "state",
            label: "State",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "postal_code",
            label: "Postal Code",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "country",
            label: "Country",
            type: "text",
            className: "col-md-6",
            show_if: peopleConds,
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            defaultValue: "active",
            className: "col-md-6",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
            show_if: peopleConds,
          },

          //   Organization fields

          {
            name: "code",
            label: "Code",
            type: "text",
            className: "col-md-6",
            show_if: organizationConds,
          },

          {
            name: "type",
            label: "Type",
            type: "text",
            className: "col-md-6",
            show_if: organizationConds,
          },
          {
            name: "name",
            label: "Name",
            type: "text",
            className: "col-md-6",
            show_if: organizationConds,
          },
          {
            name: "phone",
            label: "Phone",
            type: "text",
            className: "col-md-6",
            show_if: organizationConds,
          },
          {
            name: "email",
            label: "Email",
            type: "text",
            className: "col-md-6",
            show_if: organizationConds,
          },
          {
            name: "is_workspace",
            label: "Is Workspace",
            type: "select",
            defaultValue: "0",
            className: "col-md-6",
            options: [
              { label: "No", value: 0 },
              { label: "Yes", value: 1 },
            ],
            show_if: organizationConds,
          },
          {
            name: "description",
            label: "Description",
            type: "textArea",
            show_if: organizationConds,
          },
          {
            name: "address",
            label: "Address",
            type: "textArea",
            show_if: organizationConds,
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            defaultValue: "active",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Archived", value: "archived" },
            ],
            show_if: organizationConds,
          },
          {
            name: "start_date",
            label: "Start Date",
            type: "datePicker",
            className: "col-md-6",
            show_if: organizationConds,
          },
          {
            name: "end_date",
            label: "End Date",
            type: "datePicker",
            className: "col-md-6",
            show_if: organizationConds,
          },
        ],
      },
      actions: [
        {
          label: "Detail",
          type: "view",
          icon: "eye",
          permission: "sls_customers.single",
          title: "Customer Detail",
          modalClass: "modal-lg",
          fields: [
            {
              name: "organization_name",
              label: "Organization",
              type: "text",
            },
            {
              name: "reference.name",
              label: "Name",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "ref_name",
              label: "Type",
              type: "text",
              className: "col-md-6",
            },
          ],
        },
        {
          label: "Edit",
          type: "edit",
          icon: "edit-2",
          permission: "sls_customers.update",
          title: "Edit Customer",
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
                  key: "organization_id",
                  response: { id: "id", text: "name" },
                },
                url: appUrl + "/table/organizations",
              },
            },
            {
              name: "ref_id",
              label: "Ref ID",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "ref_name",
              label: "Ref Name",
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
          permission: "sls_customers.delete",
        },
      ],
      search: { label: "Cari..." },

      columns: [
        {
          key: "reference.name",
          label: "Name",
          sortable: true,
          searchable: true,
        },
        {
          key: "ref_name",
          label: "Type",
          sortable: true,
          searchable: true,
        },
        {
          key: "organization_name",
          label: "Organization",
          sortable: true,
          searchable: true,
        },
      ],
    },
  },
};
