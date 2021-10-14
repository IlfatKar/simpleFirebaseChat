import React, {useContext, useState} from 'react'
import {Context} from '../index'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {Avatar, Button, Container, Grid, TextField, Paper} from '@material-ui/core'
import {Loader} from './Loader'
import firebase from 'firebase/compat/app'

export const Chat = () => {
  const {auth, firestore} = useContext(Context)
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
    return <Loader/>
  }
  return (
    <Container>
      <Grid
        container
        style={{height: window.innerHeight - 60, marginTop: '10px'}}
        justifyContent={'center'}
      >
        <Paper className={'chat'} >
          {messages.map((message, idx) => (
            <Paper
              elevation={3}
              key={idx}
              className={'message'}
              style={{
                marginLeft: user.uid === message.uId ? 'auto' : '10px',
              }}
            >
              <Grid container style={{marginLeft: user.uid === message.uId ? 'auto' : '0'}}>
                <Avatar src={message.photoURL} style={{display: 'inline-block', width: 30, height: 30}}/>
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </Paper>
          ))}
        </Paper>

        <Grid container alignItems={'flex-end'} style={{width: '80%'}} direction={'column'}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant={'outlined'}
            fullWidth
            maxRows={2}
          />
          <Button onClick={sendMessage} style={{marginTop: '5px'}} variant={'outlined'}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
