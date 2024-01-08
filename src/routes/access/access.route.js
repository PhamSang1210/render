import express from "express";
const router = express.Router();
import AccessController from "../../controllers/AccessController.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import CheckAuth from "../../auth/CheckAuth.js";
import AuthUtilJWT from "../../auth/auth.jwt.js";

// Check Auth
router.use(asyncHandler(CheckAuth.apiKey));
router.use(CheckAuth.premissions("0000"));

// [GATEWAY]
router.post("/register", asyncHandler(AccessController.register));
router.post("/login", asyncHandler(AccessController.login));

// Authenticate
router.use(asyncHandler(AuthUtilJWT.authentication));
router.post("/logout", asyncHandler(AccessController.logout));
router.post(
    "/handleRefreshToken",
    asyncHandler(AccessController.handleRefreshToken)
);

export default router;
