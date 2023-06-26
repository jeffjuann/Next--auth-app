import btnStyles from '@/styles/button.module.css';
import styles from '@/styles/login.module.css';
import { FormEventHandler, useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Axios from 'axios';

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
    await Axios.post('http://localhost:3000/api/user',
		{
      name: user.name,
		  username: user.username, 
		  password: user.password
		}).then(() =>
    {
      push('/login');
		});
  }

  const [ user, setUser ] = useState({
    name: '',
    username: '',
    password: ''
  });
  
  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        
        <div className={styles.inputField}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className={styles.input} placeholder='Name'
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

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
        <div className={styles.action}>
        <button type="submit" className={btnStyles.submitBtn}>Submit</button>
        <h2 style={{fontSize: 12}}>or</h2>
        <Link href={"../login"}>Login</Link>
        </div>
      </form>
    </main>
  )
}
