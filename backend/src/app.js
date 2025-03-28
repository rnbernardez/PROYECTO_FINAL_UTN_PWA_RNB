import express from 'express'
import cors from 'cors'
import ENVIROMENT from './config/enviromentconfig.js';
import userRouter from './routes/userRouter.js';
import shopRouter from './routes/shopRouter.js';
import cartRouter from './routes/cartRouter.js';
import connectToMongoDB from './config/MongoDBconfig.js';
import dotenv from 'dotenv';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();
connectToMongoDB();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/shop', shopRouter);
app.use('/api/cart', authMiddleware, cartRouter);

app.listen(ENVIROMENT.PORT, () => {
  console.log(`Server ejecutandose en el puerto http://localhost:${ENVIROMENT.PORT}`);
});
