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
            from: `"Equipo de Pescado Libre" <${process.env.GMAIL_USERNAME}>`,
            to: email,
            subject: `Confirma tu email en Pescado Libre`,
            text: `Por favor haz clic en este enlace para confirmar tu email:\n${verificationLink}\n\nEl equipo de Pescado Libre`,
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <p>Por favor haz clic en el botón para confirmar tu email:</p>
                    <a href="${verificationLink}" 
                       style="background-color: #4CAF50; color: white; 
                              padding: 10px 20px; text-decoration: none;
                              border-radius: 5px; display: inline-block;">
                        Confirmar email
                    </a>
                    <p>Si no solicitaste este registro, ignora este mensaje.</p>
                    <p>El equipo de Pescado Libre</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado:", info.messageId);
    } catch (error) {
        console.error("Error al enviar email:", error);
        throw error; 
    }
};