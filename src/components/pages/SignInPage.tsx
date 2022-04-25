/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Redirect } from 'react-router-dom'

const SignInPage: React.FC = () => {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState<boolean>(false)
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
      .then((respose: Response) => {
        if (respose.ok) {
          alert(respose.headers.get('set-cookie'))
          document.cookie = `jwt=abcdefg;max-age=3600;domain=sakaba.link`
          setRedirectToReferrer(true)
        }
      })
  } 

  if (redirectToReferrer === true) {
    return <Redirect to={'/admin/restaurant-genre'} />
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
