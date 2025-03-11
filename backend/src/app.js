import express from 'express'
import ENVIROMENT from './config/enviromentconfig.js';

const app = express();
app.use(express.json());


app.listen(ENVIROMENT.PORT, () => {
  console.log(`Server ejecutandose en el puerto http://localhost:${ENVIROMENT.PORT}`);
});