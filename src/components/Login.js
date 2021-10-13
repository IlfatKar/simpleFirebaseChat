import React, { useContext } from 'react'
import { Box, Button, Container, Grid } from '@material-ui/core'
import { Context } from '../index'
import firebase from 'firebase/compat/app'
export const Login = () => {
  const { auth } = useContext(Context)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const { user } = await auth.signInWithPopup(provider)
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
          style={{ width: 400, background: 'lightgray' }}
          alignItems={'center'}
          direction={'column'}
        >
          <Box p={5}>
            <Button onClick={login} variant={'outlined'}>
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
