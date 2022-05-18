/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { getCookie } from '../../utils/CookieUtility'

const SignInPage: React.FC = () => {
  const [token, setToken] = React.useState<string>('')
  const [redirectToReferrer, setRedirectToReferrer] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  React.useEffect(() => {
    setToken(getCookie('jwt'))
    const getOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    }
    fetch('https://api.tokyo-dinner.com/auth/home', getOptions)
        .then(res => res.json())
        .then(data => {
          alert(JSON.stringify(data))
          const loginUser = JSON.parse(JSON.stringify(data.body))
          if (loginUser.text == 'Hello Admin.') {
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
    fetch('https://api.tokyo-dinner.com/login', postOptions)
        .then((res) => res.json())
        .then((data) => {
          const domain = 'sakaba.link'
          const maxAge = 3600
          if (data.code == 200) {
            document.cookie = `jwt=${data.token}; max-Age=${maxAge}; domain=${domain}; secure`
            setRedirectToReferrer(true)
        }
      })
  } 

  if (redirectToReferrer === true) {
    return <Redirect to={'/admin/index'} />
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
