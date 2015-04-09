Template.pod.helpers({
	pod: function () {
		return Session.get('pod');
	},
	loading: function() {
		return Session.get('loading');
	},
	subd: function() {
		if(!Meteor.userId()) {
			return false;
		}
		var pod = Session.get('pod');
		if(typeof(pod) === "undefined") {
			return false;
		}
		return Pods.findOne(Meteor.userId() + '|' + pod.collectionId) || 0;
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
		Session.set('trackLoaded', true);
	},
	'click .playReset': function () {
		player.src = this.image;
		player.load();
		player.play();
		Session.set('playing', true);
	},
	'click .subscribe': function() {
		var pod = Session.get('pod');
		if(Meteor.userId()) {
			Pods.upsert(Meteor.userId() + '|' + pod.collectionId,
				{$set: {
					user: Meteor.userId(),
					podcast: pod.collectionId,
					art: pod.artworkUrl600,
					title: pod.collectionName
				}}
			)
		};
	},
	'click .unsubscribe': function() {
		var pod = Session.get('pod');
		if(Meteor.userId()) {
			Pods.remove(Meteor.userId() + '|' + pod.collectionId)
		}; 
	}

});

Template.pod.onRendered(function() {
	Meteor.call('getPod', Router.current().params._cid, function (error, result) {
		Session.set('pod', result);
		Session.set('loading', false);
	});
	Session.set('loading', true);
});