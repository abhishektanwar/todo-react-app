import { useState,useEffect,useRef } from 'react'

const TodoForm = (props) => {
	console.log('props',props)
	const [input,setInput] = useState(props.edit ? props.edit.value : '')
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
