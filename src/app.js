import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import {fileURLToPath} from "url";
import publicRoutes from "./routes/public-routes.js";
import authRoutes from "./routes/auth-routes.js";
import {requireAdmin} from "./middleware/auth.js";
import adminRoutes from "./routes/admin-routes.js";

const app=express();

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const publicDir=path.resolve(__dirname,"../public");

app.disable("x-powered-by");

app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({
    extended:false,
    limit:"1mb"
}));
app.use(cookieParser());

app.use("/api",publicRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);

app.get(/^\/admin(?:\/|\/index\.html)?$/,requireAdmin,(req,res)=>{
    res.sendFile(
        path.join(publicDir,"admin/index.html")
    );
});

app.use(express.static(publicDir,{
    index:false
}));

app.get("/",(req,res)=>{
    res.sendFile(
        path.join(publicDir,"index.html")
    );
});

app.use("/api",(req,res)=>{
    res.status(404).json({
        error:"Rota nao encontrada"
    });
});

app.use((req,res)=>{
    res.status(404).sendFile(
        path.join(publicDir,"404.html")
    );
});

export default app;