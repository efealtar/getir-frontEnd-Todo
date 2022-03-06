import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const initialState = [
	{ id: "1", todoText: "this will go for Getir", completed: false },
] as Todo[];

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: {
			reducer: (state, action: PayloadAction<Todo>) => {
				if (
					Object.keys(action.payload.todoText).length === 0 ||
					(Object.keys(action.payload.todoText).length > 0 &&
						action.payload.todoText.replace(/\s/g, "").length === 0)
				) {
					toast.error("Cannot be empty!");
				} else if (Object.keys(action.payload.todoText).length > 270) {
					toast.error("Too long to be Todo!");
				} else {
					state.push(action.payload);
					toast.success("Added new Todo!");
				}
			},
			prepare: (todoText: string) => ({
				payload: {
					id: uuidv4(),
					todoText,
					completed: false,
				} as Todo,
			}),
		},
		removeTodo(state, action: PayloadAction<string>) {
			const index = state.findIndex((todo) => todo.id === action.payload);
			state.splice(index, 1);
			toast.warning("Removed Todo!");
		},
		updateTodo(state, action: PayloadAction<{ id: string; todoText: string }>) {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			if (
				Object.keys(action.payload.todoText).length === 0 ||
				(Object.keys(action.payload.todoText).length > 0 &&
					action.payload.todoText.replace(/\s/g, "").length === 0)
			) {
				toast.error("Cannot be empty!");
			} else if (Object.keys(action.payload.todoText).length > 270) {
				toast.error("Cannot be empty!");
			} else {
				state[index].todoText = action.payload.todoText;
				toast.success("Changed Todo!");
			}
		},
		setTodoStatus(
			state,
			action: PayloadAction<{ completed: boolean; id: string }>
		) {
			const index = state.findIndex((todo) => todo.id === action.payload.id);

			state[index].completed = action.payload.completed;
			toast.info("Updated Todo!");
		},
	},
});

export const { addTodo, removeTodo, updateTodo, setTodoStatus } =
	todoSlice.actions;
export default todoSlice.reducer;
