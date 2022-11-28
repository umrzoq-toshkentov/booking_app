import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Modal,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ROUTER_PATHS } from 'app/providers/router'
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  createExam,
  getSubjects,
  SubjectParam,
  SubjectParams,
} from 'shared/api'
import { QUERY_KEY } from 'shared/constants'
import { AddProps, AddRef, resolver } from '../model'

export const AddModal = forwardRef<AddRef, AddProps>((_, ref) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { data } = useQuery([QUERY_KEY.SUBJECTS], getSubjects, {
    enabled: open,
  })

  const createHandleExam = useMutation(createExam, {
    onSuccess: () => {
      handleClose()
      navigate('/' + ROUTER_PATHS.MAIN)
    },
  })

  const subjects = useMemo(() => {
    if (data?.data && data?.data?.length > 0) {
      return data?.data?.map((item: SubjectParams) => ({
        value: item.id,
        label: item.name,
      }))
    } else {
      return []
    }
  }, [data])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectParam>({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(resolver),
  })

  const handleClose = () => setOpen(false)

  useImperativeHandle(ref, () => ({
    onClose: () => {
      handleClose()
    },
    onOpen: () => {
      setOpen(true)
    },
  }))

  const onSubmit = (data: SubjectParam) => {
    createHandleExam.mutate({
      active: true,
      price: Number(data.price),
      startedDate: new Date(data.startedDate),
      subjectId: Number(data.subjectId),
      title: data.title,
    })
  }

  return (
    <Modal title="Egzamin qo'shish" onClose={handleClose} opened={open}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 15 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="title"
          render={({ field }) => {
            return (
              <TextInput
                label="Nomi"
                {...field}
                error={errors.title?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="price"
          render={({ field }) => {
            return (
              <NumberInput
                label="Narxi"
                {...field}
                min={0}
                parser={(value) => value && value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value as string))
                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : ' '
                }
                error={errors.price?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="startedDate"
          render={({ field }) => {
            return (
              <DatePicker
                label="Boshlanish kuni"
                placeholder="Sanani tanlang"
                {...field}
                error={errors.startedDate?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="subjectId"
          render={({ field }) => {
            return (
              <Select
                label="Fan"
                placeholder="Sanani tanlang"
                {...field}
                data={subjects}
                error={errors.startedDate?.message}
              />
            )
          }}
        />

        <Button
          loading={createHandleExam.isLoading}
          fullWidth
          sx={{ marginTop: 20 }}
          type="submit"
        >
          Qo'shish
        </Button>
      </Box>
    </Modal>
  )
})
