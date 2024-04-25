/*jslint node: true */
'use strict';
const conf = require('ocore/conf.js');
const myWitnesses = require('ocore/my_witnesses.js');
require('./asset_metadata.js');

function replaceConsoleLog(){ 
	const clog = console.log;
	console.log = function(){
		Array.prototype.unshift.call(arguments, new Date().toISOString()+':');
		clog.apply(null, arguments);
	};
}

function relay(){
	console.log('starting');
	const network = require('ocore/network.js');
	if (conf.initial_peers)
		conf.initial_peers.forEach(function(url){
			network.findOutboundPeerOrConnect(url);
		});
}

replaceConsoleLog();
myWitnesses.readMyWitnesses(function(arrWitnesses){
	if (arrWitnesses.length > 0)
		return relay();
	console.log('will init witnesses', conf.initial_witnesses);
	myWitnesses.insertWitnesses(conf.initial_witnesses, relay);
}, 'ignore');
