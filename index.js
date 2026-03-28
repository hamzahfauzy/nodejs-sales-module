import menu from "./config/menu.js";

import sales_products from "./pages/sales_products.js";
import sales_merchandise from "./pages/sales_merchandise.js";
import sales_services from "./pages/sales_services.js";
import sales_orders from "./pages/sales_orders.js";
import sales_subscription_bills from "./pages/sales_subscription_bills.js";
import sales_subscription_plans from "./pages/sales_subscription_plans.js";
import sales_subscriptions from "./pages/sales_subscriptions.js";
import sales_customers from "./pages/sales_customers.js";
import products from "./databases/model/products.js";
import subscription_plans from "./databases/model/subscription_plans.js";
import subscription_items from "./databases/model/subscription_items.js";
import subscriptions from "./databases/model/subscriptions.js";
import customers from "./databases/model/customers.js";

export default {
  // context {register, ui, db}
  init(context) {
    for (const m in menu) {
      context.ui.registerMenu(m, menu[m]);
    }
    context.ui.registerPage("sales/products", sales_products);
    context.ui.registerPage("sales/merchandise", sales_merchandise);
    context.ui.registerPage("sales/services", sales_services);
    context.ui.registerPage("sales/orders", sales_orders);
    context.ui.registerPage(
      "sales/subscription-bills",
      sales_subscription_bills,
    );
    context.ui.registerPage(
      "sales/subscription-plans",
      sales_subscription_plans,
    );
    context.ui.registerPage("sales/customers", sales_customers);
    context.ui.registerPage("sales/subscriptions", sales_subscriptions);
    context.register.table("sls_products", products);
    context.register.table("sls_subscription_plans", subscription_plans);
    context.register.table("sls_subscription_items", subscription_items);
    context.register.table("sls_subscriptions", subscriptions);
    context.register.table("sls_customers", customers);
    context.register.migration("sales", "app/sales/databases/migrations");
  },
};
