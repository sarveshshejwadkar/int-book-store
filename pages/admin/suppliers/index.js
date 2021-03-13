import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../../components/admin/AdminSidebar'
import Link from 'next/link'

export default function ListSuppliers() {

    const [ suppliers, setSuppliers ] = useState([])

    const getSuppliers = async () => {
        const response = await fetch('http://localhost:3000/api/adminSuppliers')
        const data = await response.json()
        setSuppliers(data)
        console.log(suppliers)
    }

    function deleteSupplier() {
        console.log('Delete')
    }

    useEffect(() => {
        getSuppliers()
    }, [setSuppliers])

    return (
        <div>
            <AdminSideBar />
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        suppliers.map((supplier) =>
                            <tr key={supplier._id}>
                                <td>{supplier.name}</td>
                                <td>{supplier.phone}</td>
                                <td>
                                    <Link href={`/admin/suppliers/${supplier._id}`}>
                                        <a>Edit</a>
                                    </Link>&nbsp;
                                    <a onClick={deleteSupplier()}>Delete</a>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>

    )

}