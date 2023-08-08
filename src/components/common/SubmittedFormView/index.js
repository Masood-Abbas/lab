import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import api from '@/utils/axios'
import FormValues from '@/components/FormTemplates/FormValues'

const SubmittedFormView = ({ handleClose, open, formId }) => {
  const [formTemplate, setFormTemplate] = useState({})
  const [submissionDetail, setSubmissionDetail] = useState({})

  useEffect(() => {
    if (formId) {
      api?.get(`/form-submission/${formId}`).then(response => {
        setSubmissionDetail(response?.data)
        api?.get(`/form/${response?.data?.formId}`).then(formResponse => {
          setFormTemplate(formResponse?.data)
        })
      })
    }
  }, [formId])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullWidth={true}
      maxWidth='lg'
    >
      <DialogTitle sx={{ fontWeight: 600 }}></DialogTitle>

      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <FormValues
            formFields={formTemplate?.formFields}
            formName={formTemplate?.name}
            abbreviation={formTemplate?.abbreviation}
            formTemplate={formTemplate}
            submissionDetail={submissionDetail}
            isEdit={false}
            isShowEyeIconForForm={false}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubmittedFormView
