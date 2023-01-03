import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch } from '@/features/hooks/reduxHooks';
import { putProductShopAsyncThunk, getAllProductAsyncThunk } from '@/features/redux/slices/product';
import { Stack } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IApproveModal {
  id: number;
}

const ApproveModal: React.FC<IApproveModal> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const handleApprove = async () => {
    await dispatch(putProductShopAsyncThunk(id));
    setOpen(false);
    await dispatch(getAllProductAsyncThunk());
  };

  return (
    <div>
      <Button onClick={handleOpen}>Approved</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Are you approve this order
          </Typography>

          <Stack direction="row" spacing={2} style={{ marginTop: '1.6rem' }}>
            <Button fullWidth color="success" variant="outlined" startIcon={<CheckCircleOutlineIcon />} onClick={handleApprove}>
              Approve
            </Button>
            <Button fullWidth color="info" variant="outlined" startIcon={<CancelIcon />} onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ApproveModal;
