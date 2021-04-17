import './App.css';
import SignUp from './components/SignUp';
import ToDoList from './components/ToDoList';
import LogIn from "./components/LogIn"
import PrivateRoute from "./components/PrivateRoutes"
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
function App() {
	return (
		<Router>
			<AuthProvider>
				<div className="todo-app">
					<Switch>
						<PrivateRoute exact path="/" component={ToDoList} />
						{/* <Route path="/todo" component={ToDoList} /> */}
						<Route path="/signup" component={SignUp} />
						<Route path="/login" component={LogIn} />
					</Switch>
				</div>
			</AuthProvider>
		</Router>
		
	);
}

export default App;
