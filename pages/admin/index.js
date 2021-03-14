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
        <div className="container">
            <Head>
                <title>Book Store</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    {!session && <>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="py-5">
                                    <label htmlFor="username" >Username</label>
                                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} ref={register({ required: true })} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                                    {errors.username && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="password" >Password</label>
                                    <input type="password" autoComplete="off" name="password" value={password} onChange={(e) => setPassword(e.target.value)} ref={register({ required: true })} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                                    {errors.password && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
