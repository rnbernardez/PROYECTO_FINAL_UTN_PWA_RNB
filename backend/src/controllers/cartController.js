const cartController = (req, res) => {
    res.send("cart")
}

const addCardController = (req, res) => {
    res.send("add-card")
}

const checkoutController = (req, res) => {
    res.send("checkout")
}

const purchaseOkController = (req, res) => {
    res.send("purchaseok")
}

export { cartController, addCardController, checkoutController, purchaseOkController }