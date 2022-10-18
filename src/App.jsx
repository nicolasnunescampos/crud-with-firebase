
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs 
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const firebaseApp = initializeApp ({
  apiKey: "AIzaSyDT1u29HHtdS1LuR42UH0fUTUGAlQmfNio",
  authDomain: "crud-firebase-339ff.firebaseapp.com",
  projectId: "crud-firebase-339ff",
});

export const App = () => {
  const [name, setName] = useState ("");
  const [email, setEmail] = useState ("");
  const [users, setUsers] = useState ([]);

  const db = getFirestore(firebaseApp);

  const userCollectionRef = collection(db, "users");

  async function createUser () {
    const user = await addDoc(userCollectionRef, {name, email});
  };

  async function deleteUser(id) {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc);
  }
  
  useEffect (() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getUsers();
  }, []);

  
  return (
    <>
      <div className='background'>
        <input type="text" placeholder='name...' value={name} onChange={e => setName(e.target.value)}/>
        <input type="text" placeholder='email...' value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={createUser}>Submit</button>


    </div>
      <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                  {users.map(users => (
                    <TableRow key = {users.id}>
                    <TableCell>{users.name}</TableCell>
                    <TableCell>{users.email}</TableCell>
                    <TableCell><button  onClick={() => deleteUser(users.id)}>Delete</button></TableCell>
                  </TableRow>
                  ))}
                    
                
              </TableBody>

            </Table>
          </TableContainer>
        </div>
      </>
      
    )
    
  };

export default App;