import { Button, Grid, PasswordInput, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resolver } from './constant'
import { useMutation } from '@tanstack/react-query'
import { login, LoginParams } from '../../shared/api'
import Cookies from 'js-cookie'
import { TOKEN } from 'shared/index'
import { useNavigate } from 'react-router-dom'
import { ROUTER_PATHS } from '../../app/providers/router'

export const SignIn = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(resolver),
  })

  const handleLogin = useMutation(login, {
    onSuccess: (data) => {
      Cookies.set(TOKEN.AUTH_TOKEN, data.data)
      navigate('/' + ROUTER_PATHS.MAIN, {
        state: {
          token: data.data,
        },
      })
    },
  })

  const onSubmit = (data: LoginParams) => {
    handleLogin.mutate(data)
  }

  return (
    <Grid sx={{ minHeight: '100vh' }} justify="center" align="center">
      <Grid.Col lg={4} md={6} sm={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="number"
            render={({ field }) => {
              return (
                <TextInput
                  label="Login"
                  {...field}
                  error={errors.number?.message}
                />
              )
            }}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <PasswordInput
                  label="Parol"
                  {...field}
                  error={errors.password?.message}
                />
              )
            }}
          />

          <Button
            loading={handleLogin.isLoading}
            fullWidth
            sx={{ marginTop: 20 }}
            type="submit"
          >
            Kirish
          </Button>
        </form>
      </Grid.Col>
    </Grid>
  )
}
