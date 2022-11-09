import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import CreateForm from './CreateForm';

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
  const [openModalCreate, setOpenModalCreate] = React.useState(false);
  const handleOpenModalCreate = () => setOpenModalCreate(true);
  const handleCloseModalCreate = () => setOpenModalCreate(false);
  return (
    <div>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenModalCreate}>
        Create
      </Button>
      <Modal open={openModalCreate} onClose={handleCloseModalCreate} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <CreateForm handleCloseModalCreate={handleCloseModalCreate} />
        </Box>
      </Modal>
    </div>
  );
};

export default CreateModal;
