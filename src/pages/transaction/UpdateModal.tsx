import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpdateForm from './UpdateForm';
import { useAppSelector } from '@/features/hooks/reduxHooks';
import { getTransactionState } from '@/features/redux/slices/transaction';

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
  const handleOpenModalUpdate = () => {
    setOpenModalUpdate(true);
  };
  const handleCloseModalUpdate = () => setOpenModalUpdate(false);

  return (
    <div>
      <IconButton color="primary" aria-label="Update" size="large" onClick={handleOpenModalUpdate}>
        <ModeEditIcon />
      </IconButton>
      <Modal open={openModalUpdate} onClose={handleCloseModalUpdate} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <UpdateForm id={id} />
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;
