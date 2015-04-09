Template.mypods.helpers({
	mypods: function () {
		return Session.get('mypods');
	}
});

Template.mypods.events({
	'click .unsubscribe': function() {
		console.log('click');
		console.log(this);
		if(Meteor.userId()) {
			Pods.remove(this._id)
		}; 
	}
});

Template.mypods.onRendered(function() {
	this.autorun(function() {
		var podz = Pods.find().fetch();

		console.log(podz);
		Session.set('mypods', podz);
	});
});