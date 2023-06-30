import { useState } from 'react'
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import Axios from 'axios';

/* IMPORT STYLES */
import styles from '@/styles/page.module.css';
import btnStyles from '@/styles/button.module.css';
import InputStyles from '@/styles/input.module.css';

export interface user
{
  id: string,
  name: string,
  username: string,
  password: string,
  createdAt: Date
}

async function getUser(id: string)
{
}

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
  const id = session?.user.id;
  return await Axios.get('http://localhost:3000/api/user/'+id)
  .then((response) =>
  {
    return {
      props: {
        data: {
          error: null,
          user: {
            id: id,
            username: response.data.username,
            name: response.data.name,
            password: response.data.password,
            createdAt: response.data.createdAt,
          },
        }
      },
    }
  }).catch(() =>
  {
    return {
      props: {
        data: {
          error: "failed fetching data",
        }
      },
    }
  })
}


export default function profile(
  { data }:{ data: any}
  ) 
{
  console.log("Testing: "+data.error);
  const { push } = useRouter();
  const [ newUser, setNewUser ] = useState({
    id: data.user.id,
    name : data.user.name,
    username: data.user.username,
    password: data.user.password,
    createdAt: data.user.createdAt,
  });

  const handleSaveBtn = async (e: any) =>
  {
    e.preventDefault();
    await Axios.patch('http://localhost:3000/api/user/'+newUser.id,
		{
      username: newUser.username,
			password: newUser.password
		}).then(() =>
    {
      push('/dashboard');
		});
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h2>Your Profile [UID: {newUser.id}]</h2>

        <div className={InputStyles.inputField}>
          <label htmlFor="username">Username</label>
          <input type="username" name="username" id="username" className={InputStyles.input} placeholder='*****'
            value={newUser.username}
            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
          />
        </div>
        <div className={InputStyles.inputField}>
          <label htmlFor="password">Password</label>
          <input type="password" name="username" id="username" className={InputStyles.input} placeholder='*****'
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
          />
        </div>
        <h2 style={{fontSize: 14}}>You created your account on {newUser.createdAt}</h2>
        <button onClick={handleSaveBtn} className={btnStyles.submitBtn}>Save</button>
      </div>
    </main>
  )
}
