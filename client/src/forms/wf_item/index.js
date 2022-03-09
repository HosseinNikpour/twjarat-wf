import { message, Select } from "antd";
import React, { useEffect, useRef, useState, useCallback } from "react";

import { columns, entityName, wf_type_options } from "./statics";
import { deleteItem, getItems, insertItem, updateItem } from "../../api/index";
import * as Static from "../static";
import TableContainer from "../../components/TableContainer";

const WfItem = (props) => {
  const BoxRef = useRef(null),
    GridRef = useRef(null);

  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [obj, setObj] = useState({});
  const [mode, setMode] = useState("");
  const [
    permission_id, // , setPermission_id
  ] = useState(2);
  const unit_id = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).unit_id
    : undefined;
  const [reciver_options, setReciver_options] = useState([]);

  const getData = useCallback(() => {
    setMode("");
    GridRef.current.scrollIntoView({ behavior: "smooth" });
    Promise.all([
      getItems(entityName),
      getItems("unit", { where: `  WHERE t.parent_id =${unit_id}` }),
    ]).then((response) => {
      setData(response[0].data);
      setReciver_options(
        response[1].data.map((a) => {
          return { ...a, key: a.id, label: a.title, value: a.id };
        })
      );
    });
    setObj({});
  }, [unit_id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const btnNewClick = () => {
    setMode("new");
    BoxRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const saveBtnClick = () => {
    let err = {};
    columns
      .filter((a) => a.req)
      .forEach((a) => {
        if (a.type === "lookup") {
          err[a.accessor + "_id"] = obj[a.accessor + "_id"] ? false : true;
        } else err[a.accessor] = obj[a.accessor] ? false : true;
      });

    if (Object.values(err).filter((a) => a).length > 0) {
      setErrors(err);
      BoxRef.current.scrollIntoView({ behavior: "smooth" });
      alert("لطفا موارد الزامی را وارد کنید");
    } else {
      var formData = new FormData();
      if (obj.f_file_attachment) {
        formData.append("file_attachment", obj.f_file_attachment);
      }
      formData.append("data", JSON.stringify(obj));
      if (mode === "new") {
        insertItem(formData, entityName, "multipart/form-data")
          .then((response) => {
            if (response.data.type !== "Error") {
              let tasks = {
                parent_id: response.data[0].id,
                title: `بررسی ${obj.title}`,
                sender_id: 1,
                reciver_id: obj.reciver_id,
              };
              insertItem(tasks, "task")
                .then((response1) => {
                  if (response1.data.type !== "Error") {
                    message.success("آیتم با موفقیت ذخیره شد");
                    //alert('آیتم با موفقیت ذخیره شد');
                    getData();
                  } else {
                    //alert('خطا در ذخیره سازی اطلاعات');
                    message.error("خطا در ذخیره سازی اطلاعات");
                    console.log(response1.data.message);
                  }
                })
                .catch((error) => {
                  message.error("بروز خطا در سیستم");
                  console.log(error);
                });
            } else {
              //alert('خطا در ذخیره سازی اطلاعات');
              message.error("خطا در ذخیره سازی اطلاعات");
              console.log(response.data.message);
            }
          })
          .catch((error) => {
            message.error("بروز خطا در سیستم");
            console.log(error);
          });
      } else if (mode === "edit") {
        updateItem(obj, entityName)
          .then((response) => {
            if (response.data.type !== "Error") {
              message.success("آیتم با موفقیت ذخیره شد");
              //alert('آیتم با موفقیت ذخیره شد');
              getData();
            } else {
              // alert('خطا در ذخیره سازی اطلاعات');
              message.error("خطا در ذخیره سازی اطلاعات");
              console.log(response.data.message);
            }
          })
          .catch((error) => {
            message.error("بروز خطا در سیستم");
            console.log(error);
          });
      }
    }
  };
  const deleteBtnClick = (item) => {
    deleteItem(item.id, entityName).then((a) => {
      getData();
    });
  };
  const displayBtnClick = (item) => {
    setMode("display");
    BoxRef.current.scrollIntoView({ behavior: "smooth" });
    setObj(item);
  };
  // const editBtnClick = (item) => {
  //     setMode('edit');
  //     //   BoxRef.current.scrollIntoView({ behavior: 'smooth' });
  //     setObj(item);
  // }
  const cancelBtnClick = () => {
    setMode("");
    //   GridRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{ paddingTop: "15px" }}>
        <div className="col">
          <div className="card ">
            <div className="card-header border-0">
              <div className="row align-items-center" ref={GridRef}>
                <div className="col">
                  <h3 className="mb-0">گردش کار</h3>
                </div>
                {permission_id > 1 && (
                  <div className="col text-right">
                    <button
                      className="btn btn-icon btn-primary"
                      type="button"
                      onClick={btnNewClick}
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-plus"></i>
                      </span>
                      <span className="btn-inner--text">مورد جدید</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="table-responsive">
              <TableContainer
                columns={columns.filter((a) => !a.notInGrid)}
                data={data}
                scroll={{ y: 500, x: 500 }}
                displayClick={displayBtnClick}
                deleteClick={permission_id > 3 ? deleteBtnClick : undefined}
                editClick={undefined}
              />
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
                    <h3 className="mb-0">
                      {" "}
                      {mode === "new"
                        ? "اضافه کردن آیتم جدید"
                        : mode === "edit"
                        ? "ویرایش آیتم"
                        : "مشاهده آیتم"}
                    </h3>
                    <hr></hr>
                  </div>
                </div>
              </div>
              <div className="card-body" style={{ marginTop: "-50px" }}>
                <form>
                  <div className="row">
                    <div className="col-3">
                      <div className="form-group">
                        <label className="form-control-label">
                          نوع گردش کار
                        </label>
                        <label className="req-label">*</label>
                        <Select
                          id="wf_type"
                          className={
                            errors.wf_type_id
                              ? "form-control error-control"
                              : "form-control"
                          }
                          {...Static.selectDefaultProp}
                          disabled={mode === "display"}
                          options={wf_type_options}
                          value={obj.wf_type_id}
                          onSelect={(values) =>
                            setObj({ ...obj, wf_type_id: values })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="form-control-label">
                          عنوان فعالیت
                        </label>
                        <label className="req-label">*</label>
                        <input
                          id="title"
                          className={
                            errors.title
                              ? "form-control error-control"
                              : "form-control"
                          }
                          type="text"
                          value={obj.title}
                          onChange={(e) =>
                            setObj({ ...obj, title: e.target.value })
                          }
                          disabled={mode === "display"}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label className="form-control-label">ارجاع به</label>
                        <label className="req-label">*</label>
                        <Select
                          id="reciver_id"
                          className={
                            errors.reciver_id
                              ? "form-control error-control"
                              : "form-control"
                          }
                          {...Static.selectDefaultProp}
                          disabled={mode === "display"}
                          options={reciver_options}
                          value={obj.reciver_id}
                          onSelect={(values) =>
                            setObj({ ...obj, reciver_id: values })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <div className="form-group">
                        <label className="form-control-label">ضمائم</label>
                        <label className="req-label">*</label>
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

                        <input
                          id="description"
                          className={
                            errors.description
                              ? "form-control error-control"
                              : "form-control"
                          }
                          type="text"
                          value={obj.description}
                          onChange={(e) =>
                            setObj({ ...obj, description: e.target.value })
                          }
                          disabled={mode === "display"}
                        />
                      </div>
                    </div>
                  </div>
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

export default WfItem;
