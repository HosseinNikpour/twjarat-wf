import { message, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";

import { columns, entityName } from "./statics";
import { deleteItem, getItems, insertItem, updateItem } from "../../api/index";
import * as Static from "../static";
import TableContainer from "../../components/TableContainer";

const Unit = () => {
  const GridRef = useRef(null);

  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [obj, setObj] = useState({});
  const [mode, setMode] = useState("");
  const [permission_id] = useState(5);
  const [parent_options, setParent_options] = useState([]);

  const getData = () => {
    setMode("");
    //   GridRef.current.scrollIntoView({ behavior: 'smooth' });
    Promise.all([getItems(entityName)]).then((response) => {
      setData(response[0].data);
      setParent_options(
        response[0].data.map((a) => {
          return { ...a, key: a.id, label: a.title, value: a.id };
        }),
      );
    });
    setObj({});
  };
  useEffect(() => {
    getData();
  }, []);

  const btnNewClick = () => {
    setMode("new");
    setObj({});
    // BoxRef.current.scrollIntoView({ behavior: 'smooth' });
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
      //   BoxRef.current.scrollIntoView({ behavior: 'smooth' });
      alert("لطفا موارد الزامی را وارد کنید");
    } else {
      if (mode === "new") {
        insertItem(obj, entityName)
          .then((response) => {
            if (response.data.type !== "Error") {
              message.success("آیتم با موفقیت ذخیره شد");
              //alert('آیتم با موفقیت ذخیره شد');
              getData();
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
    deleteItem(item.id, entityName).then(() => {
      getData();
    });
  };

  const displayBtnClick = (item) => {
    setMode("display");
    // BoxRef.current.scrollIntoView({ behavior: 'smooth' });
    setObj(item);
  };
  const editBtnClick = (item) => {
    setMode("edit");
    //  BoxRef.current.scrollIntoView({ behavior: 'smooth' });
    setObj(item);
  };
  const cancelBtnClick = () => {
    setMode("");
    //   GridRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{ paddingTop: "15px" }}>
        <div className="col-6">
          <div className="card ">
            <div className="card-header border-0">
              <div className="row align-items-center" ref={GridRef}>
                <div className="col">
                  <h3 className="mb-0">واحد ها</h3>
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
                editClick={permission_id > 2 ? editBtnClick : undefined}
              />
            </div>
          </div>
        </div>

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
                    <div className="col">
                      <div className="form-group">
                        <label className="form-control-label">
                          عنوان فعالیت
                        </label>
                        <label className="req-label">*</label>
                        <input
                          id="title"
                          className={errors.title
                            ? "form-control error-control"
                            : "form-control"}
                          type="text"
                          value={obj.title}
                          onChange={(e) =>
                            setObj({ ...obj, title: e.target.value })}
                          disabled={mode === "display"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label className="form-control-label">والد</label>

                        <Select
                          id="parent"
                          className={errors.parent_id
                            ? "form-control error-control"
                            : "form-control"}
                          {...Static.selectDefaultProp}
                          disabled={mode === "display"}
                          options={parent_options}
                          value={obj.parent_id}
                          onSelect={(values) =>
                            setObj({ ...obj, parent_id: values })}
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

export default Unit;
