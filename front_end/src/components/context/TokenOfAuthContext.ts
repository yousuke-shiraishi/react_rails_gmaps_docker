import React, { createContext } from 'react'
import { AuthToken } from '../interface/AuthToken'

const TokenOfAuthContext = createContext(
  {} as {
    TokenOfAuth: AuthToken | null
    setToken: React.Dispatch<React.SetStateAction<AuthToken | null>>
  }
)
export default TokenOfAuthContext
