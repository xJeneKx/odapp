const { readDataFeed } = require('./readDataFeed');

function getDataFeed(params) {
	Object.keys(params).forEach(key => {
		if (!params[key]) delete params[key];
	});
	
	return readDataFeed(params);
}

module.exports = {
	getDataFeed,
};
