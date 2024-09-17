import * as React from 'react'
import JwtPayload from '../interfaces/JwtPayload'
import { getCookie } from '../utils/CookieUtility'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'

interface IProps {
    children: React.ReactNode
}

const PrivateRoute: React.FC<IProps> = ({ children }) => {
  const isValidToken = (): boolean => {
    const token = getCookie('jwt')
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token)
        if (decoded !== null && decoded.exp) {
          console.dir(decoded)
          return decoded.exp > Math.floor(Date.now() / 1000)
        }
      } catch (error) {
        console.error('Invalid token:', error)
      }
    }

    return true
  }

  return isValidToken() ?
    <>{children}</> :
    <Navigate to="/signin" replace />
}

export default PrivateRoute
