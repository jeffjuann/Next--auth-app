import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Axios from 'axios';

/* IMPORT STYLES */
import styles from '@/styles/page.module.css';
import btnStyles from '@/styles/button.module.css';
import InputStyles from '@/styles/input.module.css';

export default function dashboard() 
{
  const session = useSession();
  const { push } = useRouter();
  const [ user, setUser ] = useState({
  });
  const id = session.data?.user?.id;

  useEffect(() => {
    if( session.status === 'unauthenticated' ) push('/login');
      // await Axios.get('http://localhost:3000/api/user/'+parseInt(id))
      // .then((response) =>
      // {
      //   console.log(response);
      //   setUser(response);
      // });

    // getUser();
  }, [])


	const [ newUser, setNewUser ] = useState({
    // name: user.name,
    username: "user.username",
    password: '',
  });

  const handleSaveBtn = async (e: any) =>
  {
    e.preventDefault();
    await Axios.patch('http://localhost:3000/api/user/'+id,
		{
			password: newUser.password
		}).then(() =>
    {
      push('/dashboard');
		});
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h2>Your Profile (UID: {id})</h2>

        <div className={InputStyles.inputField}>
          <label htmlFor="username">Username</label>
          <input type="password" name="username" id="username" className={InputStyles.input} placeholder='*****'
            value={newUser.username}
            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
          />
        </div>
        <div className={InputStyles.inputField}>
          <label htmlFor="username">Password</label>
          <input type="password" name="username" id="username" className={InputStyles.input} placeholder='*****'
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
          />
        </div>
        <h2 style={{fontSize: 14}}>You created your account on </h2>
        <button onClick={handleSaveBtn} className={btnStyles.submitBtn}>Save</button>
      </div>
    </main>
  )
}
