App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_ACTIVE_GENERATION: true
});



var attr = DS.attr;

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: ''
});

App.RssFeed = DS.Model.extend({
  type: attr(),
  title: attr(),
  url: attr(),
});

App.Recent = DS.Model.extend({
  url: attr(),
  title: attr(),
  created_at: attr(),
  meta: attr(),
  redirect: function() {
    return "/redirect?url=" + this.get('url');
  }.property('url')
});

App.Capture = DS.Model.extend({
  url: attr(),
  title: attr(),
  article: attr(),
  created_at: attr(),
  meta: attr()
});

Ember.Handlebars.helper('date', function(value, options) {
  if(value==null) {
    return "";
  }else{
    return new Ember.Handlebars.SafeString('<span>' + moment(value.replace(" ", "T").replace(" ", "")).fromNow() + '</span>');
  }
});

App.Router.map(function() {
  this.resource('rssFeeds', {path: 'rssFeeds'});
  this.resource('articles', { path: 'sources/:source_id/articles'});
  this.resource('search',   {path: 'search/:search_term'});
  this.resource('captures', {path: 'captures'});
  this.resource('stats',    {path: 'stats'});
  this.resource('recents',  {path: 'recents'});
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    search: function(params) {
      this.transitionTo('search', encodeURIComponent(params));
    }
  }
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('recents');
  }
});

App.CapturesRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('capture');
  },
  actions: {
    search: function(query) {
      return true;
    }
  }
});

App.RecentsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('recent');
  },
  actions: {
    search: function(query) {
      return true;
    }
  }
});

App.RssFeedsRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.findAll('rssFeed');
  },
  actions: {
    search: function(query) {
      return true;
    }
  } 
});

App.StatsRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.$.getJSON('stats');
  }
});

App.SearchRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.$.getJSON('search/?q=' + params.search_term)
  },
  actions: {
    search: function(params) {
      this.transitionTo('search', encodeURIComponent(params));
    }
  }
});
