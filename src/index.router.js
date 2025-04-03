const initApp = async(app,express)=>{
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.status(200).json({message:"Welcome ...."});
    });
    app.use((req, res) => {
        return res.status(404).json({ message: "page not found" });
    });
};

export default initApp;