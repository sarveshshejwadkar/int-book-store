import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../../components/admin/AdminSidebar'
import Link from 'next/link'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

export default function ListSuppliers() {

    const [ suppliers, setSuppliers ] = useState([])
    const router = useRouter()
    const [ session ] = useSession()

    useEffect(() => {
        if (!session) {
          router.push('/admin')
        }
    }, [router, session])

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
        <div className="grid grid-cols-5">
            <AdminSideBar />
            <div className="grid col-span-4 bg-gray-300">
                <div class="rounded m-10 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {
                            suppliers.map((supplier) =>
                                <tr key={supplier._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{supplier.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{supplier.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href={`/admin/suppliers/${supplier._id}`}>
                                            <a className="text-red-500">Edit</a>
                                        </Link>&nbsp;
                                        <a onClick={() => deleteSupplier(supplier._id)} className="text-blue-500 cursor-pointer">Delete</a>
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