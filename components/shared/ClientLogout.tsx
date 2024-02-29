import { getUserAuth } from '@/lib/auth/utils'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import React from 'react'

const ClientLogout = async () => {
    
  return (
    <div>
        <LogoutLink>Sign out</LogoutLink>
    </div>
  )
}

export default ClientLogout