import { Router } from "express";
import { UserController } from "@controllers/users.controller";
import {
  CreateUserDto,
  LoginUserDto,
  ResendVerificationDto,
  VerifyUserDto,
} from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);
    this.router.post(
      // create user
      `${this.path}/create`,
      ValidationMiddleware(CreateUserDto),
      this.user.createUser,
    );
    this.router.put(
      // update user
      `${this.path}/:id(\\d+)`,
      ValidationMiddleware(CreateUserDto, true),
      this.user.updateUser,
    );
    this.router.delete(
      // delete user
      `${this.path}/:id(\\d+)`,
      this.user.deleteUser,
    );
    this.router.post(
      // login user
      `${this.path}/login`,
      ValidationMiddleware(LoginUserDto),
      this.user.loginUser,
    );
    this.router.patch(
      // verify user
      `${this.path}/verify-user`,
      ValidationMiddleware(VerifyUserDto),
      this.user.verifyUser,
    );

    this.router.patch(
      // resend verification
      `${this.path}/resend-verification`,
      ValidationMiddleware(ResendVerificationDto),
      this.user.resendVerification,
    );

    // get profile
    this.router.get(
      `${this.path}/profile`,
      ValidationMiddleware(VerifyUserDto),
      this.user.getProfile,
    );

    // forgot password
    this.router.post(
      `${this.path}/forgot-password`,
      ValidationMiddleware(ResendVerificationDto),
      this.user.forgotPassword,
    );

    // reset password
    this.router.patch(
      `${this.path}/reset-password`,
      ValidationMiddleware(LoginUserDto),
      this.user.resetPassword,
    );
  }
}
