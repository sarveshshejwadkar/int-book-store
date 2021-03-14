import React, {useEffect} from 'react'
import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import AdminSidebar from '../../components/admin/AdminSidebar'

function dashboard() {
    const router = useRouter()
    const [ session ] = useSession()

    useEffect(() => {
        if (!session) {
          router.push('/admin')
        }
    }, [router])
    return (
        <div className="container grid grid-cols-5">
            <AdminSidebar />
            <div className="grid col-span-4">
                <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div class="max-w-md w-full space-y-8">
                        <div>
                            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Welcome to the Book Store
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard