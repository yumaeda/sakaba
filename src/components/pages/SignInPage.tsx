/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import { jwtDecode, JwtPayload} from 'jwt-decode'
import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { getCookie } from '../../utils/CookieUtility'
import { USER_NAME_KEY } from '../../constants/LocalStorageKeys'

interface CustomJwtPayload extends JwtPayload {
  id: string
}

const SignInPage: React.FC = () => {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  React.useEffect(() => {
    fetch('https://api.sakabas.com/auth/home', {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('jwt')}`
      }
    })
        .then(response => {
          if (response.status == 200) {
            setRedirectToReferrer(true)
          }
        })
  }, [])

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const postOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    fetch('https://api.sakabas.com/login', postOptions)
        .then((res) => res.json())
        .then((data) => {
          const domain = 'sakabas.com'
          const maxAge = 3600
          if (data.code == 200) {
            document.cookie = `jwt=${data.token}; max-Age=${maxAge}; domain=${domain}; secure`
            try {
              const decoded = jwtDecode<CustomJwtPayload>(data.token)
              localStorage.setItem(USER_NAME_KEY, decoded.id.split('@')[0])
            } catch (error) {
              console.error('Failed to decode token:', error)
            }

            setRedirectToReferrer(true)
        }
      })
  } 

  if (redirectToReferrer === true) {
    return <Navigate to={'/admin/index'} />
  }

  return (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">Sign In</h1>
      </header>
      <div className="admin-contents">
        <form onSubmit={handleSubmit}>
          <input className="admin-input" type="text" value={email} onChange={handleEmailChange} placeholder="ログインID" />
          <br />
          <input className="admin-input" type="password" value={password} onChange={handlePasswordChange} placeholder="パスワード" />
          <br />
          <input className="admin-button" type="submit" value="サインイン" />
        </form>
      </div>
    </>
  )
}

export default SignInPage
