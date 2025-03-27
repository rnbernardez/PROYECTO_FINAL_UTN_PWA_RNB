import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.URL_FRONTEND}/user/verify/${token}`;

    const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: email,
        subject: "Verifica tu cuenta",
        html: `
            <h2>Bienvenido a nuestra tienda</h2>
            <p>Para activar tu cuenta, haz clic en el siguiente enlace:</p>
            <a href="${verificationLink}">Verificar Cuenta</a>
            <p>Si no solicitaste este correo, puedes ignorarlo.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};
