import styles from '@/styles/page.module.css'
import btnStyles from '@/styles/button.module.css';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export default function dashboard() 
{
  const session = useSession();
  console.log(session);
  const { push } = useRouter();
  const [testing, setTesting] = useState("auth");

  const handleSignOut = () =>
  {
    signOut();
  }

  useEffect(() => {
    if( session.status === 'unauthenticated' ) push('/login');
  }, [handleSignOut])

  const handleEditProfile = () =>
  {
    push("./profile")
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h2>Dashboard</h2>
        <p>You are Logged In as {session.data?.user?.name}</p>
        <button onClick={handleEditProfile} className={btnStyles.submitBtn}>Edit Profile</button>
        <button onClick={handleSignOut} className={btnStyles.submitBtn}>Sign Out</button>
      </div>
    </main>
  )
}
