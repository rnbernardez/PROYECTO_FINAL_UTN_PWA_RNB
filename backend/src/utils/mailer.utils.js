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
            from: `Equipo de Pescado Libre`,
            to: email,
            subject: `Confirma tu email`,
            text: `Hola ${username},\n\nHaz clic aquí para confirmar tu email:\n${verificationLink}\n\nEl equipo de Pescado Libre`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error en sendVerificationEmail:", error);
        throw error; 
    }
};