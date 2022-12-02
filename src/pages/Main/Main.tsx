import { Box, Button, Grid, List, Pagination, Space, Text } from '@mantine/core'
import { ColumnDef } from '@tanstack/react-table'
import { Suspense, useMemo, useRef } from 'react'
import {
  Await,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { SkeletonComponent } from '../../components/Skeleton'
import { Table } from '../../components/Table'
import { deleteExam, ExamsProps } from '../../shared/api'
import { AddModal } from './components/AddModal'
import { DeleteModal } from './components/DeleteModal'
import { AddRef, DataParams, DeleteRef } from './model'
import _ from 'lodash'
import { useViewportSize } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import { closeAllModals, openConfirmModal } from '@mantine/modals'
import dayjs from 'dayjs'

export const Main = () => {
  const ref = useRef<DeleteRef>(null)
  const addRef = useRef<AddRef>(null)
  const { width } = useViewportSize()
  const navigate = useNavigate()
  const location = useLocation()

  const deleteMutation = useMutation(deleteExam, {
    onSuccess: () => {
      closeAllModals()
      navigate(location.pathname + location.search)
    },
  })

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

  const handleAdd = () => addRef.current?.onOpen()
  const handleInformation = (item: ExamsProps) => {
    openConfirmModal({
      title: "Ma'lumot",
      closeOnConfirm: false,
      centered: true,
      confirmProps: { color: 'red' },
      labels: { confirm: "O'chirish", cancel: 'Yopish' },
      children: (
        <>
          <Text>Nomi: {item?.title}</Text>
          <Text>Narxi: {item?.price}</Text>
          <Text>
            Sana: {dayjs(item?.startedDate).format('DD-MM-YYYY H:mm:ss')}
          </Text>
        </>
      ),
      onConfirm: () => {
        openConfirmModal({
          title: "O'chirish",
          centered: true,
          children: (
            <Text size="sm">{item?.title} egzaminni o'chirmoqchimisiz?</Text>
          ),
          labels: { confirm: 'Ha', cancel: "Yo'q" },
          confirmProps: { color: 'red' },
          onCancel: () => console.log('Cancel'),
          onConfirm: () => deleteMutation.mutate(Number(item?.id)),
        })
      },
    })
  }

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
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginBottom: 15,
                    }}
                  >
                    <Button onClick={handleAdd}>Qo'shish</Button>
                  </Box>
                  {width > 800 ? (
                    <Table columns={columns} data={resolvedReviews} />
                  ) : (
                    <List type="ordered" spacing={25} size="lg">
                      {!_.isNull(data?.data) &&
                        data?.data?.length > 0 &&
                        data?.data.map((item) => {
                          return (
                            <List.Item
                              onClick={() => handleInformation(item)}
                              key={item.id}
                            >
                              {item.title}
                            </List.Item>
                          )
                        })}
                    </List>
                  )}

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
                    total={data.count / 10 > 1 ? _.ceil(data.count / 10) : 0}
                    initialPage={Number(pageTable)}
                  />
                  <DeleteModal name="delete" ref={ref} />
                  <AddModal name="add" ref={addRef} />
                </>
              )
            }}
          />
        </Suspense>
      </Grid.Col>
    </Grid>
  )
}
