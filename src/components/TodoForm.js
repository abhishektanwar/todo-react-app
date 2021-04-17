import { useState,useEffect,useRef } from 'react'
import firebase, { firestore,auth } from '../firebase'

const TodoForm = (props) => {
	console.log('props',props)
	const [input,setInput] = useState(props.edit ? props.edit.value : '')
	const inputRef = useRef(null)
	const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`)
	// const [todoss] = useCollectionData(todosRef, { idField: "id" });
	useEffect(() => {
		inputRef.current.focus()
	})
	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log(input)
		
		// props.onSubmit({
		// 	id:Math.floor(Math.random()*1000),
		// 	text:input
		// })
		todosRef.add({
			text:input,
			completed:false,
			// createdAt : firebase.firestore.FieldValue.serverTimestamp(),
		})
		// console.log(todoss)
		setInput('')
	}
	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			{props.edit ? (
				<>
					<input
						type="text"
						required
						value={input}
						placeholder="Update task"
						className="todo-input edit"
						onChange={handleChange}
						ref={inputRef}
					></input>
					<button className="todo-button edit">Update Task</button>
				</>
			) : (
				<>
					<input
						type="text"
						required
						value={input}
						placeholder="Add task"
						className="todo-input"
						onChange={handleChange}
						ref={inputRef}
					></input>
					<button className="todo-button">Add Task</button>
				</>
			)
				
		}

			
		</form>
	)
}

export default TodoForm
