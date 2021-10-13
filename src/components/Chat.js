import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core'
import { Loader } from './Loader'
import firebase from 'firebase/compat/app'
export const Chat = () => {
  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )

  const sendMessage = async () => {
    firestore.collection('messages').add({
      uId: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setValue('')
  }

  if (loading) {
    return <Loader />
  }
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 60, marginTop: '10px' }}
        justifyContent={'center'}
      >
        <div style={{ width: '80%', height: '70vh', border: '1px solid gray', overflowY: 'auto' }}>
          {messages.map((message, idx) => (
            <div
              key={idx}
              style={{
                margin: '10px',
                border: user.uid === message.uId ? '2px solid green' : '2px dashed red',
                marginLeft: user.uid === message.uId ? 'auto' : '10px',
                width: 'fit-content',
                padding: '5px 10px',
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>

        <Grid container alignItems={'flex-end'} style={{ width: '80%' }} direction={'column'}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant={'outlined'}
            fullWidth
            maxRows={2}
          />
          <Button onClick={sendMessage} style={{ marginTop: '5px' }} variant={'outlined'}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
