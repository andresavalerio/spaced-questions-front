export const isDevelopment = import.meta.env.MODE === "development";

export const isStaging = import.meta.env.MODE === "staging";

export const isProduction = import.meta.env.MODE === "production";

export const hasSSL = import.meta.env.VITE_HAS_SSL;

const host = import.meta.env.VITE_SERVER_HOST || "localhost";

const port = import.meta.env.VITE_SERVER_PORT || 5000;

const httpMode = hasSSL ? "https" : "http";

export const serverBaseUrl = `${httpMode}://${host}:${port}/api`;
