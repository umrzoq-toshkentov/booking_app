import Cookies from 'js-cookie'
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { TOKEN } from '../../shared'
import { useState } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  ScrollArea,
  Button,
  Grid,
} from '@mantine/core'
import { ROUTER_PATHS } from '../../app/providers/router'

interface LocationParams {
  token: string
}

export const AuthLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const token = Cookies.get(TOKEN.AUTH_TOKEN)
  const state = location.state as LocationParams
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const handleLogout = () => {
    Cookies.remove(TOKEN.AUTH_TOKEN)
    navigate(ROUTER_PATHS.LOGIN)
  }

  return state?.token || token ? (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                width: '100%',
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[5]
                      : theme.colors.gray[1],
                },
              })}
              to={ROUTER_PATHS.MAIN}
              component={Link}
            >
              Asosiy
            </Box>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Grid sx={{ width: '100%' }} align="flex-end" justify="flex-end">
              <Grid.Col sm={3} md={2} lg={1}>
                <Button onClick={handleLogout} color="red">
                  Chiqish
                </Button>
              </Grid.Col>
            </Grid>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}
