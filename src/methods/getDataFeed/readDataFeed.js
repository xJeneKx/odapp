const { readDataFeedValueByParams } = require('ocore/data_feeds');

function readDataFeed(params) {
	return new Promise(resolve => {
		readDataFeedValueByParams(params, 1e15, 'all_unstable', function (err, value) {
			if (err) {
				return resolve({
					error: err
				});
			}
			
			return resolve(value);
		});
	});
}

module.exports = {
	readDataFeed,
};
