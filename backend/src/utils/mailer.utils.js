import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export const sendVerificationEmail = async (email, token) => {
    try {
        if (!process.env.GMAIL_USERNAME || !process.env.GMAIL_PASSWORD) {
            throw new Error("Configuración de email no completa");
        }

        const verificationLink = `${process.env.URL_FRONTEND}/user/verify/${token}`;

        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject: "Verifica tu cuenta",
            html: `...`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error en sendVerificationEmail:", error);
        throw error; // Opcional: puedes decidir no lanzar el error
    }
};