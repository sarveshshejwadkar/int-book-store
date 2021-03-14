import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/client'

function AdminSidebar() {
    return (
        <div>
            <button onClick={() => signOut()}>Log Out</button>
            <ul>
                <li>Suppliers
                    <ul>
                        <li>
                            <Link href="/admin/suppliers/add">
                                <a>Add</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/suppliers">
                                <a>List</a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>Books
                    <ul>
                        <li>
                            <Link href="/admin/books/add">
                                <a>Add</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/books">
                                <a>List</a>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
export default AdminSidebar