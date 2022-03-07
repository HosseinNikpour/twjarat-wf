const pool = require('../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../functions/index');

const name = "task";

router.get(`/`, function (req, res) {

    let query = `SELECT t.* ,u.title as vw_sender,wf.file_attachment as sender_file_attachment,wf.description as sender_description
                        FROM ${name} as t left join unit as u on t.sender_id=u.id 
                                          left join wf_item as wf on t.parent_id=wf.id
                        where t.status_id is null                   
                        order by t.id desc  `;
    pool.query(query).then((results) => {
        return res.send(results.rows);
    })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});

router.get(`/:key`, function (req, res) {
    let query = `SELECT * FROM ${name} where id = ${req.params.key} `;

    pool.query(query).then((results) => {
        return res.send(results.rows);
    })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});

router.post('/', function (req, res) {
    let data = req.body;
    
    if (typeof data.reciver_id != 'object')
        data.reciver_id = [data.reciver_id]
 //console.log(data.reciver_id)
    let query = func.queryGen(name, 'insert', data, 'reciver_id');
  //  console.log(query)
    pool.query(query).then((results) => {
        return res.send(results.rows);
    }).catch((err) => {
        return res.send({ type: "Error", message: err.message })
    });

});

router.put('/:id', function (req, res) {
    let data = JSON.parse(req.body.data);
    let files = req.files;
    // console.log(files.file_attachment);
    let file_attachment = files && files.file_attachment ? func.saveFile(files.file_attachment, name, 'attachment', data.id) : '';
    data["file_attachment"] = data['file_attachment'] == false ? '**d**' : file_attachment;
    let query = func.queryGen(name, 'update', data);
    // let query = func.queryGen(name, 'update', req.body);
    pool.query(query).then((results) => {
        return res.send(results.rows);
    }).catch((err) => {
        return res.send({ type: "Error", message: err.message })
    });
});

router.delete('/:id', function (req, res) {
    let query = `delete from ${name} WHERE  id=${req.params.id};    `;
    //    console.log(query);
    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});

module.exports = router;
