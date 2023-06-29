import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Axios from 'axios';

/* IMPORT STYLES */
import styles from '@/styles/page.module.css';
import btnStyles from '@/styles/button.module.css';
import InputStyles from '@/styles/input.module.css';

export default function profile() 
{
  const session = useSession();
  const { push } = useRouter();
  const [ user, setUser ] = useState({
    id: '',
    username: '',
    name : '',
    password: '',
    createdAt: Date()
  });
  const [ id, setId ] = useState('');

  useEffect( () => {
    if( session.status === 'loading') return;
    console.log(session);
    if( session.status === 'unauthenticated' ) push('/login');
    else
    {
      setId(session.data?.user.id);
      if(id !== undefined && id !== '')
      {
        Axios.get('http://localhost:3000/api/user/'+id)
        .then((response) =>
        {
          console.log(response.data);
          setUser({
            id: id,
            username: response.data.user.username,
            name: response.data.user.name,
            password: response.data.user.password,
            createdAt: response.data.user.createdAt,
          });
          console.log(user);
        })
      }
    }
  }, [session])


	const [ newUser, setNewUser ] = useState({
    name: user.name,
    username: user.username,
    password: '',
  });

  const handleSaveBtn = async (e: any) =>
  {
    e.preventDefault();
    await Axios.patch('http://localhost:3000/api/user/'+id,
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
        <h2>Your Profile [UID: {id}]</h2>

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
        <h2 style={{fontSize: 14}}>You created your account on {user.createdAt}</h2>
        <button onClick={handleSaveBtn} className={btnStyles.submitBtn}>Save</button>
      </div>
    </main>
  )
}
