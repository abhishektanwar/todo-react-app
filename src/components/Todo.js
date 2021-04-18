import React,{ useState } from 'react'
import TodoForm from './TodoForm'
import ToDoList from './ToDoList'
import firebase, { auth, firestore } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
	// const {currentUser, logout} = useAuth()
	const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`)
	const [todoss] = useCollectionData(todosRef, { idField: "id" });
	const [edit,setEdit] = useState({
		id:null,
		value:''
	})

	const submitUpdate = value => {
		console.log("insubmit update todo.js")
		updateTodo(edit.id,value)
		setEdit({
			id:null,
			value:''
		})
	}

	if(edit.id){
		console.log("if edit.id")
		return <TodoForm edit={edit} onSubmit={submitUpdate} />
	}
	// orignal
	// return (
	// 	<>
	// 		{todos && todos.map((todo,index)=>(
	// 	<div className={todo.isComplete ? "todo-row complete":"todo-row"} key={index}>
	// 		<div key={todo.id} onClick = {() => {completeTodo(todo.id)}}>{todo.text}</div>
	// 	<div className="icons">
	// 		<RiCloseCircleLine onClick={() => {removeTodo(todo.id)}} className='delete-icon'/>
	// 		<TiEdit className="edit-icon" onClick={() => {setEdit({id:todo.id, value:todo.text})}} />
	// 	</div>
		
	// 	</div>
	// ))}
	// 	</>
	// )
		
	
	return <>{todoss && todoss.map((todo) => <TODO key={todo.id} {...todo}/>)}</>
	
	

}
	// return ({todos && todos.map((todo)=>)})
	const TODO = ({id,completed,text}) => {
		
		const [edit,setEdit] = useState({
			id:null,
			value:''
		})
		const [isUpdating,setIsUpdating] = useState(false)
		const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`)
		const onCompleteTodo = (id, completed) =>
		todosRef.doc(id).set({ completed: !completed }, { merge: true });

		const onDeleteTodo = (id) => todosRef.doc(id).delete();
		
		// console.log(todosRef)
		const submitUpdate = value => {
			// updateTodo(edit.id,value)
			setEdit({
				id:null,
				value:''
			})
			console.log("here")
			console.log("edit",edit)
			console.log(value);
			setIsUpdating(false)
		}
		const onEditTodo = (id) => {
			// let newstr = prompt('edit');
			// if (String(newstr) !== ""){
			//   todosRef.doc(id).update({
			// 	text: newstr
			//   });
			// }
			setIsUpdating(true)
		}
		
		
		if(edit.id){
			return <TodoForm edit={edit} onSubmit={submitUpdate} />
		}
		console.log("heajf")
		return (
				// <div>Hello World</div>

				<div className={completed ? "todo-row complete":"todo-row"} key={id}>
					<div key={id} onClick = {() => {onCompleteTodo(id,completed)}} >{text}</div>
				<div className="icons">
					<RiCloseCircleLine onClick={() => {onDeleteTodo(id)}} className='delete-icon'/>
					<TiEdit className="edit-icon" onClick={() => {setEdit({id:id,value:text})}}/>
					{/* <TiEdit className="edit-icon" onClick={() => onEditTodo(id)}/> */}
				</div>
		
				</div>


		);
	}


export default Todo
