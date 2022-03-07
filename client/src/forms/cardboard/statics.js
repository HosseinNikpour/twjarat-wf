import moment from 'moment-jalaali'
export const columns = [

  {
    Header: "عنوان فعالیت",
    accessor: "title",
  },
  {
    Header: "فرستنده",
    accessor: "vw_sender",
  },
  {
    Header: "تاریخ ارجاع",
    accessor: "create_date",
    render: (text, row) => (text) ? moment(text).format('jYYYY/jMM/jDD') : '',
  },
];


export const entityName = 'task';
export const pageHeader = 'کارتابل';

