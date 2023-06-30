import styles from '@/styles/page.module.css'
import btnStyles from '@/styles/button.module.css';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { signOut, useSession, getSession } from 'next-auth/react';

export async function getServerSideProps(context: any)
{
  const session = await getSession(context);
  if( session === null )
  {
    console.log("ERROR: SESSION NULL");
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }
  else 
  {
    return {
      props: {
        name: session?.user.name},
    }
  }
}

export default function dashboard(
  { name }:{ name: string}
  ) 
{
  const session = useSession();
  console.log(session);
  const { push } = useRouter();

  const handleSignOut = () =>
  {
    signOut();
  }

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
