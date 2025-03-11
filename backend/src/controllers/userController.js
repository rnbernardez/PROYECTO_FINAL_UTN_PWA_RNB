const loginController = (req, res) => {
    res.send("login")
}

const registerController = (req, res) => {
    res.send("register")
}

const profileController = (req, res) => {
    res.send("profile")
}

export { loginController, registerController, profileController }