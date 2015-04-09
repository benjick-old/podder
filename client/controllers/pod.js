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
	progressHuman: function() {
		return Session.get('progressHuman');
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
		console.log(Meteor.userId() + '|' + this.image);
		if(Meteor.userId()) {
			var timelookup = Casts.findOne(Meteor.userId() + '|' + this.image);
		}
		player.src = this.image;
		player.load();
		if (typeof(timelookup) !== "undefined") {
			player.currentTime = timelookup.current;
		}
		player.play();
		Session.set('playing', true);
	},
	'click .playReset': function () {
		player.src = this.image;
		player.load();
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
	},
	'click .playerBack': function() {
		player.currentTime = player.currentTime-15;
	}

});

Template.pod.onRendered(function() {
	Session.set('loading', true);
	player = document.getElementById("podcastPlayer");
	player.addEventListener("timeupdate", function() {
		var progress = player.currentTime / player.duration * 100;
		Session.set('progress', progress);
		Session.set('progressHuman', Math.floor(player.currentTime) + "/" + Math.ceil(player.duration));
		if(Meteor.userId()) {
			Casts.upsert(Meteor.userId() + '|' + player.src, 
				{$set: {
					current: Math.floor(player.currentTime),
					duration: Math.ceil(player.duration),
					progress: progress,
					user: Meteor.userId()
				}}
			)
		}
	});
});