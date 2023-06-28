import { FormEventHandler, useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

/* IMPORT STYLES */
import styles from '@/styles/page.module.css';
import btnStyles from '@/styles/button.module.css';
import LinkStyles from '@/styles/Link.module.css';
import InputStyles from '@/styles/input.module.css';

export default function Login()
{
  const session = useSession();
  const { push } = useRouter();
  const [err, setErr] = useState(false);

  useEffect(() =>
  {
    if( session.status === 'authenticated' ) push('/dashboard');
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) =>
  {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: user.username,
      password: user.password,
      redirect: false
    })
    console.log(session);
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
        
        <div className={InputStyles.inputField}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" className={InputStyles.input} placeholder='Username'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        <div className={InputStyles.inputField}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className={InputStyles.input} placeholder='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        {err && <p style={{color: 'red'}}>Invalid Credentials</p>}
        <div className={styles.action}>
          <button type="submit" className={btnStyles.submitBtn} >Sign In</button>
          <h2 style={{fontSize: 12}}>or</h2>
          <h2 style={{fontSize: 14}}>Create New Account? <Link className={LinkStyles.Link} href="../register">Register</Link></h2>
        </div>
      </form>
    </main>
  )
}
