import { Request, Response } from "express";
import AppDataSource from "../config/data-source";
import { Todo } from "../models/todo.model";
import { message, statusCode } from "../utils/response.constants";
import { useErrorResponse, useInterServerErrorResponse, useSuccessResponse } from "../utils/response.handlers";
import { handleZodError } from "../utils/zod.error";
import { createToDoTask } from "../validators/todo.validator";

const todoRepo = AppDataSource.getRepository(Todo);

export const createTodo = async (req: any, res: Response) => {
  try {
    const validationResult = createToDoTask.safeParse(req.body);

    if (!validationResult.success) {
      return handleZodError(validationResult.error, res);
    }

    const todo = todoRepo.create({
      ...validationResult.data,
      user: { id: req.user.id } // relation binding
    });

    await todoRepo.save(todo);

    return useSuccessResponse(res, message.createSuccess, todo, statusCode.created);

  } catch (error: any) {
    return useInterServerErrorResponse(res, error.message);
  }
};


export const getTodos = async (req: any, res: Response) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const qb = todoRepo.createQueryBuilder("todo")
      .where("todo.userId = :userId", { userId: req.user.id })
      .andWhere("todo.isDeleted = false")
      .orderBy("todo.createdAt", "DESC")
      .skip(offset)
      .take(limit);

    // Date filter
    if (req.query.date) {
      const [day, month, year] = (req.query.date as string).split("-").map(Number);
      const startDate = new Date(year, month - 1, day);
      const endDate = new Date(year, month - 1, day + 1);

      qb.andWhere("todo.createdAt BETWEEN :start AND :end", {
        start: startDate,
        end: endDate
      });
    }

    const [todos, totalTodos] = await qb.getManyAndCount();

    const groupedTodos = {
      completed: todos.filter(t => t.isCompleted),
      pending: todos.filter(t => !t.isCompleted)
    };

    return useSuccessResponse(res, message.fetchSuccess, {
      todos: groupedTodos,
      page,
      limit,
      totalTodos
    }, statusCode.success);

  } catch (error: any) {
    return useInterServerErrorResponse(res, error.message);
  }
};

export const getSingleTodo = async (req: any, res: Response) => {
  try {
    const todo = await todoRepo.findOne({
      where: {
        id: req.params.id,
        isDeleted: false,
        user: { id: req.user.id }
      }
    });

    if (!todo) {
      return useErrorResponse(res, message.notFound, statusCode.notFound);
    }

    return useSuccessResponse(res, message.fetchSuccess, todo, statusCode.success);

  } catch (error: any) {
    return useInterServerErrorResponse(res, error.message);
  }
};

export const updateTodo = async (req: any, res: Response) => {
  try {
    const todo = await todoRepo.findOne({
      where: { id: req.params.id, isDeleted: false }
    });

    if (!todo) {
      return useErrorResponse(res, message.notFound, statusCode.notFound);
    }

    todoRepo.merge(todo, req.body);
    await todoRepo.save(todo);

    return useSuccessResponse(res, message.dataUpdateSuccess, todo, statusCode.success);

  } catch (error: any) {
    return useInterServerErrorResponse(res, error.message);
  }
};

export const deleteTodo = async (req: any, res: Response) => {
  try {
    const todo = await todoRepo.findOne({
      where: { id: req.params.id, isDeleted: false }
    });

    if (!todo) {
      return useErrorResponse(res, message.notFound, statusCode.notFound);
    }

    todo.isDeleted = true;
    await todoRepo.save(todo);

    return useSuccessResponse(res, message.deleteSuccess, statusCode.success);

  } catch (error: any) {
    return useInterServerErrorResponse(res, error.message);
  }
};

export const unDeleteTodo = async (req: any, res: Response) => {
  try {
    const todo = await todoRepo.findOne({
      where: { id: req.params.id, isDeleted: true }
    });

    if (!todo) {
      return useErrorResponse(res, message.notFound, statusCode.notFound);
    }

    todo.isDeleted = false;
    await todoRepo.save(todo);

    return useSuccessResponse(res, message.unDeletedSuccess, todo, statusCode.success);

  } catch (error: any) {
    return useInterServerErrorResponse(res, error.message);
  }
};
