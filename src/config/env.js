import "dotenv/config";

export const env={
    port:Number(process.env.PORT)||3000,
    nodeEnv:process.env.NODE_ENV||"development",
    supabaseUrl:process.env.SUPABASE_URL,
    supabaseSecretKey:process.env.SUPABASE_SECRET_KEY,
    jwtSecret:process.env.JWT_SECRET,
    jwtExpiresIn:process.env.JWT_EXPIRES_IN||"8h",
    cookieName:process.env.COOKIE_NAME||"fp_admin"
};