- Descripción del Proyecto - 

Este proyecto es una aplicación de ecommerce desarrollada con MongoDB, Express.js, React y Node.js. Permite a los usuarios registrados explorar una tienda en línea, agregar productos a un carrito de compras y realizar pedidos. 
El backend maneja la autenticación de usuarios con JWT, encriptación de contraseñas con bcrypt y almacenamiento de datos en MongoDB mediante Mongoose. También se implementa un sistema de validación de cuentas por correo electrónico.
El frontend, construido con React y Vite, utiliza React Router para la navegación y gestiona el estado del carrito mediante un contexto (CartProvider). Se prioriza una integración fluida con el backend mediante llamadas a la API. Tambien utiliza Bootstrap para gestionar los aspectos de estilo en CSS. 

- Librerías Usadas -

Backend:

Express.js - Mongoose - bcrypt - jsonwebtoken - dotenv - cors - nodemailer 

Frontend:

React - Vite - React Router DOM - Context API - Axios

- Proceso y dificultades -

Ya llegando hacia el final de la cursada, me encontraba con la idea de hacer un pequeño ecommerce; de todas las opciones de desarrollo que los conocimientos de la cursada abrían, cuando nos dieron las consignas del trabajo final, vi que el ecommerce cumplía con los requisitos necesarios para ser un candidato a proyecto final.
Al empezar el desarrollo, primero plasmé un workflow en papel para poder visualizar tanto las posibles screens como las funciones y relaciones que necesitaria establecer el backend para que todo sea funcional. Hoy, finalizando, creo que subestimé la complejidad que involucraba desarrollar esta idea.
Comencé, luego de establecer un workflow que consideré correcto, a desarrollar el backend. Me pareció más logico comenzar de atrás para adelante, permitiendome primero establecer toda una lógica coherente y sólida, antes de empezar a montarla sobre los componentes del frontend. Debo decir que esta parte, pese a ser compleja, fue la que más disfruté hacer y en la que me sentí mas cómodo. Una vez que entendí como utilizar y aplicar estados, a medida que las relaciones lógicas crecían pero se volvían sólidas, fue un proceso trabajoso pero muy estimulante y desafiante intelectualmente. Si tuviera que elegir, creo que el backend fué lo que más me gustó de toda la cursada.
Una vez terminado el back, me dediqué al front pero sin tener en cuenta los estilos, que pensaba gestionar con Bootstrap. Prioricé la arquitectura de screens y componentes, que trajeron assets, hooks y services que, aunque me resultaron complicados de desarrolar, tomaban forma y se presentaban funcionales entre sí. El proyecto se sentía sólido y en crecimiento, lo que me mantenía codeando entusiasmado. Terminado esto, pensé en concentrarme en lo estético de la aplicación, pero algo me decía que antes de empezar con el CSS (que terminó virando a Bootstrap), tenía que chequear que el deploy funcione.
Ahi comenzaron los problemas de verdad. Tuve problemas con Vercel y terminñe migrando todo el proyecto a Render, que me pareció una plataforma mas amigable para desplegar todo junto. Con un poco de ayuda de tutoriales de Youtube, logré un deploy exitoso del back y del front. Pero, al momento de entrar en esta app desplegada, muchos elementos fallaban. A pesar de que las bases de datos en MongoDB están funcionales, a pesar de que el back presentaba todas sus conexiones como correctas, y que todas las screen me parecían correctas - llamando a lo que tenían que llamar de la manera correcta, fetcheando los datos con las rutas adecuadas y así - casi todo el deploy se mostraba roto. No todos los botones funcionaban, muchos errores de servidor y errores puntuales se iban presentando, el renderizado de algunas cosas fallaba, y realmente buscar los errores en la consola y la red solo aumentaba mi desesperacion, porque no sabía como interpretar o solucionar la mayoria de ellos. Lo que consultaba con ChatGPT o Deepseek al respecto, aunque a veces solucionaba el problema, mas de una vez proponía cambios en el código que o no entendía, o arreglaban algo rompiendo el resto. Hubo una semana de mucha pelea con esta barrera, porque no contaba con la información necesaria para interpretar en detalle y realmente entender qué es lo que estaba pasando. Recuerdo particularmente el mailer (de los pocos aspectos que siento que terminaron trabajando bien en este proyecto) como un desafío grande de lograr hacer funcional.
Al mismo tiempo, veía como cada vez se complejizaba más y más la aplicación: para que realmente sea un ecommerce había un montón de funciones a realizar que no había previsto en el workflow inicial, y su implementacion - al menos de las que llegué a codear - fue difícil. Creo que la lógica del back y el desarollo de las screens en el front se pudo lograr, pero el peloteo de información y renderizado entre ambos fue caótico e irresoluble. Perdí mucho tiempo con pequeñeces y creo que algunas de esas modificaciones hechas en el medio de la desesperación contribuyeron a crear errores en el código que todavía persisten. Sumado a esto - aunque este es un comentario meramente personal y no quiero que sea tomado como excusa de ninguna manera - el Viernes se me rompió la computadora y tardé en conseguir otra para trabajar, con lo que perdí dias de desarollo (se puede ver que antes de este, el ultimo commit es del Viernes pasado).
En resumen: comencé con emoción un proyecto que sabía complejo, para el que me sentía confiado, pero que subestimé completamente y que terminó por superar. Si pudiese elegir de nuevo, no creo que tomara la misma desición. Sin embargo, tambien este proyecto me mostró que realmente lo que más me interesa es el backend y las bases de datos, no tanto el diseño web. Hay algo también de la "appification" que todo lo que aprendimos en la cursada me hace pensar como posible e interesante: poder hacer pequeñas apps funcionales, para empezar a dejar atrás modelos estáticos (como bases en Excel) o poder ofrecer pequeñas funcionalidades específicas, siento que es lo que realmente me gustaría hacer de aquí en adelante. Claro está, con un diseñador que se encargue de lo visual.

Gracias Mati y equipo por su dedicación y calidad en la enseñanza. Personalmente, a los meses de empezar la cursada conseguí un trabajo nocturno que no me permitió seguir en vivo las clases y tuve que pasarme al modo asincrónico. Claramente las clases presenciales son mejores, pero aún así la calidad de las explicaciones y la información que se nos enseñaba era directa, clara y entendible. Esto me motivó a no dejar la cursada y no me arrepiento: ha sido todo un gran aprendizaje hasta este momento, y pese a que no estoy contento con lo que estoy presentando de trabajo final, estoy satisfecho: traté de aplicar todo lo que me enseñaron y creo que lo dí todo para que así sea.
Una vez mas, gracias Mati y equipo: son grandes docentes. Y para los que tenemos horarios complicados, la posibilidad de no perder la cursada aun con una asincronía casi total tambien se agradece.
Sin más, me despido. Gracias por tanto, perdón por tan roto codigo!

Rodrigo Nicolas Bernardez
rnbernardez93@gmail.com