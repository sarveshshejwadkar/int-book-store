import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { applySession } from 'next-session'
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link'

export async function getServerSideProps({ req, res }) {
    await applySession(req, res, {});
    return {
        props: {
            sessionId: req.session.id
        }
    }
}

export default function Cart({sessionId}) {

    const [cartItems, setCartItems] = useState([])
    const stripePromise = loadStripe('pk_test_51IXK4EH69Suofnne3YgBwpz3gN27HzL9VBpbbvn0xVdfwcwSbNXgd48GslSSkJaeUYiCirU3fygCN6tYRqELDJKG005Y1UHjrp');

    const getCartItems = async () => {
        const response = await fetch(`http://localhost:3000/api/cart/${sessionId}`)
        const data = await response.json()
        setCartItems(data)
    }

    useEffect(() => {
        getCartItems()
    }, [setCartItems])

    function lineItemPrice(price, quantity) {
        return price * quantity
    }

    const checkOut = async (event) => {
        const stripe = await stripePromise;
        const response = await fetch('http://localhost:3000/api/stripeCheckoutSession', { method: 'POST' });
        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error.message)
        }
    }

    return(
        <div className="p-8 h-screen">
            <Navbar />
            <div className="flex justify-center my-6">
                <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
                    <div className="flex-1">
                        { cartItems.length > 0 ?
                            <div>
                                <table className="w-full text-sm lg:text-base" cellSpacing="0">
                                    <thead>
                                        <tr className="h-12 uppercase">
                                            <th className="hidden md:table-cell"></th>
                                            <th className="text-left">Product</th>
                                            <th className="lg:text-right text-left pl-5 lg:pl-0">
                                            <span className="lg:hidden" title="Quantity">Qtd</span>
                                            <span className="hidden lg:inline">Quantity</span>
                                            </th>
                                            <th className="hidden text-right md:table-cell">Unit price</th>
                                            <th className="text-right">Total price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        cartItems.map((item) =>
                                            <tr key={item._id}>
                                                <td className="hidden pb-4 md:table-cell">
                                                    <a href="#">
                                                        <img src="https://limg.app/i/Calm-Cormorant-Catholic-Pinball-Blaster-yM4oub.jpeg" className="w-20 rounded" alt="Thumbnail" />
                                                    </a>
                                                </td>
                                                <td>
                                                <a href="#">
                                                    <p className="mb-2 md:ml-4">{item.book.title}</p>
                                                    <form action="" method="POST">
                                                    <button type="submit" className="text-gray-700 md:ml-4">
                                                        <small>(Remove item)</small>
                                                    </button>
                                                    </form>
                                                </a>
                                                </td>
                                                <td className="justify-center md:justify-end md:flex mt-6">
                                                <div className="w-20 h-10">
                                                    <div className="relative flex flex-row w-full h-8">
                                                    <input 
                                                        type="number" 
                                                        defaultValue={item.quantity} 
                                                        className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                                                    </div>
                                                </div>
                                                </td>
                                                <td className="hidden text-right md:table-cell">
                                                <span className="text-sm lg:text-base font-medium">
                                                    ${item.book.price} 
                                                </span>
                                                </td>
                                                <td className="text-right">
                                                <span className="text-sm lg:text-base font-medium">
                                                    ${lineItemPrice(item.book.price, item.quantity)}
                                                </span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                                <div className="flex justify-center">
                                    <button 
                                        role="link"
                                        type="submit" 
                                        onClick={checkOut}
                                        className="py-3 px-8 rounded text-white bg-indigo-600 hover:bg-indigo-700">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                            : <div>
                                <p>No Items added to Cart</p>
                                <Link href="/"><button 
                                        role="link"
                                        type="submit" 
                                        className="py-3 px-8 rounded text-white bg-indigo-600 hover:bg-indigo-700">
                                        Back to Home
                                    </button></Link>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}