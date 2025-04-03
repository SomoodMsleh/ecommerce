import express from 'express';
import initApp from './src/index.router.js';
const app = express();
const port = process.env.PORT || 3000;

initApp(app,express);
app.listen(port,()=>{
    console.log(`server is running in port ${port} ....`);
})