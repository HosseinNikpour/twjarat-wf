const fs = require('fs');
//var jwt = require('jsonwebtoken');

const saveFile = (file, entityName, fieldName, title, createNew) => {
    let dir = `.\\Docs\\files\\${entityName}\\${fieldName}`;
    if (!fs.existsSync(dir))
        fs.mkdir(dir, { recursive: true }, e => {
            if (e)
                console.error(e);
        });

    let fileName = `${dir}\\${title}.${file.name.substr(file.name.lastIndexOf('.') + 1)}`
    fs.writeFileSync(fileName, file.data);//, () => {
    return (fileName.replace('.\\Docs', ''));


}

const queryGen = (name, type, row, repeate) => {

    Object.keys(row).forEach(key => {
        if (key.endsWith('_id')) {
            let x = key.replace('_id', '');
            delete row[x];
        }
    });

    if (type == 'insert') {
        let insertQuery = `INSERT INTO ${name}(`, insertValues = '';
        Object.keys(row).forEach(key => {

            if (!key.startsWith('f_') && !key.startsWith('vw_') && (!repeate || key != repeate)) {
                insertQuery += key + ',';

                if (typeof (row[key]) == 'number' || typeof (row[key]) == 'boolean')
                    insertValues += `${row[key]},`;
              //  else if (Array.isArray(row[key]))
                 //   insertValues += `'{${row[key]}}',`;
                else if (!row[key]) {
                    insertValues += `null,`;
                }
                else {

                    insertValues += `'${row[key]}',`
                }
            }
        })

        insertQuery = insertQuery.slice(0, -1) + ") ";
        insertValues = insertValues.slice(0, -1);
        if (repeate) {
            insertQuery = insertQuery.replace(')', `,${repeate})`);
            let newInsertValue = '';
            row[repeate].forEach(e => {
                newInsertValue += `(${insertValues},${e}),`;
            });
            newInsertValue = newInsertValue.slice(0, -1);
            insertQuery = insertQuery + ' Values' + newInsertValue;
        }
        else
            insertQuery = insertQuery + ' Values(' + insertValues + ')';
        return insertQuery;
    }
    else if (type == 'update') {
      let  updateQuery = `UPDATE ${name} SET `
        Object.keys(row).forEach(key => {
            //   console.log(`${key}   ${!row[key]}    ${key.startsWith('file_')}`)
            if (!key.startsWith('f_') && key != 'id' && !key.startsWith('vw_')) {

                if (typeof (row[key]) == 'number' || typeof (row[key]) == 'boolean')
                    updateQuery += `${key} =${row[key]},`;
               // else if (Array.isArray(row[key]))
                  //  updateQuery += `${key} ='{${row[key]}}',`;
                else if (!row[key]) {
                    if (!key.startsWith('file_'))
                        updateQuery += `${key} = null,`;
                }
                else {
                    if (row[key] === '**d**')
                        updateQuery += `${key} = null,`;
                    else
                        updateQuery += `${key} ='${row[key]}',`;
                }
            }
        })

        updateQuery = updateQuery.slice(0, -1);
        updateQuery = updateQuery + ` WHERE  id=${row['id']}`
        return updateQuery;
    }
}

const returnContractIds = (userId, token) => {

    // -1 ==> show nothing
    // 0 ==>show All


    if (!userId || !token) return -1;

    let user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) return -2;

    if (user.id != userId) return -3;
    if (user.role_id > 3) return 0;
    let field = '';
    switch (user.role_id) {
        case 2:
            field = 'engineer_user_id'
            break;
        case 1:
            field = 'contractor_user_id'
            break;
        case 3:
            field = 'manager_user_id'
            break;

        default:
            break;
    }
    let query = `SELECT id FROM conract where ${field} = ${user.id} `;
    // console.log(query)
    pool.query(query)
        .then((results) => {
            //    console.log(results.rows);
            return results.rows.toString();
        })
        .catch((err) => {
            return -5;
        });
}
module.exports = {
    saveFile,
    queryGen,
    returnContractIds
}