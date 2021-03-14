import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import { useForm } from "react-hook-form";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter()
    const [ session, loading ] = useSession()
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        signIn('credentials', {
            username,
            password,
            callbackUrl: `${window.location.origin}/admin/dashboard`,
        })
    }

    useEffect(() => {
        if (router.query.error) {
            setMessage('Invalid Credentials') // Shown below the input field in my example
        }
        if (session) {
            router.push('/admin/dashboard')
        }
    }, [router, session])

    return (
        <div>
            <Head>
                <title>Book Store</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen flex items-center justify-center bg-gray-300">
                    {!session && <>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="py-5">
                                    <label htmlFor="username" className="block py-2">Username</label>
                                    <input 
                                        type="text" name="username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        ref={register({ required: true })} 
                                        className="rounded block px-3 py-2 border" />
                                    {errors.username && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block pb-2">Password</label>
                                    <input 
                                        type="password" 
                                        autoComplete="off" 
                                        name="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        ref={register({ required: true })} 
                                        className="rounded block px-3 py-2 border" />
                                    {errors.password && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                                </div>
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full py-3 px-4 rounded text-white bg-indigo-600 hover:bg-indigo-700">
                                    Sign in
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-red-500">{message}</p>
                        </form>
                    </>}
            </div>
        </div>
    )
}
