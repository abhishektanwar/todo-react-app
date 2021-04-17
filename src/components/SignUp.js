import React,{useRef,useState} from 'react'
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"
import { useHistory } from "react-router-dom"
function SignUp() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()
	const [error,setError] = useState('')
	const [loading,setLoading] = useState(false)
	const {signup} = useAuth()
	const history = useHistory()
	async function handleSignUpSubmit(e){
		e.preventDefault()

		if(passwordRef.current.value !== confirmPasswordRef.current.value){
			return setError("Passwords do no match")
		}

		try{
			setError('')
			setLoading(true)
			await signup(emailRef.current.value,passwordRef.current.value)
			console.log(auth.currentUser.uid)
			history.push('/todo')
		}
		catch{
			setError('Failed to create an account')
		}
		setLoading(false)
	}
	return (
		<>
			<h2>Sign Up</h2>
			{error && <alert>{error}</alert>}
			<form onSubmit={handleSignUpSubmit}>
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
				<label>Confirm Password</label>
				<input
					type="password"
					required
					ref ={confirmPasswordRef}
				></input>
				<button type="submit">Sign Up</button>
			</form>
			<div className="w-100 text-center mt-2">
				Already have an account? Log In
			</div>
		</>
	)
}

export default SignUp
