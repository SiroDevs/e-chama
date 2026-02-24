// import { Dispatch } from "@reduxjs/toolkit";
// import {
//   addTodo as addDispatchTodo,
//   removeTodo,
//   setError,
// } from "../../state/todoSlice";
// import { createTodo } from "../../../domain/entities/Todo";
// import { v4 as uuidv4 } from "uuid";
// import { addTodoAction } from "@/app/actions/todoActions";

// export const addTodo = (userId: string, title: string) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       // Create a temporary ID for optimistic rendering
//       const tempId = uuidv4();

//       // Create a new todo domain object with temporary ID
//       const optimisticTodo = {
//         ...createTodo(userId, title),
//         id: tempId,
//       };

//       // Optimistically add the todo to the UI immediately
//       dispatch(addDispatchTodo(optimisticTodo));

//       // Call the add todo action
//       const todo = await addTodoAction(optimisticTodo);

//       // If the server returned a different ID, update the todo with the server's ID
//       if (tempId !== todo.id) {
//         dispatch(removeTodo(tempId));
//         dispatch(addDispatchTodo(todo));
//       }
//       return todo;
//     } catch (error: unknown) {
//       dispatch(
//         setError(error instanceof Error ? error.message : "Failed to add todo")
//       );
//       throw error;
//     }
//   };
// };
