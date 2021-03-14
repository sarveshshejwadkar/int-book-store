import React, {useEffect} from 'react'
import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import AdminSidebar from '../../components/admin/AdminSidebar'

function dashboard() {
    const router = useRouter()
    const [ session, loading ] = useSession()

    useEffect(() => {
        if (!loading && !session) {
          router.push('/admin')
        }
    })

    return (
        <div className="grid grid-cols-5">
            <AdminSidebar />
            <div className="grid col-span-4 bg-gray-300 min-h-screen flex items-center justify-center">
                <h1 className="text-3xl">
                    Welcome to the Book Store
                </h1>
            </div>
        </div>
    )
}

export default dashboard