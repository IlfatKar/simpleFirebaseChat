import React, { useContext } from 'react'
import { Box, Button, Container, Grid } from '@material-ui/core'
import { Context } from '../index'
import firebase from 'firebase/compat/app'
export const Login = () => {
  const { auth } = useContext(Context)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try{
      const { user } = await auth.signInWithPopup(provider)
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid
          container
          style={{ width: 400, background: '#383838', borderRadius: 5 }}
          alignItems={'center'}
          direction={'column'}
        >
          <Box p={5}>
            <Button onClick={login} style={{color:'#e4e4e4', borderColor: '#aaa'}} variant={'outlined'}>
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
