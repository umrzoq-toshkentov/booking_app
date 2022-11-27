import { Grid, Space, Text } from '@mantine/core'
import { Suspense, useMemo } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { SkeletonComponent } from '../../components/Skeleton'
import { Table } from '../../components/Table'
import { ExamsProps } from '../../shared/api'

export const Main = () => {
  const data = useLoaderData()
  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'title',
        header: 'Nomi',
      },
      {
        accessorKey: 'price',
        header: 'Narxi',
      },
    ]
  }, [])

  return (
    <Grid sx={{ minHeight: '100vh' }} justify="center">
      <Grid.Col span={10}>
        <Text fz="lg">Egzaminlar ro'yxati</Text>
        <Space h="md" />
        <Suspense fallback={<SkeletonComponent />}>
          <Await
            resolve={data}
            errorElement={<div>Could not load reviews 😬</div>}
            children={(resolvedReviews: ExamsProps[]) => (
              <Table columns={columns} data={resolvedReviews} />
            )}
          />
        </Suspense>
      </Grid.Col>
    </Grid>
  )
}
