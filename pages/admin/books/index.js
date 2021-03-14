import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../../components/admin/AdminSidebar'
import Link from 'next/link'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function ListSuppliers() {

    const [ suppliers, setSuppliers ] = useState([])

    const getSuppliers = async () => {
        const response = await fetch('http://localhost:3000/api/adminSuppliers')
        const data = await response.json()
        setSuppliers(data)
    }

    const deleteSupplier = async (supplier_id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    try {
                        fetch(`http://localhost:3000/api/supplier/${supplier_id}`, {
                                method: 'DELETE'
                            }).then( response => {
                            if (response.ok) {
                                getSuppliers()
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
                                    <a onClick={() => deleteSupplier(supplier._id)}>Delete</a>
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