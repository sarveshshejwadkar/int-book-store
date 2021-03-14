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
        <div className="grid grid-cols-5">
            <AdminSideBar />
            <div className="grid col-span-4 bg-gray-300">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="shadow overflow-hidden m-10 max-w-md">
                        <div className="p-4 bg-white">
                            <label htmlFor="supplierName" className="block py-2">Name</label>
                            <input
                                type="text" 
                                name="supplierName" 
                                defaultValue={supplierName} 
                                ref={register({ required: true })} 
                                onChange={(e) => setSupplierName(e.target.value)} 
                                className="w-full rounded block px-3 py-2 border" />
                            {errors.supplierName && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <label for="phoneNumber" className="block py-2">Phone</label>
                            <input
                                type="text"
                                name="phoneNumber" 
                                defaultValue={phoneNumber} 
                                ref={register({ required: true })} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                className="rounded w-full px-3 py-2 border" />
                            {errors.phoneNumber && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <button type="submit" className="w-full py-3 px-4 rounded text-white bg-indigo-600 hover:bg-indigo-700" >
                                Update</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}