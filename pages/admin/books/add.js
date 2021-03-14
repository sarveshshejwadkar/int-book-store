import React, {useState} from "react";
import { useForm } from "react-hook-form";
import AdminSideBar from '../../../components/admin/AdminSidebar'
import { useRouter } from 'next/router'

export default function Add() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [bookTitle, setBookTitle] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookPrice, setBookPrice] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookIsbn, setBookIsbn] = useState('');
    const [bookSupplier, setBookSupplier] = useState('');

    const router = useRouter()

    const onSubmit = () => {
        try {
            fetch('http://localhost:3000/api/adminBooks', {
                method: 'POST',
                body: JSON.stringify({ 
                    title: bookTitle,
                    description: bookDescription,
                    price: bookPrice,
                    author: bookAuthor,
                    isbn: bookIsbn,
                    supplier: bookSupplier
                }),
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
        <div>
            <AdminSideBar />
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <label>Title</label>
                <input name="bookTitle" ref={register({ required: true })} onChange={(e) => setBookTitle(e.target.value)} />
                {errors.bookTitle && <span>This field is required</span>}

                <label>Description</label>
                <textarea name="bookDescription" ref={register({ required: true })} onChange={(e) => setBookDescription(e.target.value)} ></textarea>
                {errors.bookDescription && <span>This field is required</span>}
                
                <label>Price</label>
                <input name="bookPrice" ref={register({ required: true })} onChange={(e) => setBookPrice(e.target.value)} />
                {errors.bookPrice && <span>This field is required</span>}

                <label>Author</label>
                <input name="bookAuthor" ref={register({ required: true })} onChange={(e) => setBookAuthor(e.target.value)} />
                {errors.bookAuthor && <span>This field is required</span>}

                <label>Isbn</label>
                <input name="bookIsbn" ref={register({ required: true })} onChange={(e) => setBookIsbn(e.target.value)} />
                {errors.bookIsbn && <span>This field is required</span>}

                <label>Supplier</label>
                <input name="bookSupplier" ref={register({ required: true })} onChange={(e) => setBookSupplier(e.target.value)} />
                {errors.bookSupplier && <span>This field is required</span>}
                
                <input type="submit" />
            </form>
        </div>
    );
}