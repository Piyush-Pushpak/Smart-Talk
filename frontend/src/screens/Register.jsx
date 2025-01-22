import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { UserContext } from '../context/user.context'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    function submitHandler(e) {
        e.preventDefault()
        axios.post('/users/register', {
            email,
            password
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            navigate('/')
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <p>already have an account ?</p>
                        </div>
                        <div className="text-sm">
                            <Link
                                to="/login"
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                            >
                                Login to your account
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register