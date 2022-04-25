/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Redirect, useLocation } from 'react-router-dom'

interface LocationState {
    from: { pathname: string }
}

const SignInPage: React.FC = () => {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState<boolean>(false)
  const { state } = useLocation<LocationState>()
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    fetch('https://api.tokyo-dinner.com/login', postOptions)
      .then((res) => res.json())
      .then((data) => {
        console.dir(data)
        if (data.code == 200) {
          setRedirectToReferrer(true)
        }
      })
  } 

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <>
      <header className="signin-header">
        <h1 className="signin-header-title">Sign In</h1>
      </header>
      <div className="signin-contents">
        <form onSubmit={handleSubmit}>
          <input className="signin-input" type="text" value={email} onChange={handleEmailChange} placeholder="ログインID" />
          <br />
          <input className="signin-input" type="password" value={password} onChange={handlePasswordChange} placeholder="パスワード" />
          <br />
          <input className="signin-button" type="submit" value="サインイン" />
        </form>
      </div>
    </>
  )
}

export default SignInPage
