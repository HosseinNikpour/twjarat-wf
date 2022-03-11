import { Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment-jalaali";

import { columns, entityName } from "./statics";
import { getItems } from "../../api/index";
import * as Static from "../static";
import TableContainer from "../../components/TableContainer";

const Cardboard = (props) => {
  const BoxRef = useRef(null),
    GridRef = useRef(null);

  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [obj, setObj] = useState({});
  const [mode, setMode] = useState("");
  const [status_options, setStatus_options] = useState([]);
  const [tableDate, setTableDate] = useState([]);
  const [unit, setUnit] = useState([]);
  //  const unit_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).unit_id : undefined;

  const getData = () => {
    setMode("");
    GridRef.current.scrollIntoView({ behavior: "smooth" });
    Promise.all([getItems(entityName), getItems("unit")]).then((response) => {
      setData(response[0].data);
      setStatus_options([
        { key: 1, label: "تایید", value: 1 },
        { key: 2, label: "عدم تایید", value: 2 },
      ]);
      setUnit(response[1].data);
      // let xx=[];
      // debugger;
      // response[1].data.filter(a=>a.parent_id==obj.sender_id).forEach(a => {
      //     xx.push({reciver_id:a.id,reciver_name:a.title})
      // });
      // setTableDate(xx);
    });
    setObj({});
  };
  useEffect(() => {
    getData();
  }, []);

  const displayBtnClick = (item) => {
    setMode("edit");
    BoxRef.current.scrollIntoView({ behavior: "smooth" });
    setObj(item);
    let xx = unit.filter((a) => a.parent_id === item.reciver_id);
    let dt = [];
    xx.forEach((a) => {
      dt.push({ reciver_id: a.id, reciver_name: a.title });
    });
    setTableDate(dt);
  };
  const cancelBtnClick = () => {
    setMode("");
    GridRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const setTableFields = (i, fieldName, value) => {
    let dt = tableDate;
    dt[i][fieldName] = value;
    setTableDate(dt);
  };

  const saveBtnClick = () => {
    let err = {};
    err["status_id"] = obj["status_id"] ? false : true;

    if (Object.values(err).filter((a) => a).length > 0) {
      setErrors(err);
      BoxRef.current.scrollIntoView({ behavior: "smooth" });
      alert("لطفا موارد الزامی را وارد کنید");
    }

    //else {
    //     obj.deadline = moment(obj.letter_date).add(30, 'days');
    //     var formData = new FormData();
    //     if (obj.f_file_attachment) formData.append("file_attachment", obj.f_file_attachment);
    //     formData.append("data", JSON.stringify(obj));

    //     if (mode === 'new') {
    //         insertItem(formData, entityName, 'multipart/form-data').then(response => {
    //             if (response.data.type !== "Error") {
    //                 let rr = { id: obj.project_id, project_state_id: 8 };
    //                 updateItem(rr, "request/changeValues").then(response1 => {
    //                     if (response1.data.type !== "Error") {
    //                         message.success('آیتم با موفقیت ذخیره شد');
    //                         getData();
    //                     }
    //                 })
    //             }
    //             else {
    //                 message.error('خطا در ذخیره سازی اطلاعات');
    //                 console.log(response.data.message);
    //             }
    //         }).catch((error) => {
    //             message.error('بروز خطا در سیستم');
    //             console.log(error)
    //         });
    //     }
    //     else if (mode === 'edit') {
    //         //delete obj.project_id;
    //         updateItem(formData, entityName, 'multipart/form-data').then(response => {
    //             if (response.data.type !== "Error") {
    //                 message.success('آیتم با موفقیت ذخیره شد');
    //                 //alert('آیتم با موفقیت ذخیره شد');
    //                 getData();
    //             }
    //             else {
    //                 // alert('خطا در ذخیره سازی اطلاعات');
    //                 message.error('خطا در ذخیره سازی اطلاعات');
    //                 console.log(response.data.message);
    //             }
    //         }).catch((error) => {
    //             message.error('بروز خطا در سیستم');
    //             console.log(error)
    //         });
    //     }
    // }
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{ paddingTop: "15px" }} ref={GridRef}>
        <div className="col">
          <div className="card ">
            <div className="card-header border-0">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="mb-0">کارتابل</h3>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <TableContainer
                columns={columns.filter((a) => !a.notInGrid)}
                data={data}
                //  scroll={{ y: 500, x: 500 }}
                displayClick={displayBtnClick}
              />{" "}
              {/* deleteClick={permission_id > 3 ? deleteBtnClick : undefined} */}
              {/* editClick={permission_id > 2 ? editBtnClick : undefined} */}
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ paddingTop: "15px" }} ref={BoxRef}>
        {mode !== "" && (
          <div className="col">
            <div className="card ">
              <div className="card-header border-0">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{obj.title}</h3>
                    <hr></hr>
                  </div>
                </div>
              </div>
              <div className="card-body" style={{ marginTop: "-50px" }}>
                <form>
                  <div className="border-box">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label className="form-control-label">فرستنده</label>
                          <input
                            className="form-control"
                            type="text"
                            value={obj.vw_sender}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label className="form-control-label">
                            تاریخ ارسال
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={moment(obj.create_date).format(
                              "jYYYY/jMM/jDD"
                            )}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label className="form-control-label">
                            فایل ارسالی
                          </label>
                          {obj.sender_file_attachment && (
                            <div>
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={obj.sender_file_attachment}
                              >
                                مشاهده فایل
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label className="form-control-label">توضیحات</label>
                          <textarea
                            rows={3}
                            className="form-control"
                            value={obj.sender_description}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <label className="form-control-label">وضعیت</label>
                      <label className="req-label">*</label>
                      <Select
                        id="project"
                        className={
                          errors.status_id
                            ? "form-control error-control"
                            : "form-control"
                        }
                        {...Static.selectDefaultProp}
                        disabled={mode === "display"}
                        options={status_options}
                        value={obj.status_id}
                        onSelect={(values) =>
                          setObj({ ...obj, status_id: values })
                        }
                      />
                    </div>
                  </div>
                  {obj.status_id === 1 && (
                    <div className="row">
                      <div className="col">
                        <table
                          className="table table-striped table-bordered"
                          style={{ marginTop: "50px" }}
                        >
                          <thead>
                            <tr>
                              <td width={"20%"}>مدیریت</td>
                              <td width={"20%"}>فایل ضمیمه</td>
                              <td>توضیحات</td>
                            </tr>
                          </thead>
                          <tbody>
                            {tableDate.map((a, i) => {
                              return (
                                <tr>
                                  <td>{a.reciver_name}</td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="file"
                                      onChange={(e) =>
                                        setTableFields(
                                          i,
                                          "f_file_attachment",
                                          e.target.files[0]
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="text"
                                      onChange={(e) =>
                                        setTableFields(
                                          i,
                                          "description",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {obj.status_id > 1 && (
                    <div className="row">
                      <div className="col-4">
                        <div className="form-group">
                          <label className="form-control-label">ضمائم</label>

                          {mode !== "display" && (
                            <input
                              id="file_attachment"
                              className={
                                errors.file_attachment
                                  ? "form-control error-control"
                                  : "form-control"
                              }
                              type="file"
                              onChange={(e) =>
                                setObj({
                                  ...obj,
                                  f_file_attachment: e.target.files[0],
                                })
                              }
                              disabled={mode === "display"}
                            />
                          )}
                          {obj.file_attachment && (
                            <div>
                              <a
                                rel="noreferrer"
                                target="_blank"
                                href={obj.file_attachment}
                              >
                                مشاهده فایل
                              </a>
                              {mode === "edit" && (
                                <i
                                  className="far fa-trash-alt"
                                  style={{ marginRight: "8px" }}
                                  onClick={() =>
                                    setObj({ ...obj, file_attachment: false })
                                  }
                                ></i>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label className="form-control-label">توضیحات</label>

                          <textarea
                            rows={3}
                            className={
                              errors.description
                                ? "form-control error-control"
                                : "form-control"
                            }
                            value={obj.description}
                            onChange={(e) =>
                              setObj({ ...obj, description: e.target.value })
                            }
                            disabled={mode === "display"}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {mode !== "display" && (
                    <div className="row">
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={saveBtnClick}
                        >
                          ذخیره
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={cancelBtnClick}
                        >
                          انصراف
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cardboard;
