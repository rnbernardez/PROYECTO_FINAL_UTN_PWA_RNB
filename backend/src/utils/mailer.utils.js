import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.FRONTEND_URL}/verify/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
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
