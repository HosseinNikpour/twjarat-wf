//import moment from 'moment-jalaali'
export const columns = [
  {
    Header: "شناسه",
    accessor: "id",
    notInGrid: true,
    notInForm: true,
    type: "serial",
  },
  {
    Header: "عنوان فعالیت",
    accessor: "title",
    type: "text",
    req: true,
    //notInGrid: true,
  },
  {
    Header: "نوع گردش کار",
    accessor: "wf_type",
    type: "lookup",
    //req: true,
    notInGrid: true,
  },
  {
    Header: "ارجاع به",
    accessor: "reciver_id",
    type: "lookup",
    //req: true,
    notInGrid: true,
  },
  {
    Header: "ضمائم",
    accessor: "file_attachment",
    type: "file",
    notInGrid: true,
   // req: true,
  },
  {
    Header: "توضیحات",
    accessor: "description",
    type: "note",
    notInGrid: true,
  },
];


export const entityName = 'wf_item';
export const pageHeader = ' گردش کار';

