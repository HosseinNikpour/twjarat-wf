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
    Header: "والد",
    accessor: "parent",
    type: "lookup",
    //notInGrid: true,
   // req: true,
  },
  
];


export const entityName = 'units';
export const pageHeader = 'واحد ها';

