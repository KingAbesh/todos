import { GeneralResponseDTO, PaginateResponseDTO } from "@constants/interfaces";
import models from "../../db/models";
import {
  AddTodoDTO,
  DeleteTodoDTO,
  GetTodoDTO,
  GetTodoResponseDTO,
  GetTodosDTO,
  UpdateTodoDTO,
} from "./todo.interface";
import { sanitizeObj } from "@helpers/sanitizeObj";
import { getPaginatedRecords } from "@helpers/paginate";

const { Todo } = models;

export const addTodo = async (
  data: AddTodoDTO
): Promise<GeneralResponseDTO<{ id: number } | null>> => {
  try {
    await checkExistingTodo(data.title);

    const createdTodo = await Todo.create(data);

    return {
      error: false,
      message: "Todo created successfully.",
      data: {
        id: createdTodo.id,
      },
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.message,
      data: null,
    };
  }
};

export const getTodo = async (
  data: GetTodoDTO
): Promise<GeneralResponseDTO<GetTodoResponseDTO | null>> => {
  try {
    const todo = await Todo.findOne({
      where: { id: data.todoId, userId: data.userId },
      attributes: ["id", "title", "description", "createdAt"],
      raw: true,
    });

    if (!todo) {
      throw new Error("Todo item with specified ID does not exist");
    }

    return {
      error: false,
      message: "Todo item fetched successfully",
      data: todo,
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.message,
      data: null,
    };
  }
};

export const updateTodo = async (
  data: UpdateTodoDTO
): Promise<GeneralResponseDTO<{ id: number } | null>> => {
  try {
    const todo = await checkTodoById(data.todoId, data.userId);

    if (data.title) {
      await checkExistingTodo(data.title);
    }

    await todo.update(sanitizeObj(data));

    return {
      error: false,
      message: "Todo item updated successfully",
      data: {
        id: todo.id,
      },
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.message,
      data: null,
    };
  }
};

export const deleteTodo = async (
  data: DeleteTodoDTO
): Promise<GeneralResponseDTO<null>> => {
  try {
    const todo = await checkTodoById(data.todoId, data.userId);

    await todo.destroy();

    return {
      error: false,
      message: "Todo item deleted successfully",
      data: null,
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.message,
      data: null,
    };
  }
};

export const getTodos = async (
  data: GetTodosDTO
): Promise<GeneralResponseDTO<PaginateResponseDTO | null>> => {
  try {
    const result: PaginateResponseDTO = await getPaginatedRecords(
      Todo,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: {
          userId: data.userId,
        },
      }
    );

    return {
      error: false,
      message: "Todo items fetched successfully",
      data: result,
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.message,
      data: null,
    };
  }
};

const checkExistingTodo = async (title: string): Promise<void> => {
  const isExistingTodo = await Todo.findOne({
    where: { title },
    raw: true,
  });

  if (isExistingTodo) {
    throw new Error("Todo with this title already exists");
  }
};

const checkTodoById = async (
  todoId: number,
  userId: number,
  error: boolean = true
) => {
  const todo = await Todo.findOne({
    where: { id: todoId, userId },
    attributes: ["id", "title", "description"],
  });

  if (!todo && error) {
    throw new Error("Todo item with specified ID does not exist");
  }

  return todo;
};
