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
    // e.preventDefault();
    // await Axios.post('http://localhost:3000/api/user'+session.data?.user?.,
		// {
		// 	password: user.password
		// }).then(() =>
    // {
    //   push('/login');
		// });
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h2>Dashboard</h2>
        <p>You are Logged In as ID: {session.data?.user?.id}</p>
        <button onClick={handleSaveBtn} className={btnStyles.submitBtn}>Edit Profile</button>
      </div>
    </main>
  )
}
