export default {
  sales: {
    label: "Sales",
    icon: "box",
    permissions: [
      "sls_products.list",
      "sls_subscription_plans.list",
      "trx_invoices.list",
      "sls_subscriptions.list",
      "sls_customers.list",
    ],
    activeState: [
      "/sales",
      "/sales/customers",
      "/sales/products",
      "/sales/merchandise",
      "/sales/services",
      "/sales/subscription-plans",
      "/sales/subscriptions",
      "/sales/orders",
      "/sales/subscription-bills",
    ],
    children: {
      customers: {
        label: "Customers",
        route: "/sales/customers",
        permission: "sls_customers.list",
        activeState: ["/sales/customers"],
      },
      products: {
        label: "Products",
        route: "/sales/products",
        permission: "sls_products.list",
        activeState: ["/sales/products"],
      },
      merchandise: {
        label: "Merchandise",
        route: "/sales/merchandise",
        permission: "sls_products.list",
        activeState: ["/sales/merchandise"],
      },
      services: {
        label: "Services",
        route: "/sales/services",
        permission: "sls_products.list",
        activeState: ["/sales/services"],
      },
      orders: {
        label: "Orders",
        route: "/sales/orders",
        permission: "trx_invoices.list",
        activeState: ["/sales/orders"],
      },
      subscriptionPlans: {
        label: "Subscription Plans",
        route: "/sales/subscription-plans",
        permission: "sls_subscription_plans.list",
        activeState: ["/sales/subscription-plans"],
      },
      subscriptions: {
        label: "Subscriptions",
        route: "/sales/subscriptions",
        permission: "sls_subscriptions.list",
        activeState: ["/sales/subscriptions"],
      },
      subscriptionBills: {
        label: "Subscription Bills",
        route: "/sales/subscription-bills",
        permission: "trx_invoices.list",
        activeState: ["/sales/subscription-bills"],
      },
      
    },
  },
};
