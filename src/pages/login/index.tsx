import btnStyles from '@/styles/button.module.css';
import styles from '@/styles/login.module.css';
import { FormEventHandler, useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login()
{
  const session = useSession();
  console.log(session);
  const { push } = useRouter();
  const [testing, setTesting] = useState("auth");
  const [err, setErr] = useState(false);

  useEffect(() => {
    if( session.status === 'authenticated' ) push('/dashboard');
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) =>
  {
    e.preventDefault();
    console.log(user);
    const res = await signIn("credentials", {
      username: user.username,
      password: user.password,
      redirect: false
    })
    if(res?.error !== 'invalid credentials') push('/dashboard');
    else setErr(true);
  }

  const [ user, setUser ] = useState({
    username: '',
    password: ''
  });
  
  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        
        <div className={styles.inputField}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" className={styles.input} placeholder='Username'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className={styles.input} placeholder='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        {err && <p style={{color: 'red'}}>Invalid Credentials</p>}
        <button type="submit" className={btnStyles.submitBtn}>Sign In</button>
      </form>
    </main>
  )
}