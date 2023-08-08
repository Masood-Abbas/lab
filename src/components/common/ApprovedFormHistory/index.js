import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import HistoryTable from '@/components/common/ApprovedFormHistory/HistoryTable'

const ApprovedFormHistory = ({ handleClose, open, formTitle, formId }) => {
  return (
    <Dialog fullWidth maxWidth='lg' open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: 600 }}>History: {formTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Box>
          <HistoryTable formId={formId} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ApprovedFormHistory
