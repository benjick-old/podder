Meteor.methods({
  searchPods: function (term) {
    return Podcasts.search(term);
  },
  getPod: function (cid) {
    return Podcasts.single(cid);
  },
  getArtist: function (artistId) {
    return Podcasts.lookup(artistId);
  }
});
