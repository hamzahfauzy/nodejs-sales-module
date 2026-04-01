const appUrl = process.env.APP_URL;
export default {
  title: "Orders",
  path: "sales/orders",
  permission: "trx_invoices.list",

  content: {
    type: "crud",
    value: {
      endpoint: "/table/trx_invoices?filters[record_type]=ORDER",
      create: {
        label: "Create",
        icon: "plus",
        permission: "trx_invoices.create",
        title: "Create Order",
        modalClass: "modal-xl",
        fields: [
          { 
              name: "organization_id", label: "Organization", type: "select2",
              dropdownParent: '#create-modal',
              className: 'col-md-6',
              ajax: {
                  useBearer: true,
                  term: 'search',
                  response: {id: 'id', text: 'name'},
                  url: appUrl + '/table/organizations',
              }
          },
          {
              name: "customer_id",
              label: "Customer",
              type: "select2",
              className: 'col-md-6',
              dropdownParent: "#create-modal",
              ajax: {
                  useBearer: true,
                  term: "search",
                  response: { id: "id", text: "reference.name" },
                  url: appUrl + "/table/sls_customers",
              },
          },
          { name: "code", label: "Code", type: "text", className: 'col-md-6'},
          { name: "due_date", label: "Due Date", type: "datePicker", className: 'col-md-6'},
          { name: "discount_type", label: "Discount Type", type: "select", className: 'col-md-6', defaultValue: 'fixed', options: [
              { label: "Fixed", value: "fixed" },
              { label: "Percent", value: "percent" },
          ]},
          { name: "discount_price", label: "Discount", type: "text", className: 'col-md-6'},
          { name: "discount_alias", type: "hidden", formula: 'discount_price + "" + (discount_type == "percent" ? "%" : "")'},
          { name: "discount_value", type: "hidden", formula: '(discount_type == "fixed" ? discount_price : sum(items.final_price)*discount_price/100)'},

          { name: "tax_type", label: "Tax Type", type: "select", className: 'col-md-6', defaultValue: 'percent', options: [
              { label: "Fixed", value: "fixed" },
              { label: "Percent", value: "percent" },
          ]},
          { name: "tax_price", label: "Tax", type: "text", className: 'col-md-6'},
          { name: "tax_alias", type: "hidden", formula: 'tax_price + "" + (tax_type == "percent" ? "%" : "")'},
          { name: "tax_value", type: "hidden", formula: '(tax_type == "fixed" ? tax_price : total_price*tax_price/100)'},
          { name: "total_price", label: "Total Price", type: "text", className: 'col-md-6', props: {readonly: true}, formula: 'sum(items.final_price)-discount_value'},
          { name: "final_price", label: "Final Price", type: "text", className: 'col-md-6', props: {readonly: true}, formula: 'total_price+tax_value'},
          { name: "status", label: "Status", type: "select", className: 'col-md-6', defaultValue: 'pending', options: [
              { label: "Pending", value: "pending" },
              { label: "Success", value: "success" },
              { label: "Overdue", value: "overdue" },
          ]},
          { name: "record_type", label: "Record Type", type: "hidden", defaultValue: 'ORDER'},
          { name: "description", label: "Description", type: "textArea"},
          {
            name: "items",
            label: "Items",
            type: "tableItems",
            columns: [
              { 
                columnLabel: "Name", name: "ref_id", type: "select2", 
                dropdownParent: "#create-modal",
                ajax: {
                  useBearer: true,
                  term: "search",
                  response: { id: "item_id", text: "name" },
                  url: appUrl + "/table/sls_products",
                },
              },
              { columnLabel: "Qty", name: "qty", type: "number", style: 'width:40px' },
              { columnLabel: "Unit", name: "unit", type: "text", style: 'width:100px' },
              { columnLabel: "Price", name: "price", type: "number", style: 'width:200px' },
              { columnLabel: "Discount", name: "discount", type: "number",style: 'width:200px' },
              {
                columnLabel: "Final Price",
                name: "final_price",
                type: "number",
                formula: "(price*qty)-discount",
                props: { readonly: true },
                style: 'width:200px'
              },
            ],
          },
        ],
      },
      actions: [
        {
          label: "Detail",
          type: "view",
          icon: "eye",
          permission: "trx_invoices.single",
          title: "Order Detail",
          modalClass: "modal-lg",
          fields: [
            {
              name: "organization_name",
              label: "Organization",
              type: "text",
              className: "col-md-6",
            },
            {
              name: "code",
              label: "Code",
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
                  success: "success",
                  pending: "warning",
                  overdue: "danger",
                },
                label: {
                  success: "Success",
                  pending: "Pending",
                  overdue: "Overdue",
                },
              },
            },
            {
              name: "discount_value",
              label: "Discount Price",
              type: "currency",
              className: "col-md-6",
            },
            {
              name: "total_price",
              label: "Total Price",
              type: "currency",
              className: "col-md-6",
            },
            {
              name: "tax_value",
              label: "Tax Price",
              type: "currency",
              className: "col-md-6",
            },
            {
              name: "final_price",
              label: "Final Price",
              type: "currency",
              className: "col-md-6",
            },
            {
              name: "total_paid",
              label: "Total Paid",
              type: "currency",
              className: "col-md-6",
            },
            {
              name: "remaining_amount",
              label: "Remaining Amount",
              type: "currency",
              className: "col-md-6",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              className: "col-md-6",
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
            {
              name: "items",
              label: "Items",
              type: "tableItems",
              columns: [
                {
                  columnLabel: "Item",
                  name: "name",
                  type: "html",
                  template: `<b>{{name}}</b><br><div class=""><span>{{qty}} {{unit}} x {{price_format}}</span></div>`,
                },
                {
                  columnLabel: "Subtotal",
                  name: "subtotal",
                  type: "currency",
                  className: "text-end",
                },
                {
                  columnLabel: "Discount",
                  name: "discount",
                  type: "currency",
                  className: "text-end",
                },
                {
                  columnLabel: "Final Price",
                  name: "final_price",
                  type: "currency",
                  className: "text-end",
                },
              ],
              footer: [
                { type: "raw", value: "Total" },
                {
                  type: "currency",
                  value: "subtotal",
                  formula: "sum",
                  className: "text-end",
                },
                {
                  type: "currency",
                  value: "discount",
                  formula: "sum",
                  className: "text-end",
                },
                {
                  type: "currency",
                  value: "final_price",
                  formula: "sum",
                  className: "text-end",
                },
              ],
            },
          ],
        },
        {
          label: "Edit",
          type: "edit",
          icon: "edit-2",
          permission: "trx_invoices.update",
          title: "Edit Order",
          show_if: { field: "status", operator: "equals", value: "pending" },
          modalClass: "modal-md",
          fields: [
            {
              name: "organization_id",
              label: "Organization",
              type: "select2",
              dropdownParent: "#edit-modal",
              className: 'col-md-6',
              ajax: {
                useBearer: true,
                term: "search",
                response: { id: "id", text: "label" },
                initList: {
                  url: "/table/organizations",
                  key: "organization_id",
                  response: { id: "id", text: "name" },
                },
                url: appUrl + "/table/organizations",
                urlParams: [{ key: "id", value: "id" }],
              },
            },
            {
                name: "customer_id",
                label: "Customer",
                type: "select2",
                className: 'col-md-6',
                dropdownParent: "#edit-modal",
                ajax: {
                    useBearer: true,
                    term: "search",
                    response: { id: "id", text: "reference.name" },
                    url: appUrl + "/table/sls_customers",
                },
            },
            { name: "code", label: "Code", type: "text", className: 'col-md-6', },
            { name: "due_date", label: "Due Date", type: "datePicker", className: 'col-md-6', },
            { name: "status", label: "Status", type: "select", className: 'col-md-6', defaultValue: 'pending', options: [
              { label: "Pending", value: "pending" },
              { label: "Success", value: "success" },
              { label: "Overdue", value: "overdue" },
            ]},
            {
              name: "record_type",
              label: "Record Type",
              type: "hidden",
              defaultValue: "ORDER",
              readonly: true,
              className: "col-md-6",
            },
            { name: "description", label: "Description", type: "textarea" },
          ],
        },
        {
          label: "Delete",
          type: "delete",
          icon: "trash",
          class: "text-danger",
          permission: "trx_invoices.delete",
          show_if: { field: "status", operator: "equals", value: "pending" },
        },
      ],

      columns: [
        { key: "code", label: "Code", sortable: true, searchable: true },
        { key: "reference.name", label: "Customer" },
        {
          key: "due_date",
          label: "Due Date",
          sortable: true,
          searchable: true,
        },
        // { key: "total_price", label: "Total Price", type: 'currency', sortable: true, searchable: true },
        // { key: "tax_price", label: "Tax", type: 'currency',sortable: true, searchable: true },
        // { key: "discount_price", label: "Discount", type: 'currency', sortable: true, searchable: true },
        {
          key: "final_price",
          label: "Final Price",
          type: "currency",
          sortable: true,
          searchable: true,
        },
        { key: "total_paid", label: "Total Paid", type: "currency" },
        {
          key: "remaining_amount",
          label: "Remaining Amount",
          type: "currency",
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          searchable: true,
          type: "status-badge",
          badge: {
            color: {
              success: "success",
              pending: "warning",
              overdue: "danger",
            },
            label: {
              success: "Success",
              pending: "Pending",
              overdue: "Overdue",
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

      filters: [
          { key: "status", type: "options", label: "Status", placeholder: 'All Status', options: [
              {label: 'Pending', value: 'pending'},
              {label: 'Success', value: 'success'},
              {label: 'Overdue', value: 'overdue'},
          ] },
      ]
    },
  },
};
