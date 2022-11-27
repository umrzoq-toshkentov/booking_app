import { Button, Grid, Pagination, Space, Text } from '@mantine/core'
import { ColumnDef } from '@tanstack/react-table'
import { useRef } from 'react'
import { Suspense, useMemo } from 'react'
import { Await, useLoaderData, useSearchParams } from 'react-router-dom'
import { SkeletonComponent } from '../../components/Skeleton'
import { Table } from '../../components/Table'
import { ExamsProps } from '../../shared/api'
import { DeleteModal } from './components/DeleteModal'
import { DataParams, DeleteRef } from './model'

export const Main = () => {
  const ref = useRef<DeleteRef>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const data = useLoaderData() as DataParams
  const columns = useMemo<ColumnDef<ExamsProps>[]>(() => {
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
      {
        accessorKey: 'action',
        header: '',
        cell: ({ row }) => {
          const handleClick = () => {
            ref.current?.onOpen(row.original)
          }
          return (
            <div>
              <Button onClick={handleClick} color="red">
                O'chirish
              </Button>
            </div>
          )
        },
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
            resolve={data.data}
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
                    total={data.count / 10 > 1 ? data.count / 10 : 0}
                    initialPage={Number(pageTable)}
                  />
                  <DeleteModal name="delete" ref={ref} />
                </>
              )
            }}
          />
        </Suspense>
      </Grid.Col>
    </Grid>
  )
}
