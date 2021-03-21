import React, { useEffect, useState } from "react"
import AdminSidebar from '../../components/admin/AdminSidebar'

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/orders`)
    const ordersResult = await res.json()
    return {
        props: {
            ordersResult
        }
    }
}

export default function Orders({ordersResult}) {

    const [orders, setOrders] = useState([])
    let cnt = 1

    useEffect(() => {
        setOrders(ordersResult.data)
    }, [])

    return (
        <div className="grid grid-cols-5">
            <AdminSidebar />
            <div className="grid col-span-4 bg-gray-300">
                <div className="rounded m-10 overflow-hidden">
                    {
                        orders.length > 0 ? 
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    { orders.map((item) =>                        
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{cnt++}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.customer_details.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${item.amount_total/100}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        : <p>No Orders Found</p>
                    }
                </div>
            </div>
        </div>
    )
}