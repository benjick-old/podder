Package.describe({
  name: 'benjick:podcasts',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.1');
  api.use(['http','anonyfox:scrape']);
  api.addFiles('benjick_podcasts.js', 'server');
  api.export('Podcasts');
});