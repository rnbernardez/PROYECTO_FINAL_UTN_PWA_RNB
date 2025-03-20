class ServerError extends Error {
    constructor(message, status) {
        super(message); 
        this.status = status;
    }
}

const handleError = (response, error) => {
    console.log("Error de autorización:", error.message);
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    return response.status(status).json({ ok: false, status, message });
};

export { ServerError, handleError };