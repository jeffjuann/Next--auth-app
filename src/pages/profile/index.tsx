import styles from '@/styles/login.module.css'
import btnStyles from '@/styles/button.module.css';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Axios from 'axios';

export default function dashboard() 
{
  const session = useSession();
  console.log(session);
  const { push } = useRouter();

  useEffect(() => {
    if( session.status === 'unauthenticated' ) push('/login');
  }, [])

	const [ newPassword, setNewPassword ] = useState('');

  const handleSaveBtn = async (e: any) =>
  {
    e.preventDefault();
    await Axios.patch('http://localhost:3000/api/user/'+session.data?.user?.id,
		{
			password: newPassword
		}).then(() =>
    {
      push('/dashboard');
		});
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h2>Dashboard</h2>
        <p>You are Logged In as ID: {session.data?.user?.id}</p>
        <div className={styles.inputField}>
          <label htmlFor="username">Password</label>
          <input type="password" name="username" id="username" className={styles.input} placeholder='Username'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSaveBtn} className={btnStyles.submitBtn}>Save</button>
      </div>
    </main>
  )
}
