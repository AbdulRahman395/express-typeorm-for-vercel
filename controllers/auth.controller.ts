import { Request, Response } from "express";
import AppDataSource from "../config/data-source";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userLoginSchema, userRegistrationSchema } from "../validators/user.validator";
import { useErrorResponse, useInterServerErrorResponse, useSuccessResponse } from "../utils/response.handlers";
import { message, statusCode } from "../utils/response.constants";
import { handleZodError } from "../utils/zod.error";

const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validationResult = userRegistrationSchema.safeParse(req.body);

    if (!validationResult.success) {
      return handleZodError(validationResult.error, res);
    }

    const validatedData = validationResult.data;

    // TypeORM way
    const existingUser = await userRepo.findOne({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return useErrorResponse(res, message.emailExists, statusCode.conflict);
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // create != save
    const user = userRepo.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword
    });

    await userRepo.save(user);

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return useSuccessResponse(
      res,
      message.createSuccess,
      { token, user: { id: user.id, name: user.name, email: user.email } },
      statusCode.created
    );

  } catch (error: any) {
    console.error(error);
    return useInterServerErrorResponse(res, error.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validationResult = userLoginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return handleZodError(validationResult.error, res);
    }

    const user = await userRepo.findOne({
      where: { email: validationResult.data.email }
    });

    if (!user) {
      return useErrorResponse(res, message.userNotFound, statusCode.notFound);
    }

    const isPasswordValid = await bcrypt.compare(
      validationResult.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return useErrorResponse(res, message.invalidCredentials, statusCode.unauthorized);
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET!
    );

    return useSuccessResponse(
      res,
      message.loginSuccess,
      { token, user: { id: user.id, name: user.name, email: user.email } },
      statusCode.success
    );

  } catch (error: any) {
    return useInterServerErrorResponse(res, error.message);
  }
};
