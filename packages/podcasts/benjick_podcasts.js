// Write your package code here!

Podcasts = {};

Podcasts.search = function(term, country) {
	var options = {
		params: {
			term: encodeURIComponent(term).replace(/%20/g, "+"),
			country: country || "us",
			media: 'podcast',
			limit: 12
		}
	}

	var result = HTTP.get('https://itunes.apple.com/search', options);

	//var array = Object.keys(result.results).map(function (key) {return result.results[key]});

	return result.data.results;
	// https://itunes.apple.com/search?parameterkeyvalue
}

Podcasts.lookup = function(artistId) {
	var options = {
		params: {
			id: artistId,
			entity: 'podcast',
			sort: 'recent'
		}
	}

	var result = HTTP.get('https://itunes.apple.com/lookup', options);

	return result.data.results;
}

Podcasts.single = function(id) {
	var options = {
		params: {
			id: id
		}
	}

	var result = HTTP.get('https://itunes.apple.com/lookup', options);
	var result = result.data.results[0];
	result.feed = Scrape.feed(result.feedUrl);
	return result;
	console.log(result);
}