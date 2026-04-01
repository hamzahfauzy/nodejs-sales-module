CREATE TABLE sls_products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    item_id BIGINT UNSIGNED NOT NULL,

    price DECIMAL(18,2) DEFAULT 0,
    unit VARCHAR(50) NULL,
    thumbnail_url VARCHAR(255) NULL,
    record_type VARCHAR(50) NULL,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    CONSTRAINT fk_sls_products_item_id
        FOREIGN KEY (item_id) REFERENCES inv_items(id)
        ON DELETE CASCADE,

    INDEX idx_sls_products_item (item_id)
);

CREATE TABLE sls_subscription_plans (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    organization_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(255) NOT NULL,
    description TEXT NULL,

    price DECIMAL(18,2) NOT NULL,

    billing_interval VARCHAR(50) NOT NULL,
    billing_interval_count INT DEFAULT 1,

    trial_days INT DEFAULT 0,

    status VARCHAR(50) DEFAULT 'active',

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_sls_subscription_plans_organization_id
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE,

    INDEX idx_sls_subscription_plans_org (organization_id)
);

CREATE TABLE sls_subscriptions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    organization_id BIGINT UNSIGNED NOT NULL,
    ref_name VARCHAR(255) DEFAULT NULL,
    ref_id BIGINT UNSIGNED NOT NULL,

    code VARCHAR(255) DEFAULT NULL,

    plan_id BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    next_billing_date DATE NULL,
    next_reminder_date DATE NULL,
    auto_renew BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'active',
    metadata JSON NULL,

    price DECIMAL(18,2) DEFAULT 0,
    total_price DECIMAL(18,2) DEFAULT 0,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_sls_subscriptions_plan
        FOREIGN KEY (plan_id) REFERENCES sls_subscription_plans(id),

    CONSTRAINT fk_sls_subscriptions_organization_id
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE,

    INDEX idx_subscriptions_org (organization_id)
);

CREATE TABLE sls_subscription_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    subscription_id BIGINT UNSIGNED NOT NULL,

    product_id BIGINT UNSIGNED NOT NULL,

    qty DECIMAL(12,2) DEFAULT 1,
    price DECIMAL(12,2) DEFAULT 0,
    total_price DECIMAL(12,2) DEFAULT 0,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sls_subscription_items_subscription
        FOREIGN KEY (subscription_id) REFERENCES sls_subscriptions(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_sls_subscription_items_product_id
        FOREIGN KEY (product_id) REFERENCES sls_products(id)
);

CREATE TABLE sls_customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    organization_id BIGINT UNSIGNED NOT NULL,
    
    ref_id BIGINT UNSIGNED NOT NULL,
    ref_name VARCHAR(255) NOT NULL,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_sls_customers_organization_id
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE,

    INDEX idx_sls_customers_org (organization_id)
);