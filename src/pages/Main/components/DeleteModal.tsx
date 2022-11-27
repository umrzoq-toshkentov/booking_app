import { Box, Button, Grid, Modal, Text } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { deleteExam, ExamsProps } from 'shared/api'
import { DeleteProps, DeleteRef } from '../model'

export const DeleteModal = forwardRef<DeleteRef, DeleteProps>((_, ref) => {
  const [open, setOpen] = useState(false)
  const [row, setRow] = useState<Partial<ExamsProps>>()

  const handleClose = () => setOpen(false)
  const deleteMutation = useMutation(deleteExam, {
    onSuccess: () => {
      handleClose()
    },
  })

  useImperativeHandle(ref, () => ({
    onOpen: (row) => {
      setOpen(true)
      setRow(row)
    },
    onClose: () => {
      setOpen(false)
    },
  }))

  const handleDelete = () => {
    if (row) deleteMutation.mutate(Number(row.id))
  }

  return (
    <Modal centered title="O'chirish" opened={open} onClose={handleClose}>
      <Text>{row?.title} egzaminni o'chirmoqchimisiz?</Text>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <Button
          loading={deleteMutation.isLoading}
          color="red"
          onClick={handleDelete}
        >
          O'chirish
        </Button>
      </Box>
    </Modal>
  )
})
