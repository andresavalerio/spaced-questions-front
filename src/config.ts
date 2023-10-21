const environment = import.meta.env;

const environmentMode = import.meta.env.VITE_ENV;

export const isDevelopment = environmentMode
  ? environmentMode === "development"
  : true;

export const isTest = environmentMode === "test";

export const isProduction = environmentMode === "production";

export const hasSSL = environment.VITE_HAS_SSL;

const host = environment.VITE_SERVER_HOST || "localhost";
const port = environment.VITE_SERVER_PORT || 5000;

const httpMode = hasSSL ? "https" : "http";

export const serverBaseUrl = `${httpMode}://${host}:${port}/api`;
