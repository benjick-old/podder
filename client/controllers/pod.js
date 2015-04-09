Template.pod.helpers({
	pod: function () {
		Meteor.call('getPod', Router.current().params._cid, function (error, result) {
			console.log(result);
			Session.set('pod', result);
			Session.set('loading', false);
		});
		return Session.get('pod');
	},
	progress: function() {
		return Session.get('progress');
	},
	playing: function() {
		return Session.get('playing');
	},
	loading: function() {
		return Session.get('loading');
	}
});

Template.pod.events({
	'click .play': function () {
		console.log(Meteor.userId() + '|' + this.link);
		if(Meteor.userId()) {
			var timelookup = Casts.findOne(Meteor.userId() + '|' + this.link);
		}
		player.src = this.link;
		player.load();
		if (typeof(timelookup) !== "undefined") {
			player.currentTime = timelookup.current;
		}
		console.log(timelookup);
		player.play();
		Session.set('playing', true);
	},
	'click .playerPause': function() {
		Session.set('playing', false);
		player.pause();
	},
	'click .playerPlay': function() {
		Session.set('playing', true);
		player.play();
	}

});

Template.pod.onRendered(function() {
	Session.set('loading', true);
	player = document.getElementById("podcastPlayer");
	player.addEventListener("timeupdate", function() {
		var progress = player.currentTime / player.duration * 100;
		Session.set('progress', progress);
		if(Meteor.userId()) {
			Casts.upsert(Meteor.userId() + '|' + player.src, 
				{$set: {
					current: Math.floor(player.currentTime),
					duration: Math.ceil(player.duration),
					progress: progress
				}}
			)
		}
	});
});