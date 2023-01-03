import { TableColumn } from 'react-data-table-component/dist/src/DataTable/types';
import DetailModal from './Detail';
import { shopMap } from '@features/redux/slices/product/enum';
import ApproveModal from './ApproveModal';

type DataRow = {
  title: number;
  discount: number;
  price: number;
  quantity: number;
  shop: number;
  summary: string;
  type: number;
  publishedAt: string;
  startsAt: string;
  endsAt: string;
  image: string;
  CategoryModels: {
    title: string;
  };
  ProductReviewModel: {
    title: string;
    rating: number;
  };
  ProductMetaModel: {
    key: string;
    content: string;
  };
  TagModel: {
    title: string;
  };
  id: number;
};
const columns: TableColumn<DataRow>[] = [
  {
    name: 'Product Name',
    minWidth: '30rem',
    cell: (row) => <p style={{ overflowWrap: 'break-word' }}>{row.title}</p>,
  },
  {
    cell: (row) => <img src={`${process.env.REACT_APP_API_PUBLIC_IMG}/${row.image}`} style={{ maxWidth: '5rem' }} />,
  },
  {
    name: 'Price',
    selector: (row) => `$${row.price}`,
    maxWidth: '0.5rem',
  },
  {
    name: 'Discount',
    selector: (row) => `$${row.discount}`,
    maxWidth: '0.5rem',
  },
  {
    name: 'Quantity',
    selector: (row) => row.quantity,
    maxWidth: '0.5rem',
  },
  // {
  //   name: 'Publicy',
  //   selector: (row) => String(shopMap.get(row.shop)),
  // },
  {
    button: true,
    cell: (row) => <DetailModal id={row.id} />,
  },
  {
    button: true,
    cell: (row) => <ApproveModal id={row.id} />,
  },
];

export { columns };