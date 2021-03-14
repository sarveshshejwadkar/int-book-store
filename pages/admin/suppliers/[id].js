import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import AdminSideBar from '../../../components/admin/AdminSidebar'
import { useRouter } from 'next/router'

export default function Edit() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [supplierName, setSupplierName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const router = useRouter()
    const { id } = router.query

    const getSupplier = async (supplierId) => {
        const response = await fetch(`http://localhost:3000/api/supplier/${supplierId}`)
        const data = await response.json()
        setSupplierName(data.name)
        setPhoneNumber(data.phone)
    }

    useEffect(() => {
        if (id) {
            getSupplier(id)
        }
    }, [id])

    const onSubmit = data => {
        try {
            fetch(`http://localhost:3000/api/supplier/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ 
                    supplierName: supplierName,
                    phoneNumber: phoneNumber
                }) ,
                headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
                }
            }).then( response => {
                if (response.ok) {
                    router.push('/admin/suppliers')
                }
            })
        } catch (error) {
            console.log(error);
        }
    }    

    return (
        <div className="container grid grid-cols-5">
            <AdminSideBar />
            <div className="grid col-span-4 m-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="shadow overflow-hidden sm:rounded-md max-w-md">
                        <div className="p-4 bg-white">
                            <label for="first_name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input name="supplierName" defaultValue={supplierName} ref={register({ required: true })} onChange={(e) => setSupplierName(e.target.value)} className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                            {errors.supplierName && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <label for="first_name" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input name="phoneNumber" defaultValue={phoneNumber} ref={register({ required: true })} onChange={(e) => setPhoneNumber(e.target.value)} className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                            {errors.phoneNumber && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}