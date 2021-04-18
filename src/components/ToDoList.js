import React,{ useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { useAuth } from "../context/AuthContext"
import { useHistory } from "react-router-dom"
import firebase, { firestore,auth } from '../firebase'

const ToDoList = () => {
	const [todos,setTodos] = useState([])
	const [error,setError] = useState('')
	const { logout } = useAuth()
	const history = useHistory()
	const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`)
	const addTodo = (todo) => {
		if(!todo.text || /^\s*$/.test(todo.text)){
			return
		}

		// const newTodos = [todo, ...todos]
		// setTodos(newTodos)
		// console.log(...todos)
		todosRef.add({
			text:todo.text,
			completed:todo.completed,
			// createdAt : firebase.firestore.FieldValue.serverTimestamp(),
		})
	}

	const removeTodo = (id) => {
		const removeArr = [...todos].filter(todo => todo.id !== id)
		setTodos(removeArr)
	}

	const updateTodo = (id,newValue) => {
		if(!newValue.text || /^\s*$/.test(newValue.text)){
			return
		}

		// setTodos(prev => prev.map(item => (item.id === id ? newValue : item)))
		console.log("here in todo function")
		console.log(id,newValue)
		// todosRef.doc(id).update({
		// 	text: newValue
		// });
	}

	const completeTodo = id => {
		let updatedTodos = todos.map(todo =>{
			if(todo.id === id){
				todo.isComplete = !todo.isComplete
			}
			return todo
		})
		setTodos(updatedTodos)
	}

	async function handleLogout(){
		setError('')
		try{
			await logout()
			history.push('/login')
		}
		catch{
			setError("failed to logout")
		}

	}

	return (
		<div>
			<h1>What's the plan for today?</h1>
			<TodoForm onSubmit={addTodo}/>
			<Todo todos = {todos} completeTodo = {completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
			<button className="logout-button" onClick={handleLogout}>Logout</button>
		</div>
	)
}

export default ToDoList