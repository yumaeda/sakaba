import * as React from 'react'
import JwtPayload from '../interfaces/JwtPayload'
import { deleteCookie, getCookie } from '../utils/CookieUtility'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'

interface IProps {
    children: React.ReactNode
}

const PrivateRoute: React.FC<IProps> = ({ children }) => {
  const JWT_COOKIE_NAME = 'jwt'

  const getCurrentTime = (): number => Math.floor(Date.now() / 1000)

  const getTokenExpiryTime = (): number => {
    const token = getCookie(JWT_COOKIE_NAME)
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token)
      if (decoded !== null && decoded.exp) {
        return decoded.exp
      }
    }

    return getCurrentTime()
  }

  const isValidToken = (getTokenExpiryTime() > getCurrentTime())
  if (!isValidToken) {
    deleteCookie(JWT_COOKIE_NAME)
  }

  return isValidToken ?
    <>{children}</> :
    <Navigate to="/signin" replace />
}

export default PrivateRoute
