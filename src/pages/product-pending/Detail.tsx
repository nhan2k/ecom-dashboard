import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getProductState, setOneProduct } from '@/features/redux/slices/product';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    dispatch(setOneProduct(id));
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { dataGetOne } = useAppSelector(getProductState);

  return (
    <div>
      <Button color="secondary" variant="outlined" onClick={handleOpen} startIcon={<VisibilityIcon />}>
        View
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Detail Product
          </Typography>
          <Typography variant="h6" component="h4">
            Meta Data : {dataGetOne?.metaTitle}
          </Typography>
          <Typography variant="h6" component="h4">
            Summary : {dataGetOne?.summary}
          </Typography>
          <Typography variant="h6" component="h4">
            Type : {dataGetOne?.type}
          </Typography>
          <Typography variant="h6" component="h4">
            publishedAt : {dataGetOne?.publishedAt}
          </Typography>
          <Typography variant="h6" component="h4">
            startsAt : {dataGetOne?.startsAt}
          </Typography>
          <Typography variant="h6" component="h4">
            endsAt : {dataGetOne?.endsAt}
          </Typography>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Product Category
          </Typography>
          {dataGetOne?.CategoryModels?.map((e: any, index: number) => {
            return (
              <Typography variant="h6" component="h4" key={index}>
                Name : {e.title}
              </Typography>
            );
          })}
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Product Reviews
          </Typography>
          {dataGetOne?.ProductReviewModels?.map((e: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Typography variant="h6" component="h4">
                  Title : {e.title}
                </Typography>
                <Typography variant="h6" component="h4">
                  Rating : {e.rating}
                </Typography>
              </React.Fragment>
            );
          })}
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Product Tag
          </Typography>
          {dataGetOne?.TagModels?.map((e: any, index: number) => {
            return (
              <Typography variant="h6" component="h4" key={index}>
                Title : {e.title}
              </Typography>
            );
          })}
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Product Meta
          </Typography>
          {dataGetOne?.ProductMetaModels?.map((e: any, index: number) => {
            return (
              <Typography variant="h6" component="h4" key={index}>
                {e.key} : {e.content.split(',').map((e: any) => e)}
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default DetailModal;
