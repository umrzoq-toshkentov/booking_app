import { Button, Grid, PasswordInput, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormType, resolver } from './constant'

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(resolver),
  })

  const onSubmit = (data: FormType) => {
    console.log(data, 'data')
  }

  return (
    <Grid sx={{ minHeight: '100vh' }} justify="center" align="center">
      <Grid.Col span={4}>
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

          <Button fullWidth sx={{ marginTop: 20 }} type="submit">
            Kirish
          </Button>
        </form>
      </Grid.Col>
    </Grid>
  )
}
