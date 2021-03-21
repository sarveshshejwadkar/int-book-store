import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/client'

function AdminSidebar() {
    return (
        <div className="bg-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="w-64 h-screen bg-gray-800 mt-8 sm:mt-0">
                    <div className="flex items-center justify-center">
                        <button onClick={() => signOut()} className="m-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Log Out</button>
                    </div>

                    <nav>
                        <Link href="/admin/suppliers">
                            <a className="mt-5 flex items-center py-2 px-8 bg-gray-700 text-gray-100 border-r-4 border-gray-100" >
                                <span className="mx-4 font-medium">Suppliers</span>
                            </a>
                        </Link>
                        <Link href="/admin/books">
                            <a className="mt-5 flex items-center py-2 px-8 bg-gray-700 text-gray-100 border-r-4 border-gray-100" >
                                <span className="mx-4 font-medium">Books</span>
                            </a>
                        </Link>
                        <Link href="/admin/orders">
                            <a className="mt-5 flex items-center py-2 px-8 bg-gray-700 text-gray-100 border-r-4 border-gray-100" >
                                <span className="mx-4 font-medium">Orders</span>
                            </a>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default AdminSidebar