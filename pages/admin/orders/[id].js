import React, { useState, useEffect } from "react";
import AdminSideBar from '../../../components/admin/AdminSidebar'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

export default function Edit() {
    const router = useRouter()
    const [ session, loading ] = useSession()
    const { id } = router.query
    const [ lineItems, setLineItems ] = useState({})
    const [ orderDetails, setOrderDetails ] = useState('')

    useEffect(() => {
        if (!loading && !session) {
          router.push('/admin')
        }
    })

    const getOrder = async (orderId) => {
        const response = await fetch(`http://localhost:3000/api/order/${orderId}`)
        const orderDetailsResult = await response.json()
        setLineItems(orderDetailsResult.lineItems.data)
        setOrderDetails(orderDetailsResult.orderDetails)
    }

    useEffect(() => {
        if (id) {
            getOrder(id)
        }
    }, [id])

    return (
        <div className="grid grid-cols-5">
            <AdminSideBar />
            <div className="grid col-span-4 bg-gray-300">
                <div className="rounded m-10 overflow-hidden">
                    <div>
                        {orderDetails && 
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Total</td>
                                        <td className="px-6 py-4 whitespace-nowrap">${orderDetails.amount_total/100}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Customer</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{orderDetails.customer_details.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                        {
                            lineItems.length > 0 && 
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            lineItems.map((lineItem) => 
                                                <tr key={lineItem.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{lineItem.description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{lineItem.quantity}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">${lineItem.amount_subtotal/100}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}