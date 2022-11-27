import { Grid, Pagination, Space, Text } from '@mantine/core'
import { Suspense, useMemo } from 'react'
import { Await, useLoaderData, useSearchParams } from 'react-router-dom'
import { SkeletonComponent } from '../../components/Skeleton'
import { Table } from '../../components/Table'
import { ExamsProps } from '../../shared/api'

export const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams()

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

  const pageTable = searchParams.get('page') || 1

  return (
    <Grid sx={{ minHeight: '100vh' }} justify="center">
      <Grid.Col span={10}>
        <Text fz="lg">Egzaminlar ro'yxati</Text>
        <Space h="md" />
        <Suspense fallback={<SkeletonComponent />}>
          <Await
            resolve={data}
            errorElement={<div>Could not load reviews 😬</div>}
            children={(resolvedReviews: ExamsProps[]) => {
              return (
                <>
                  <Table columns={columns} data={resolvedReviews} />
                  <Pagination
                    onChange={(page) => {
                      const pageM = {
                        page: page,
                      }
                      const urlParams: Record<string, string> = {}
                      for (const [key, val] of Object.entries(pageM)) {
                        if (val) {
                          urlParams[key.toString()] = val.toString()
                        }
                      }
                      setSearchParams(urlParams)
                    }}
                    sx={{ marginTop: 40 }}
                    total={20}
                    boundaries={1}
                    initialPage={Number(pageTable)}
                  />
                </>
              )
            }}
          />
        </Suspense>
      </Grid.Col>
    </Grid>
  )
}
