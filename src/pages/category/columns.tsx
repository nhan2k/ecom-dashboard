import { TableColumn } from 'react-data-table-component/dist/src/DataTable/types';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

type DataRow = {
  id: number;
  title: string;
  metaTitle: string;
  content: string;
};
const columns: TableColumn<DataRow>[] = [
  {
    name: 'Name',
    minWidth: '30rem',
    cell: (row) => <p style={{ overflowWrap: 'break-word' }}>{row.title}</p>,
  },
  {
    cell: (row) => <img src={`${process.env.REACT_APP_API_PUBLIC_IMG}/${row.content}`} style={{ maxWidth: '5rem' }} />,
  },
  {
    button: true,
    cell: (row) => <UpdateModal id={row.id} />,
  },
  {
    button: true,
    cell: (row) => <DeleteModal id={row.id} />,
  },
];

export { columns };
