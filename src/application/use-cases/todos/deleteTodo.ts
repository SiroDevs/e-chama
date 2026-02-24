// import { Dispatch } from "@reduxjs/toolkit";
// import {
//   deleteTodo as deleteTodoDispatch,
//   setError,
//   // Add this for potential rollback
//   addTodo as addTodoDispatch,
// } from "../../state/todoSlice";
// import { deleteTodoAction } from "@/app/actions/todoActions";
// import { Todo } from "@/domain/entities/Todo";

// export const deleteTodo = (id: string, todo?: Todo) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       // Optimistically delete the todo from the UI immediately
//       dispatch(deleteTodoDispatch(id));

//       // Delete from the server in the background
//       const isDeleted = await deleteTodoAction(id);

//       if (!isDeleted) {
//         throw new Error("Failed to delete todo");
//       }

//       return true;
//     } catch (error: unknown) {
//       // Show error message
//       dispatch(
//         setError(
//           error instanceof Error ? error.message : "Failed to delete todo"
//         )
//       );

//       // Optional: Restore the todo if we have it and the deletion failed
//       // This provides a better user experience
//       if (todo) {
//         dispatch(addTodoDispatch(todo));
//       }

//       throw error;
//     }
//   };
// };
