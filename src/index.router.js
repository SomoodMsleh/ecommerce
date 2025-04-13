import cors from 'cors';
import connectDB from '../DB/connection.js';
import authRouter from './Modules/auth/auth.router.js';
import userRouter from './Modules/user/user.router.js';
import categoryRouter from './Modules/category/category.router.js';
import ProductRouter from './Modules/product/product.router.js'
import couponRouter from './Modules/coupon/coupon.router.js';
import cartRouter from './Modules/cart/cart.router.js';
import orderRouter from "./Modules/order/order.router.js"
const initApp = async(app,express)=>{
    app.use(express.json());
    app.use(cors());
    connectDB();
    app.get('/',(req,res)=>{
        return res.status(200).json({message:"Welcome ...."});
    });
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/category',categoryRouter);
    app.use('/product',ProductRouter);
    app.use('/coupon',couponRouter);
    app.use('/cart',cartRouter);
    app.use('/order',orderRouter);
    app.use((req, res) => {
        return res.status(404).json({ message: "page not found" });
    });
};

export default initApp;