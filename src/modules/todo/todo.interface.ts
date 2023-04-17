export interface AddTodoDTO {
  title: string;
  description: string;
  userId: number;
}

export interface GetTodoDTO {
  todoId: number;
  userId: number;
}

export interface UpdateTodoDTO extends GetTodoDTO {
  title: string;
  description: string;
}

export interface GetTodosDTO {
  page: number;
  limit: number;
  userId: number;
}

export interface DeleteTodoDTO extends GetTodoDTO {}

export interface GetTodoResponseDTO {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}