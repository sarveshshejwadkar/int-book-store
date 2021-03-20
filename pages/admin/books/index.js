import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../../components/admin/AdminSidebar'
import Link from 'next/link'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

export default function ListBooks() {

    const [ books, setBooks ] = useState([])
    const router = useRouter()
    const [ session, loading ] = useSession()

    useEffect(() => {
        if (!loading && !session) {
          router.push('/admin')
        }
    })

    const getBooks = async () => {
        const response = await fetch('http://localhost:3000/api/adminBooks')
        const data = await response.json()
        setBooks(data)
    }

    const deleteBook = async (bookId) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    try {
                        fetch(`http://localhost:3000/api/book/${bookId}`, {
                                method: 'DELETE'
                            }).then( response => {
                            if (response.ok) {
                                getBooks()
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
        });
    }

    useEffect(() => {
        getBooks()
    }, [setBooks])

    return (
        <div className="grid grid-cols-5">
            <AdminSideBar />
            <div className="grid col-span-4 bg-gray-300">
                <div className="rounded m-10 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {
                            books.map((book) =>
                                <tr key={book._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{book.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href={`/admin/books/${book._id}`}>
                                            <a className="text-red-500">Edit</a>
                                        </Link>&nbsp;
                                        <a onClick={() => deleteBook(book._id)} className="text-blue-500 cursor-pointer">Delete</a>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}