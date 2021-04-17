import React,{ useRef, useState } from 'react'
import { Link,useHistory } from "react-router-dom"
import {useAuth} from "../context/AuthContext"
function Login() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const { login } = useAuth()
	const history = useHistory()
	async function handleSubmit(e) {
		e.preventDefault()
		console.log("login click")
		try{
			setError('')
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			// await console.log(login(emailRef.current.value, passwordRef.current.value))
			history.push('/')
		}
		catch{
			setError('Failed to log in')
		}
		setLoading(false)
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Email</label>
				<input style={{display:"block"}}
					type="email"
					required
					ref ={emailRef}
				></input>
				<label>Password</label>
				<input
					type="password"
					required
					ref ={passwordRef}
				></input>
				<button type="submit">Sign In</button>
			</form>
			<div>
				Already have an account? <Link to="/signup">Sign Up</Link>
			</div>
			
		</>
	)
}

export default Login
