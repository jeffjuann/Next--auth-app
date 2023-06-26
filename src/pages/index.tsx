import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'
import { useEffect } from 'react';

export default function Home() {
  const session  = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if( session.status === 'unauthenticated' ) push('/login');
  })
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.text}>Loading . . .</h1>
      </main>
    </>
  )
}
