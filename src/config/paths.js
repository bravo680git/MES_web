const paths = {
    dashboard: "/",
    oee: "/oee",
    oeeDetail: "/oee/:id",
    downtime: "/downtime",
    progress: "/production-progress",
    command: "/work-order",
    newProduct: "/work-order/new-product",
    product: "/work-order/products/:productId",
    scheduling: "/work-order/product-scheduling",
    schedule: "/production-schedule",

    resource: "/resource",
    resourceType: "/resource/:type",
    class: "/resource/:type/class",

    setting: "/setting",
    login: "/login",
    signInOidc: "/signin-oidc",
}

export default paths
