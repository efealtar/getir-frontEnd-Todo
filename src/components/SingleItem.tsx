import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
	updateTodo,
	removeTodo,
	setTodoStatus,
} from "../redux/feature/todoSlice";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { Todo } from "../redux/types/types";

const SingleItem = ({ todo }: { todo: Todo }) => {
	const dispatch = useDispatch<AppDispatch>();

	const [updateText, setUpdateText] = React.useState("");

	const [open, setOpen] = React.useState(false);

	//Makin Update Dialog Responsive
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpdate = (id: string) => {
		dispatch(updateTodo({ id, todoText: updateText }));
		setOpen(false);
	};

	return (
		<ListItem>
			<Checkbox
				edge='start'
				value={todo.completed}
				onChange={() => {
					dispatch(setTodoStatus({ completed: !todo.completed, id: todo.id }));
				}}
			/>
			<ListItemText
				style={{
					wordWrap: "break-word",
					opacity: todo.completed ? "0.33" : "1",
					textDecoration: todo.completed ? "line-through" : "none",
				}}
			>
				{todo.todoText}
			</ListItemText>
			<>
				<IconButton onClick={handleClickOpen} disabled={todo.completed}>
					<CreateIcon
						sx={{
							color: !todo.completed ? "#f1cb0d" : "",
						}}
					/>
				</IconButton>
				<Dialog
					open={open}
					onClose={handleClose}
					fullScreen={fullScreen}
					fullWidth
					maxWidth='md'
				>
					<DialogTitle>Please Enter New Todo</DialogTitle>
					<DialogContent>
						<DialogContentText>
							You are updating:{todo.todoText}
						</DialogContentText>
						<TextField
							id='name'
							label='New Todo'
							fullWidth
							variant='standard'
							onChange={(e) => setUpdateText(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={() => handleUpdate(todo.id)}>Update</Button>
					</DialogActions>
				</Dialog>
			</>
			<ListItemSecondaryAction>
				<IconButton
					disabled={!todo.completed}
					onClick={() => {
						dispatch(removeTodo(todo.id));
					}}
				>
					<DeleteIcon
						sx={{
							color: todo.completed ? "#5c3cbb" : "",
						}}
					/>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default SingleItem;
