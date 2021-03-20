import React, { useEffect, useState } from 'react'
import { applySession } from 'next-session'

export async function getServerSideProps({ req, res }) {
    await applySession(req, res, {});
    return {
        props: {
            sessionId: req.session.id
        }
    }
}
export default function Home({sessionId}) {
    const [ books, setBooks ] = useState([])

    const getBooks = async () => {
        const response = await fetch('http://localhost:3000/api/adminBooks')
        const data = await response.json()
        setBooks(data)
    }

    const addToCart = async (bookId) => {
        try {
            const result = fetch('http://localhost:3000/api/addToCart', {
                method: 'POST',
                body: JSON.stringify({
                    sessionId: sessionId,
                    bookId: bookId
                }),
                headers: {
                    accept: '*/*',
                    'Content-Type': 'application/json'
                }
            }).then( response => {
                return response;
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBooks()
    }, [setBooks])
    
    return (
        <div className="p-8 h-screen">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {
                books.map((book) =>
                    <div key={book._id} className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div
                            className="flex items-end justify-end h-56 w-full bg-cover"
                        >
                            <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500" onClick={() => addToCart(book._id)}>
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            </button>
                        </div>
                        <div className="px-5 py-3">
                            <h3 className="text-gray-700 uppercase">{book.title}</h3>
                            <span className="text-gray-500 mt-2">${book.price}</span>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}
