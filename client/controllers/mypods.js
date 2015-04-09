Template.mypods.helpers({
	mypods: function () {
		return Session.get('mypods');
	}
});

Template.mypods.events({
	'click .unsubscribe': function() {
		if(Meteor.userId()) {
			Pods.remove(this._id)
		}; 
	}
});

Template.mypods.onRendered(function() {
	this.autorun(function() {
		var podz = Pods.find().fetch();
		Session.set('mypods', podz);
	});
});