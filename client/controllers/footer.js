Template.footer.helpers({
	
	progress: function() {
		return Session.get('progress');
	},
	progressHuman: function() {
		return Session.get('progressHuman');
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
	}
});

Template.footer.onRendered(function() {
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
					user: Meteor.userId(),
					src: player.src,
					title: player.title
				}}
			)
		}
	});
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