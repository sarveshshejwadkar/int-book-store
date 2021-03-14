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
        <div>
            <AdminSideBar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="supplierName" defaultValue={supplierName} ref={register({ required: true })} onChange={(e) => setSupplierName(e.target.value)} />
                {errors.supplierName && <span>This field is required</span>}
                <input name="phoneNumber" defaultValue={phoneNumber} ref={register({ required: true })} onChange={(e) => setPhoneNumber(e.target.value)} />
                {errors.phoneNumber && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </div>
    );
}