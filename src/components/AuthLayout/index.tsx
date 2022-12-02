import Cookies from 'js-cookie'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
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
  ScrollArea,
  Button,
  Grid,
  UnstyledButton,
  Group,
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
            <MainLink label="Asosiy" path={ROUTER_PATHS.MAIN} />
            <MainLink label="Kurslar" path={ROUTER_PATHS.COURSES} />
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

            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
              <Grid
                sx={{ width: '100%' }}
                align="flex-end"
                justify="space-between"
              >
                <Grid.Col xs={6} sm={0} md={0} lg={6}>
                  <Text fz="lg">LMS system</Text>
                </Grid.Col>

                <Grid.Col
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  xs={6}
                  sm={10}
                  md={6}
                  lg={6}
                >
                  <Button onClick={handleLogout} color="red">
                    Chiqish
                  </Button>
                </Grid.Col>
              </Grid>
            </MediaQuery>
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

interface MainLinkProps {
  label: string
  path: string
}

const MainLink = ({ label, path }: MainLinkProps) => {
  const navigate = useNavigate()
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={() => {
        navigate(path)
      }}
    >
      <Group>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  )
}
