// import { Dispatch } from "@reduxjs/toolkit";
// import {
//   updateTodo as updateTodoDispatch,
//   setError,
// } from "../../state/todoSlice";
// import { updateTodoAction } from "@/app/actions/todoActions";

// export const updateTodo = (
//   id: string,
//   data: { title?: string; completed?: boolean }
// ) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       // Create a partial todo with just the ID and updated fields
//       // Our updated todoSlice can now handle partial updates
//       const optimisticUpdate = {
//         id,
//         ...data,
//         updatedAt: new Date().toISOString(), // Update the timestamp locally
//       };

//       // Optimistically update the todo in the UI immediately
//       dispatch(updateTodoDispatch(optimisticUpdate));

//       // Update on the server in the background
//       const updatedTodo = await updateTodoAction(id, data);

//       if (!updatedTodo) {
//         throw new Error("Failed to update todo");
//       }

//       // Update with the server response (which might include additional changes)
//       dispatch(updateTodoDispatch(updatedTodo));

//       return updatedTodo;
//     } catch (error: unknown) {
//       // Show error message
//       dispatch(
//         setError(
//           error instanceof Error ? error.message : "Failed to update todo"
//         )
//       );

//       // We could add rollback logic here if needed

//       throw error;
//     }
//   };
// };
