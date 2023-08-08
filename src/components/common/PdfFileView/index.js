import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { useDispatch, useSelector } from 'react-redux'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
import { s3BaseURL } from '@/utils/utils'
import { FILE_REVIEW, PDF_VIEWER } from '@/utils/constants'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import {
  setPasswordConfirmationModal,
  setPasswordConfirmationType,
  setReviewersModal
} from '@/store/directory/directorySlice'
import InfoIcon from '@mui/icons-material/Info'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import { setFileReviewModal } from '@/store/global/globalSlice'

import Reviewers from '@/components/FileFolder/Reviewers'
import React from 'react'

const PdfFileView = ({ handleClose, open, refetch }) => {
  const dispatch = useDispatch()
  const { rowSelected, reviewersModal } = useSelector(state => state.directory)

  const { fileReviewModal } = useSelector(state => state.global)

  const handleOpenReviewList = () => {
    dispatch(setReviewersModal(true))
  }

  const handleCloseReviewModal = () => {
    dispatch(setFileReviewModal(false))
  }

  const handleCloseReviewers = () => {
    dispatch(setReviewersModal(false))
  }

  const handleOpenReview = () => {
    dispatch(setPasswordConfirmationModal(true))
    dispatch(setPasswordConfirmationType(FILE_REVIEW))
  }

  const toolbarPluginInstance = toolbarPlugin()
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance

  const transform = slot => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    EnterFullScreen: () => <></>,
    EnterFullScreenMenuItem: () => <></>,
    SwitchTheme: () => <></>,
    SwitchThemeMenuItem: () => <></>,
    Print: () => <></>,
    Open: () => <></>,
    SwitchScrollMode: () => <></>,
    SwitchSelectionMode: () => <></>,
    TextSelectionIcon: () => <></>,
    HandToolIcon: () => <></>,
    SwitchScrollModeMenuItem: () => <></>
  })

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: defaultTabs => []
  })

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth={true}
        maxWidth='lg'
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', m: 1, alignItems: 'center' }}>
            <Button variant='outlined' color='primary' aria-label='add' onClick={handleOpenReview}>
              <ThumbUpIcon sx={{ mr: 1 }} />
              Add Review
            </Button>

            <Tooltip title='See more reviews' onClick={handleOpenReviewList} sx={{ ml: 1 }}>
              <IconButton>
                <InfoIcon size='large' sx={{ color: 'gray' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Worker workerUrl={PDF_VIEWER}>
              <div
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '80vh'
                }}
              >
                <div
                  className='rpv-core__viewer'
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#eeeeee',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      padding: '0.25rem'
                    }}
                  >
                    <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      overflow: 'hidden'
                    }}
                  >
                    <Viewer
                      fileUrl={`${s3BaseURL(rowSelected?.fileKey)}?v=${Math.random()}`}
                      plugins={[toolbarPluginInstance]}
                    />
                  </div>
                </div>
              </div>
            </Worker>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/*{fileReviewModal && (*/}
      {/*  <ReviewFile open={fileReviewModal} handleClose={handleCloseReviewModal} dispatch={dispatch} refetch={refetch} />*/}
      {/*)}*/}

      {reviewersModal && <Reviewers open={reviewersModal} handleClose={handleCloseReviewers} />}
    </>
  )
}

export default PdfFileView
