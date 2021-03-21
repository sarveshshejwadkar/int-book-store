import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/client'

function AdminSidebar() {
    return (
        <div className="bg-black text-white min-h-screen">
            <button onClick={() => signOut()} className="m-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Log Out</button>
            <ul className="mx-5 my-2">
                <li>Suppliers
                    <ul className="ml-5">
                        <li className="m-2">
                            <Link href="/admin/suppliers/add">
                                <a>Add</a>
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link href="/admin/suppliers">
                                <a>List</a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="my-5">Books
                    <ul className="ml-5">
                        <li className="m-2">
                            <Link href="/admin/books/add">
                                <a>Add</a>
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link href="/admin/books">
                                <a>List</a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="my-5"><Link href='/admin/orders'>Orders</Link></li>
            </ul>
        </div>
    )
}
export default AdminSidebar