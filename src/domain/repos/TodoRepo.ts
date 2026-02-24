import { Todo } from "../entities/Todo";

// Abstract repository interface for Todo operations
export interface TodoRepo {
  // Create a new todo
  addTodo(todo: Omit<Todo, "id">): Promise<Todo>;

  // Get all todos for a specific user
  getTodos(userId: string): Promise<Todo[]>;

  // Get a specific todo by ID
  getTodoById(id: string): Promise<Todo | null>;

  // Update a todo
  updateTodo(id: string, data: Partial<Todo>): Promise<Todo>;

  // Delete a todo
  deleteTodo(id: string): Promise<boolean>;

  // Toggle todo completion status
  toggleTodoStatus(id: string, completed: boolean): Promise<Todo>;
}
