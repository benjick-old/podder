Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  layoutTemplate: 'Layout'
});

Router.route('/', {
  name: 'main'
});
Router.route('/search', {
  name: 'search'
});
Router.route('/my', {
  name: 'mypods'
});

Router.route('/pod/:_cid/:_slug', {
  name: 'pod'
});