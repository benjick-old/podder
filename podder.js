Pods = new Mongo.Collection('pods');
Casts = new Mongo.Collection('casts');


UI.registerHelper('arrayify',function(obj){
	result = [];
	for (var key in obj) result.push({name:key,value:obj[key]});
	return result;
});

UI.registerHelper('round',function(float){
	return Math.round(float);
});

UI.registerHelper('slugger', function(string) {
	if(string) {
		var result = string.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
		return result;
	}
});

UI.registerHelper('formatTime',function(seconds){
	var sec_num = parseInt(seconds, 10); // don't forget the second param
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	var time    = hours+':'+minutes+':'+seconds;
	return time;
});