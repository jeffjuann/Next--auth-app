import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react'
import { useEffect } from 'react';

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
    console.log("ERROR: SESSION NOT NULL");
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    }
  }
}

export default function Home()
{
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.text}>Loading . . .</h1>
      </main>
    </>
  )
}
