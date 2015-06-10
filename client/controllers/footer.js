Template.footer.helpers({
	
	progress: function() {
		return Session.get('progress');
	},
	progressTime: function() {
		return Session.get('progressTime');
	},
	playing: function() {
		return Session.get('playing');
	},
	trackLoaded: function() {
		return Session.get('trackLoaded');
	}
});

Template.footer.events({
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
	},
	'timeupdate #podcastPlayer': function(e) {
		var progress = e.target.currentTime / e.target.duration * 100;
		Session.set('progress', progress);
		Session.set('progressTime', [Math.floor(e.target.currentTime), Math.ceil(e.target.duration)]);
		if(Meteor.userId()) {
			Casts.upsert(Meteor.userId() + '|' + e.target.src, 
				{$set: {
					current: Math.floor(e.target.currentTime),
					duration: Math.ceil(e.target.duration),
					progress: progress,
					user: Meteor.userId(),
					src: e.target.src,
					title: e.target.title
				}}
			)
		}
	}
});

Template.footer.onRendered(function() {
	player = document.getElementById("podcastPlayer");
	$(document).on('keydown', function (e) {
		if(e.keyCode === 32) {
			e.preventDefault();
			if(Session.get('playing')) {
				Session.set('playing', false);
				player.pause();
			}
			else {
				Session.set('playing', true);
				player.play();
			}
		}
	});
});