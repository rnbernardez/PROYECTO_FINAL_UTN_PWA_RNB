import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const VerifyAccountScreen = ({ match }) => {
    const { token } = match.params; // Obtenemos el token de la URL
    const history = useHistory();

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await fetch(`/api/user/verify/${token}`);
                const data = await response.json();

                if (data.ok) {
                    setTimeout(() => {
                        history.push("/login");  // Redirige al Login después de unos segundos
                    }, 2000); // Espera 2 segundos antes de redirigir
                } else {
                    alert(data.message);  // Mostrar mensaje de error
                }
            } catch (error) {
                console.error("Error al verificar la cuenta:", error);
            }
        };

        verifyAccount();
    }, [token, history]);

    return <div>Tu cuenta ha sido verificada, redirigiendo al login...</div>;
};

export default VerifyAccountScreen;
