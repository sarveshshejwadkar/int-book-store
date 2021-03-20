import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import AdminSideBar from '../../../components/admin/AdminSidebar'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

export default function Edit() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [supplier, setSupplier] = useState('');
    const router = useRouter()
    const [ session, loading ] = useSession()
    const { id } = router.query

    useEffect(() => {
        if (!loading && !session) {
          router.push('/admin')
        }
    })

    const getBook = async (bookId) => {
        const response = await fetch(`http://localhost:3000/api/book/${bookId}`)
        const data = await response.json()
        setTitle(data.title)
        setDescription(data.description)
        setPrice(data.price)
        setSupplier(data.supplier)
    }

    useEffect(() => {
        if (id) {
            getBook(id)
        }
    }, [id])

    const onSubmit = () => {
        try {
            fetch(`http://localhost:3000/api/book/${id}`, {
                method: 'PUT',
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
                    router.push('/admin/books')
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
                                defaultValue={title} 
                                ref={register({ required: true })} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="rounded w-full px-3 py-2 border" />
                            {errors.title && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <label htmlFor="description" className="block py-2">Description</label>
                            <textarea 
                                name="description" 
                                defaultValue={description} 
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
                                defaultValue={price} 
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
                                defaultValue={supplier} 
                                ref={register({ required: true })} 
                                onChange={(e) => setSupplier(e.target.value)} 
                                className="rounded w-full px-3 py-2 border" />
                            {errors.supplier && <span className="mt-2 text-sm text-red-500">This field is required</span>}
                        </div>

                        <div className="p-4 bg-white">
                            <button type="submit" className="w-full py-3 px-4 rounded text-white bg-indigo-600 hover:bg-indigo-700">Update</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}