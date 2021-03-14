import React, {useState} from "react";
import { useForm } from "react-hook-form";
import AdminSideBar from '../../../components/admin/AdminSidebar'
import { useRouter } from 'next/router'

export default function Add() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [supplierName, setSupplierName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter()

    const onSubmit = () => {
        try {
            fetch('http://localhost:3000/api/adminSuppliers', {
                method: 'POST',
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
                <input name="supplierName" ref={register({ required: true })} onChange={(e) => setSupplierName(e.target.value)} />
                {errors.supplierName && <span>This field is required</span>}
                <input name="phoneNumber" ref={register({ required: true })} onChange={(e) => setPhoneNumber(e.target.value)} />
                {errors.phoneNumber && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </div>
    );
}