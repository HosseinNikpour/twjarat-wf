const pool = require('../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../functions/index');
const name = "wf_item";

router.get(`/`, function (req, res) {

    let query = `SELECT t.* ,u.title as vw_reciver
                        FROM ${name} as t left join unit u on t.reciver_id=u.id                    
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
    let qq = `Select nextval(pg_get_serial_sequence('${name}', 'id')) as current_identity`
    // let qq=`SELECT IDENT_CURRENT ('${name}.id') as current_identity`
    pool.query(qq).then((re) => {
        let idd = re.rows[0].current_identity
        let data = JSON.parse(req.body.data);
        let files = req.files;
        // console.log(files.file_attachment);
        let file_attachment = files && files.file_attachment ? func.saveFile(files.file_attachment, name, 'attachment', idd) : '';
        data["file_attachment"] = file_attachment;
        let query = func.queryGen(name, 'insert', data);
        query+=' RETURNING id;'
       // console.log(query)
        //  let query = func.queryGen(name, 'insert', req.body);

        pool.query(query).then((results) => {
            return res.send(results.rows);
        }).catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
    }).catch((err) => {
        return res.send({ type: "Error", message: err.message })
    });
});
router.put('/:id', function (req, res) {
    let data = JSON.parse(req.body.data);
    let files = req.files;
    // console.log(files.file_attachment);
    let file_attachment = files && files.file_attachment ? func.saveFile(files.file_attachment, name, 'attachment', data.letter_shenase.replaceAll('/', '-').replaceAll('/', '-')) : '';
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