import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import {fileURLToPath} from "url";

import publicRoutes from "./routes/public-routes.js";
import authRoutes from "./routes/auth-routes.js";
import adminRoutes from "./routes/admin-routes.js";

import {requireAdmin} from "./middleware/auth.js";
import {apiLimiter} from "./middleware/rate-limit.js";
import {validateOrigin} from "./middleware/validate-origin.js";
import {notFound} from "./middleware/not-found.js";
import {errorHandler} from "./middleware/error-handler.js";

import {env} from "./config/env.js";

const app=express();

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const publicDir=path.resolve(
    __dirname,
    "../public"
);

if(env.nodeEnv==="production"){
    app.set("trust proxy",1);
}

app.disable("x-powered-by");

app.use(
    helmet({
        crossOriginResourcePolicy:{
            policy:"cross-origin"
        },

        contentSecurityPolicy:{
            directives:{
                defaultSrc:[
                    "'self'"
                ],

                scriptSrc:[
                    "'self'"
                ],

                styleSrc:[
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com"
                ],

                fontSrc:[
                    "'self'",
                    "https://fonts.gstatic.com",
                    "data:"
                ],

                imgSrc:[
                    "'self'",
                    "data:",
                    "blob:",
                    "https:"
                ],

                connectSrc:[
                    "'self'"
                ],

                objectSrc:[
                    "'none'"
                ],

                baseUri:[
                    "'self'"
                ],

                formAction:[
                    "'self'"
                ],

                frameAncestors:[
                    "'none'"
                ]
            }
        }
    })
);

app.use(
    express.json({
        limit:"1mb"
    })
);

app.use(
    express.urlencoded({
        extended:false,
        limit:"1mb"
    })
);

app.use(cookieParser());

app.use(validateOrigin);

app.use(
    "/api",
    apiLimiter
);

app.use(
    "/api",
    publicRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

app.get(
    /^\/admin(?:\/|\/index\.html)?$/,
    requireAdmin,
    (req,res)=>{
        res.sendFile(
            path.join(
                publicDir,
                "admin/index.html"
            )
        );
    }
);

app.use(
    express.static(
        publicDir,
        {
            index:false
        }
    )
);

app.get("/",(req,res)=>{
    res.sendFile(
        path.join(
            publicDir,
            "index.html"
        )
    );
});

app.use(
    notFound(publicDir)
);

app.use(
    errorHandler
);

export default app;