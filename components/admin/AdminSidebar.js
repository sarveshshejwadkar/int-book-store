import React from 'react'
import Link from 'next/link'

function AdminSidebar() {
    return (
        <div>
            <button onClick={() => signOut()}>Log Out</button>
            <ul>
                <li>suppliers
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
                <li>customers
                    <ul>
                        <li>
                            <Link href="/admin/customers/add">
                                <a>Add</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/customers">
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