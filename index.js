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
import { eventBus } from "#libs/eventBus.js";
import { getModel, getTable } from "#database/database.registry.js";
import DatabaseService from "#database/database.service.js";
import { generateSubscriptionBillById } from "./libs/subscription.lib.js";

const service = new DatabaseService

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

    context.register.route('sales', (router) => {
      router.post('/create-subscription-invoice', async (req, res) => {
        const subscription_id = req.body.subscription_id
        const invoice = generateSubscriptionBillById(subscription_id)

        res.json({
          data: invoice,
          message: 'subscription bill success'
        })
      })
      router.get('/get-customer-by-subs-id/:id', async (req, res) => {
        const subscription = await getModel('sls_subscriptions').findByPk(req.params.id)
        const customerTable = getTable('sls_customers')
        const data = await service.singleByClause(customerTable, {
          ref_id: subscription.ref_id,
          ref_name: subscription.ref_name,
        })
        res.json({
          data,
          message: 'single data retrieved'
        })
      })
    })
    

    eventBus.on('trx_invoices.beforeCreate', async context => {
      if(context.payload.customer_id)
      {
        const customerModel = getModel('sls_customers')
        const customer = await customerModel.findByPk(context.payload.customer_id)
        context.payload.ref_name = customer.ref_name
        context.payload.ref_id = customer.ref_id

        delete context.payload.customer_id
      }
    })
    
    eventBus.on('trx_invoices.beforeUpdate', async context => {
      if(context.payload.customer_id)
      {
        const customerModel = getModel('sls_customers')
        const customer = await customerModel.findByPk(context.payload.customer_id)
        context.payload.ref_name = customer.ref_name
        context.payload.ref_id = customer.ref_id

        delete context.payload.customer_id
      }
    })
  },
};
