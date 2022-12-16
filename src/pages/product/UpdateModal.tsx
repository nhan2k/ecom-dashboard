import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpdateForm from './UpdateForm';
import { useAppDispatch } from '@/features/hooks/reduxHooks';
import { setOneProduct } from '@features/redux/slices/product';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IUpdateModal {
  id: number;
}

const UpdateModal: React.FC<IUpdateModal> = ({ id }) => {
  const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleOpenModalUpdate = () => {
    dispatch(setOneProduct(id));
    setOpenModalUpdate(true);
  };
  const handleCloseModalUpdate = () => setOpenModalUpdate(false);
  return (
    <div>
      <Button variant="outlined" onClick={handleOpenModalUpdate} startIcon={<ModeEditIcon />}>
        Edit
      </Button>
      <Modal open={openModalUpdate} onClose={handleCloseModalUpdate} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <UpdateForm id={id} handleCloseModalUpdate={handleCloseModalUpdate} />
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;
