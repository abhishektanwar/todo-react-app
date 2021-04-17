import { useState,useEffect,useRef } from 'react'

const TodoForm = (props) => {
	const [input,setInput] = useState("")
	const inputRef = useRef(null)
	useEffect(() => {
		inputRef.current.focus()
	})
	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(input)
		
		props.onSubmit({
			id:Math.floor(Math.random()*1000),
			text:input
		})
		setInput('')
	}
	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<input
				type="text"
				required
				value={input}
				placeholder="Add a new task"
				className="todo-input"
				onChange={handleChange}
				ref={inputRef}
			></input>
			<button className="todo-button">Add Task</button>
		</form>
	)
}

export default TodoForm
