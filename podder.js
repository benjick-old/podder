Pods = new Mongo.Collection('pods');
Casts = new Mongo.Collection('casts');


UI.registerHelper('arrayify',function(obj){
  result = [];
  for (var key in obj) result.push({name:key,value:obj[key]});
  return result;
});

UI.registerHelper('slugger', function(string) {
	if(string) {
		var result = string.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
		return result;
	}
})