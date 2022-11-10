import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, CircularProgress, IconButton, Stack } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { deleteProductCategoryAsyncThunk, getProductCategoryState } from '@/features/redux/slices/product-category';

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

interface IDeleteModal {
  id: number;
}

const DeleteModal: React.FC<IDeleteModal> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { deleteLoading, deleteError } = useAppSelector(getProductCategoryState);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const handleDelete = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    dispatch(deleteProductCategoryAsyncThunk(id));
    if (deleteLoading === 'succeeded') {
      handleCloseModalDelete();
    }
  };

  return (
    <div>
      <IconButton color="error" aria-label="Delete" size="large" onClick={handleOpenModalDelete}>
        <DeleteForeverIcon />
      </IconButton>
      <Modal open={openModalDelete} onClose={handleCloseModalDelete} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Are you sure you want to delete this item?
          </Typography>
          {deleteLoading === 'failed' ? (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">{deleteError}</Alert>
            </Stack>
          ) : (
            <React.Fragment />
          )}
          <Stack direction="row" spacing={2} style={{ marginTop: '1.6rem' }}>
            <Button fullWidth color="info" variant="outlined" startIcon={<CancelIcon />} onClick={() => handleCloseModalDelete()}>
              Cancel
            </Button>
            {deleteLoading === 'pending' ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button fullWidth color="error" variant="outlined" startIcon={<DeleteForeverIcon />} onClick={handleDelete}>
                Delete
              </Button>
            )}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
