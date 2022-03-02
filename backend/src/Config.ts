
/**
 * @description
 * Used if this service is running in debug mode.
 */
export const DebugMode = process.env.DEBUG === "true" ? true : false;
export const HomeDir = ((__dirname.replace("\\build", "")).replace("/build", ""));
export const JWT_Access_Token = process.env.JWT_ACCESS_TOKEN ?? "";
export const d_Days = parseInt(process.env.D_DAYS ?? "30");
export const Domain = process.env.DOMAIN ?? "localhost";
export const Http_Schema = process.env.HTTP_SCHEMA ?? "http";
export const PORT = process.env.PORT ?? 8080;
export const Full_Domain = `${Http_Schema}://${Domain === "localhost" ? `localhost:${PORT}` : Domain}`;

export const Frontend_Domain = process.env.FRONTEND_DOMAIN ?? "localhost";

// API
export const Express_Session_Secret = process.env.SESSION_SECRET ?? require("crypto").randomBytes(20).toString("hex");

// Database
export const MongoDB_URI = process.env.MONGO_URI ?? "mongodb://localhost/cpg";
