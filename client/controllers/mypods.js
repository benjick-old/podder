Template.mypods.helpers({
	mypods: function () {
		return Session.get('mypods');
	},
	mycasts: function() {
		return Session.get('mycasts');
	}
});

Template.mypods.events({
	'click .unsubscribe': function() {
		if(Meteor.userId()) {
			Pods.remove(this._id)
		}; 
	},
	'click .play': function () {
		console.log(this)
		if(Meteor.userId()) {
			var timelookup = Casts.findOne(Meteor.userId() + '|' + this.src);
		}
		player.src = this.src;
		player.title = this.title;
		player.load();
		if (typeof(timelookup) !== "undefined") {
			player.currentTime = timelookup.current;
		}
		player.play();
		Session.set('playing', true);
		Session.set('trackLoaded', true);
	},
	'click .remove': function() {
		if(Meteor.userId()) {
			Casts.remove(this._id)
		}; 
	}
});

Template.mypods.onRendered(function() {
	this.autorun(function() {
		var pods = Pods.find({user: Meteor.userId()}).fetch();
		Session.set('mypods', pods);
		var casts = Casts.find({user: Meteor.userId(), progress: { $ne: 100 }}).fetch();
		Session.set('mycasts', casts);
	});
});