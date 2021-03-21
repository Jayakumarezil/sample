/* Module for database operations */
module.exports.openDB = function(dbhostname, dbname, port, options, mng,asy,callback)
{
		var db = {};
		var connentionString = '';
		if(options == '')
		{
			connentionString = 'mongodb://' + dbhostname + ':' + port + '/' + dbname;
			
		}
		else
		{
			connentionString = 'mongodb://' + dbhostname + ':' + port + '/' + dbname + '?' + options + '&';
		}
		db = mng.connect(connentionString, function(err){
		var result = 0;
		if(err){
			result = -1000;
			console.log('ERROR: Failed to connet to MongoDB');
			console.log(err);
		}
		else
		{
			result = 0;
		}
		callback(result);
	});
}
/* close mongodb connection */
module.exports.closeDB = function(mng,callback){
	mng.connection.close(function (){
		mng.disconnect();
		callback();
	});
}