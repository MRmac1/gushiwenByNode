/**
 * 操作诗文数据的服务
 */
const mysql = require('mysql2/promise');
const moment = require('moment')
const config = require('../../config/config');

class Poet {
    async constructor() {
        this.connection = await mysql.createConnection(...config.database);
        connection.connect();
    }

    get() {

    }

    async save(result) {
        const now = moment().format('YYYY-MM-DD hh:mm:ss');;
        await this.connection.query('INSERT INTO gushiwen SET ?', {result:JSON.stringify(result), created_at: now, updated_at:now});
    }

    getCurrentDate() {

    }
}




export default Poet;
