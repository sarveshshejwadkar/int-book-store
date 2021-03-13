import Head from 'next/head'
import styles from '../../styles/Admin.module.css'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter()

  async function loginAdmin(e) {
    e.preventDefault();
      signIn('credentials', {
        username,
        password,
        callbackUrl: `${window.location.origin}/admin/dashboard`,
      })
  }

  useEffect(() => {
    if (router.query.error) {
      setMessage('Invalid Credentials') // Shown below the input field in my example
    }
  }, [router])

  return (
    <div className={styles.container}>
      <Head>
        <title>Book Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className={styles.grid}>

          <form onSubmit={loginAdmin}>

            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" autoComplete="off" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="center">
              <button type="submit" >Login</button>
            </div>

            <p className="error">{message}</p>

          </form>

        </div>

      </main>

    </div>
  )
}
