import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getProductState, setOneProduct } from '@/features/redux/slices/product';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Rating from './Rating';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxWidth: '50rem',
};

interface IDetailModal {
  id: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const DetailModal: React.FC<IDetailModal> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    dispatch(setOneProduct(id));
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { dataGetOne } = useAppSelector(getProductState);

  const average = dataGetOne?.ProductMetaModels?.reduce((accumulator: number, currentValue: number, currentIndex: number, array: any[]) => (accumulator + currentValue) / array.length, 0);

  return (
    <div>
      <Button color="secondary" variant="outlined" onClick={handleOpen} startIcon={<VisibilityIcon />}>
        View
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h2" component="h2">
                Product
              </Typography>
              <Item>
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
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h2" component="h2">
                Category
              </Typography>
              <Item>
                {dataGetOne?.CategoryModels?.map((e: any, index: number) => {
                  return (
                    <Typography variant="h6" component="h4" key={index}>
                      Name : {e.title}
                    </Typography>
                  );
                })}
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h2" component="h2">
                Rating
              </Typography>
              <Item>
                <Typography variant="h6" component="h4">
                  <Rating value={average} />
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h2" component="h2">
                Meta
              </Typography>
              <Item>
                {dataGetOne?.ProductMetaModels?.map((e: any, index: number) => {
                  return (
                    <Typography variant="h6" component="h4" key={index}>
                      {e.key} : {e.content.split(',').map((e: any) => e)}
                    </Typography>
                  );
                })}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailModal;
