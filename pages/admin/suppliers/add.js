import React, {useState} from "react";
import { useForm } from "react-hook-form";
import AdminSideBar from '../../../components/admin/AdminSidebar'

export default function Add() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [supplierName, setSupplierName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const onSubmit = data => {
        console.log(data);
        try {
            const supplier = fetch('http://localhost:3000/api/adminSuppliers', {
                method: 'POST',
                body: JSON.stringify({ 
                    supplierName: supplierName,
                    phoneNumber: phoneNumber
                }) ,
                headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
                }
            })
            if (supplier.ok) {
                const supplierDetails = supplier.json()
                console.log(supplierDetails[0])
            }
        } catch (error) {
            console.log(error);
        }
    }    

    console.log(watch("name")); // watch input value by passing the name of it

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