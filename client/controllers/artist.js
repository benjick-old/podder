Template.artist.helpers({
	artist: function () {
		return Session.get('artist');
	},
	loading: function() {
		return Session.get('loading');
	}
});


Template.artist.onRendered(function() {
	Meteor.call('getArtist', Router.current().params._cid, function (error, result) {
		Session.set('artist', result);
		console.log(result)
		Session.set('loading', false);
	});
	Session.set('loading', true);
});