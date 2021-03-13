import React, {useEffect} from 'react'
import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

function dashboard() {
    const router = useRouter()
    const [ session ] = useSession()

    useEffect(() => {
        if (!session) {
          router.push('/admin')
        }
    }, [router])
    return (
        <div>
            <AdminSidebar />
            <div>
                
            </div>
        </div>
    )
}

export default dashboard