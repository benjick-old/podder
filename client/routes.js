Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  layoutTemplate: 'Layout'
});

Router.route('/', {
  name: 'search'
});

Router.route('/pod/:_cid/:_slug', {
  name: 'pod'
});