import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getAllOrderAsyncThunk, getOrderState, putOrderAsyncThunk, setOneOrder } from '@/features/redux/slices/order';
import { Stack } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { statusEnum, statusMap } from '@features/redux/slices/transaction/enum';

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
  disabled: boolean;
}

const ApproveModal: React.FC<IApproveModal> = ({ id, disabled }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return setOpen(true);
  };
  const { dataGetOne } = useAppSelector(getOrderState);

  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const handleApprove = async () => {
    await dispatch(putOrderAsyncThunk({ data: { status: statusEnum.Success }, id }));
    setOpen(false);
    await dispatch(getAllOrderAsyncThunk());
  };

  const handleReject = async () => {
    await dispatch(putOrderAsyncThunk({ data: { status: statusEnum.Failed }, id }));
    setOpen(false);
    await dispatch(getAllOrderAsyncThunk());
  };

  return (
    <div>
      <Button onClick={handleOpen} disabled={disabled}>
        {disabled ? 'Approved' : 'Approve'}
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Are you approve this order
          </Typography>

          <Stack direction="row" spacing={2} style={{ marginTop: '1.6rem' }}>
            <Button fullWidth color="success" variant="outlined" startIcon={<CheckCircleOutlineIcon />} onClick={handleApprove}>
              Approve
            </Button>
            <Button fullWidth color="error" variant="outlined" startIcon={<DeleteForeverIcon />} onClick={handleReject}>
              Reject
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
