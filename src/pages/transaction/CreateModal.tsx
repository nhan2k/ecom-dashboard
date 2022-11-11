import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import CreateForm from './CreateForm';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getTransactionState, setPostModal } from '@/features/redux/slices/transaction';

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

interface ICreateModal {}

const CreateModal: React.FC<ICreateModal> = () => {
  const { postModal } = useAppSelector(getTransactionState);
  const dispatch = useAppDispatch();
  const handleOpenModalCreate = () => dispatch(setPostModal(true));
  const handleCloseModalCreate = () => dispatch(setPostModal(false));
  return (
    <div>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenModalCreate}>
        Create
      </Button>
      <Modal open={postModal} onClose={handleCloseModalCreate} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <CreateForm />
        </Box>
      </Modal>
    </div>
  );
};

export default CreateModal;
