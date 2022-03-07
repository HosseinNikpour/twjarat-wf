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
    req: true,
    notInGrid: true,
  },
  {
    Header: "ارجاع به",
    accessor: "reciver",
    type: "lookup",
    //req: true,
    notInGrid: true,
  },
  {
    Header: "نوع گردش کار",
    accessor: "wf_type_id",
    render: (text, row) => (text) ? wf_type_options.find(a=>a.key==text).label : '',
  },
  {
    Header: "ارجاع به",
    accessor: "vw_reciver",
    //render: (text, row) => (text) ? reciver_options.find(a=>a.key==text).label : '',
  },
  {
    Header: "ضمائم",
    accessor: "file_attachment",
    type: "file",
    notInGrid: true,
   // req: true,
  },
  {
    Header: '',
    accessor: 'id',
    width: '50px',
    render: (text) => <a rel="noreferrer" target="_blank" href={'http://localhost:3101/report2?id=' + text}>
      <i className="fas fa-chart-line" title='گزارش'></i>
    </a>
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

export const wf_type_options=[{ label: 'تهیه وضعیت فعلی نواحی ، مناطق و شعب', value: 1, key: 1 },
{ label: 'دریافت درافت اولیه خوداظهاری اهداف', value: 2, key: 2 },
{ label: 'تهیه فایل مشتریان بالقوه در هر لاین کسب کاری', value: 3, key: 3 },
{ label: 'آموزش ', value: 4, key: 4 },
]

export const reciver_options=[{ label: 'مدیر امور استان های شمال کشور', value: 1, key: 1 },
{ label: 'مدیر امور استان های مرکز کشور', value: 2, key: 2 },
{ label: 'مدیر امور استان های جنوب کشور', value: 3, key: 3 },

]