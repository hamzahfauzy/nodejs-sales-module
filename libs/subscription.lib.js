import { Setting } from "#app/main/libraries/setting.lib.js";
import { getTable } from "#database/database.registry.js";
import DatabaseService from "#database/database.service.js";
import { eventBus } from "#libs/eventBus.js";

const service = new DatabaseService
export async function generateSubscriptionBillById(subscription_id){
    try {
        
        const subscriptionTable = getTable('sls_subscriptions')
        const subscription = await service.single(subscriptionTable, subscription_id)
        const ym = new Date().toISOString().slice(0, 7).replace('-', '');
    
        const settingKey = 'subscription_invoice_number_'+ym
        const subscription_invoice_number = await Setting.get(settingKey, 1)
        const result = String(subscription_invoice_number).padStart(4, '0');
        await Setting.set(settingKey, subscription_invoice_number+1)
    
        const payload = {
            organization_id: subscription.organization_id,
            code: `INV/${subscription.code}/${ym}/${result}`,
            due_date: subscription.next_billing_date,
            total_price: subscription.total_price,
            final_price: subscription.total_price,
            ref_name: subscription.ref_name,
            ref_id: subscription.ref_id,
            discount_type: 'fixed',
            discount_alias: 0,
            discount_value: 0,
            tax_type: 'fixed',
            tax_alias: 0,
            tax_value: 0,
            record_type: 'SUBSCRIPTION'
        }
    
        const invoiceItems = []
        const planPrice = parseFloat(subscription.plan.price)
        invoiceItems.push({
            name: subscription.plan.name,
            qty: 1,
            unit: 'period',
            discount: 0,
            price: planPrice,
            subtotal: planPrice,
            final_price: planPrice,
        })
    
        for(const item of subscription.items)
        {
            const totalPrice = parseFloat(item.total_price)
            invoiceItems.push({
                name: item.product.item.name,
                qty: item.qty,
                unit: item.product.item.unit,
                discount: 0,
                price: item.price,
                subtotal: totalPrice,
                final_price: totalPrice,
            })
        }
    
        payload.items = invoiceItems
    
        const invoiceTable = getTable('trx_invoices')
        const invoice = await service.create(invoiceTable, payload)
    
        await eventBus.emitAsync(`subscription-bill.created`, {subscription})
        return invoice
    } catch (error) {
        console.log(error)
    }

    return null

}