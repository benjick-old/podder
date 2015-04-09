Template.search.helpers({
  pods: function() {
    return Session.get('pods');
  },
  loading: function() {
  	return Session.get('loading');
  }
});
Template.search.events({
  'submit .search': function (event) {
  	Session.set('loading', true);
  	Session.set('pods', false);
    Meteor.call('searchPods', event.target.term.value, function(err, data) {
    	console.log(data);
      Session.set('pods', data);
      Session.set('loading', false);
    });
    event.preventDefault();
  }
});