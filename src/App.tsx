import Container from "@mui/material/Container";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeadTitle from "./components/HeadTitle";
import ListItems from "./components/ListItems";

function App() {
	return (
		<>
			<Container maxWidth='md'>
				<HeadTitle />
				<ListItems />
			</Container>
			<ToastContainer
				position='bottom-right'
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default App;
