import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import uuid from 'uuid';
import { Todo } from './type';

const initTodos: Todo[] = [
	{
		id: uuid(),
		desc: 'Learn React',
		isComplete: true,
	},
	{
		id: uuid(),
		desc: 'Learn Redux',
		isComplete: true,
	},
	{
		id: uuid(),
		desc: 'Learn Redux-ToolKit',
		isComplete: false,
	},
];

const todosSlice = createSlice({
	name: 'todos',
	initialState: initTodos,
	reducers: {
		create: {
			reducer: (state, { payload }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>) => {
				state.push(payload);
			},
			prepare: ({ desc }: { desc: string }) => ({
				payload: {
					id: uuid(),
					desc,
					isComplete: false,
				},
			}),
		},
		edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
			const todoToEdit = state.find((todo) => todo.id === payload.id);
			if (todoToEdit) todoToEdit.desc = payload.desc;
		},
		toggle: (state, { payload }: PayloadAction<{ id: string; isComplete: boolean }>) => {
			const todoToEdit = state.find((todo) => todo.id === payload.id);
			if (todoToEdit) todoToEdit.isComplete = payload.isComplete;
		},
		remove: (state, { payload }: PayloadAction<{ id: string }>) => {
			state = state.filter((todo) => todo.id !== payload.id);
		},
	},
});

const selectedSlice = createSlice({
	name: 'selectedTodo',
	initialState: null as string | null,
	reducers: {
		select: (state, { payload }: PayloadAction<{ id: string }>) => payload.id,
	},
});

const counterSlice = createSlice({
	name: 'counter',
	initialState: 0,
	reducers: {},
	extraReducers: {
		[todosSlice.actions.create.type]: (state) => state + 1,
		[todosSlice.actions.edit.type]: (state) => state + 1,
		[todosSlice.actions.toggle.type]: (state) => state + 1,
		[todosSlice.actions.remove.type]: (state) => state + 1,
	},
});

const rootReducer = {
	todos: todosSlice.reducer,
	selectedTodo: selectedSlice.reducer,
	counter: counterSlice.reducer,
};

export default configureStore({
	reducer: rootReducer,
});
