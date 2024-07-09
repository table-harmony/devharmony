/**
 * Publicly accessible routes that do not require authentication.
 * These routes can be accessed by any user.
 */
export const publicRoutes = [
  "/",
  "/terms-of-service",
  "/privacy-policy",
  "/changelog",
  "/contact",
];

/**
 * Routes accessible that require user unauthentication.
 * These routes are related to user authentication and account management,
 */
export const authRoutes = [
  "/login",
  "/login/forgot-password",
  "/register",
  "/reset-password",
  "/email-verification",
  "/reset-password-email",
];

/**
 * Prefix for API authentication routes.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Routes accessible only by admin users.
 * These routes are for administrative tasks and user management.
 */
export const adminRoutes = ["/dashboard", "/dashboard/users"];

/**
 * Default redirect route after a successful login.
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
