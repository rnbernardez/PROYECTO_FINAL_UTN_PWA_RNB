const shopController = (req, res) => {
    res.send("shop")
}

const productController = (req, res) => {
    res.send("product")
}

const addProductController = (req, res) => {
    res.send("add-product")
}

export { shopController, productController, addProductController }