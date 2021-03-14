import React, {useState} from "react";
import { useForm } from "react-hook-form";
import AdminSideBar from '../../../components/admin/AdminSidebar'
import { useRouter } from 'next/router'

export default function Add() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [supplier, setSupplier] = useState('');
    const router = useRouter()

    const onSubmit = () => {
        try {
            fetch('http://localhost:3000/api/adminBooks', {
                method: 'POST',
                body: JSON.stringify({ 
                    title: title,
                    description: description,
                    price: price,
                    supplier: supplier
                }) ,
                headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
                }
            }).then( response => {
                if (response.ok) {
                    // router.push('/admin/books')
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
                            <label htmlFor="title" className="block py-2">Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                ref={register({ required: true })} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="rounded w-full px-3 py-2 border" />
                            {errors.title && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <label htmlFor="description" className="block py-2">Description</label>
                            <textarea 
                                name="description" 
                                ref={register({ required: true })} 
                                onChange={(e) => setDescription(e.target.value)} 
                                className="rounded w-full px-3 py-2 border" ></textarea>
                            {errors.description && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <label htmlFor="price" className="block py-2">Price</label>
                            <input 
                                type="text" 
                                name="price" 
                                ref={register({ required: true })} 
                                onChange={(e) => setPrice(e.target.value)} 
                                className="rounded w-full px-3 py-2 border" />
                            {errors.price && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <label htmlFor="supplier" className="block py-2">Supplier</label>
                            <input 
                                type="text" 
                                name="supplier" 
                                ref={register({ required: true })} 
                                onChange={(e) => setSupplier(e.target.value)} 
                                className="rounded w-full px-3 py-2 border" />
                            {errors.supplier && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <button type="submit" className="w-full py-3 px-4 rounded text-white bg-indigo-600 hover:bg-indigo-700">Add</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}