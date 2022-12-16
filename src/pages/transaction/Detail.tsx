import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getOrderState, setOneOrder } from '@/features/redux/slices/order';

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

interface IDetailModal {
  id: number;
}

const DetailModal: React.FC<IDetailModal> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    dispatch(setOneOrder(id));
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { dataGetOne } = useAppSelector(getOrderState);

  return (
    <div>
      <Button onClick={handleOpen}>Detail</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Detail Order
          </Typography>
          <Typography variant="h6" component="h4">
            Buyer : {dataGetOne?.OrderModel?.fullName}
          </Typography>
          <Typography variant="h6" component="h4">
            Ship to : {dataGetOne?.OrderModel?.address}
          </Typography>
          <Typography variant="h6" component="h4">
            Product Name : {dataGetOne?.ProductModel?.title}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailModal;
