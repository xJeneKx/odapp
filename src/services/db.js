const _db = require('ocore/db');
const sqlite3 = require('sqlite3');
const pathToDB = require('ocore/desktop_app.js').getAppDataDir() + '/byteball.sqlite';

const db = new sqlite3.Database(pathToDB, sqlite3.OPEN_READONLY);

function query(sql, params, cb) {
	if (typeof params === 'function') {
		cb = params;
		params = [];
	}
	
	if (!cb) {
		return new Promise((resolve) => {
			query(sql, params, (rows) => {
				resolve(rows);
			});
		});
	}
	
	db.all(sql, ...params, (err, rows) => {
		cb(rows);
	});
}

function In(arr) {
	return `${arr.map(() => '?').join(',')}`;
}

module.exports = {
	query,
	In,
	getUnixTimestamp: _db.getUnixTimestamp,
};
