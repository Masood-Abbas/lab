import React, { useState } from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { setFileOperationModal, setPdfFileView, setRowSelected } from '@/store/directory/directorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { setPassProps, resetLinkedFileValue } from '@/store/workflow-inbox/workflowInboxSlice'
import PdfFileView from '@/components/common/PdfFileView'
import AddLinkIcon from '@mui/icons-material/AddLink'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { SELECTED_ROW_TYPE } from '@/utils/constants'
import SubmittedFormView from '@/components/common/SubmittedFormView'
import { useRouter } from 'next/router'

const AddLink = ({ label, error, helperText, onChange, isShowEyeIconForForm, ...props }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { linkedFileValue } = useSelector(state => state.workflowInbox)
  const { pdfFileView } = useSelector(state => state.directory)

  const [submittedFormModal, setSubmittedFormModal] = useState(false)

  const handleOpenModal = () => {
    dispatch(setFileOperationModal(true))
    dispatch(setPassProps(props))
  }

  const handleRemoveFile = e => {
    if (onChange) {
      dispatch(resetLinkedFileValue(e))
      onChange({
        target: {
          name: props?.name,
          value: ''
        }
      })
    }
  }

  const handleViewAttachedFile = () => {
    if ([linkedFileValue[`${props?.name}`]?.type, props?.value?.type]?.includes(SELECTED_ROW_TYPE?.file)) {
      dispatch(setPdfFileView(true))
    } else if (
      [linkedFileValue[`${props?.name}`]?.type, props?.value?.type]?.includes(SELECTED_ROW_TYPE?.FORM_SUBMISSION)
    ) {
      setSubmittedFormModal(true)
    }
    dispatch(setRowSelected(props?.value || linkedFileValue))
  }

  const handleCloseSubmittedFormModal = () => {
    setSubmittedFormModal(false)
  }

  const handlePdfFileViewClose = () => {
    dispatch(setPdfFileView(false))
  }

  return (
    <>
      <FormGroup>
        <Grid style={{ marginTop: '20px' }} container>
          <Grid item xs={6}>
            <FormLabel component='legend' sx={{ fontWeight: '600', color: '#09948e' }}>
              {label}
              {props?.isRequired && ' *'}
            </FormLabel>
            <FormLabel component='legend' sx={{ fontWeight: '300', color: '#09948e' }}>
              {props?.value?.name || linkedFileValue[`${props?.name}`]?.name}
            </FormLabel>
          </Grid>
          <Grid item xs={6}>
            {props?.value?.id || linkedFileValue[`${props?.name}`]?.id ? (
              <>
                {isShowEyeIconForForm ? (
                  <Button variant='outline' color='primary' sx={{ color: '#00b3ab' }} onClick={handleViewAttachedFile}>
                    <RemoveRedEyeIcon size={20} />
                  </Button>
                ) : (
                  [linkedFileValue[`${props?.name}`]?.type, props?.value?.type]?.includes(SELECTED_ROW_TYPE?.file) && (
                    <Button
                      variant='outline'
                      color='primary'
                      sx={{ color: '#00b3ab' }}
                      onClick={handleViewAttachedFile}
                    >
                      <RemoveRedEyeIcon size={20} />
                    </Button>
                  )
                )}
                <Button
                  disabled={props?.disabled}
                  variant='outline'
                  sx={{ color: 'red', mr: 2 }}
                  onClick={() => handleRemoveFile(props?.name)}
                >
                  <DeleteIcon />
                </Button>
              </>
            ) : (
              <Button
                disabled={props?.disabled || router?.pathname?.includes('/form-templates/new')}
                variant='outline'
                sx={{ color: 'black' }}
                onClick={handleOpenModal}
                {...props}
              >
                <AddLinkIcon />
              </Button>
            )}
          </Grid>
        </Grid>
        {error && (
          <FormHelperText style={{ color: 'red' }} error>
            {error}
          </FormHelperText>
        )}
        {helperText && <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>}
      </FormGroup>
      {pdfFileView && <PdfFileView handleClose={handlePdfFileViewClose} open={pdfFileView} dispatch={dispatch} />}

      {submittedFormModal && (
        <SubmittedFormView
          handleClose={handleCloseSubmittedFormModal}
          formId={linkedFileValue[`${props?.name}`]?.formId || props?.value?.formId}
          open={submittedFormModal}
        />
      )}
    </>
  )
}

export default AddLink
