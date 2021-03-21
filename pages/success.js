import React from 'react'
import Navbar from '../components/Navbar'

export async function getServerSideProps(context) {
    const { session_id } = context.query
    fetch(`http://localhost:3000/api/success?session_id=${session_id}`)
    return {
        props: {}
    }
}
export default function Success() {

    return (
        <div className="p-8 h-screen">
            <Navbar />
            <h1>Thanks for your order!</h1>
            <p>
                We appreciate your business!
            </p>
        </div>
    )
}