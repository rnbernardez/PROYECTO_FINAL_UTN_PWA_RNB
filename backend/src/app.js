import express from 'express'
import ENVIROMENT from './config/enviromentconfig.js';
import userRouter from './routes/userRouter.js';
import shopRouter from './routes/shopRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/shop', shopRouter);
app.use('/api/cart', cartRouter);

app.listen(ENVIROMENT.PORT, () => {
  console.log(`Server ejecutandose en el puerto http://localhost:${ENVIROMENT.PORT}`);
});