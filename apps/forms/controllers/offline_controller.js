Forms.offlineController = SC.Object.create({
  cacheStatusValues: "uncached idle checking downloading updateready obsolete".w(),

  init: function() {
    var that = this;
    console.log('initializing');

    sc_super();

    window.applicationCache.addEventListener('updateready', function(){
      SC.RunLoop.begin();
      SC.AlertPane.info({
        message: "Application Updated",
        description: "A new version has been downloaded.  Update now?",
        buttons: [
          {title: 'Install', target: that, action: "swapCache"},
          {title: "Keep Working"}
        ]
      });
      SC.RunLoop.end();
    }, false);

    function logEvent(e) {
      SC.RunLoop.begin();
      that.set('online', navigator.onLine);
      that.set('lastCacheEvent', e.type);
      that.set('cacheStatus', that.get('cacheStatusValues')[window.applicationCache.status]);
      SC.RunLoop.end();
    }

    var cache = window.applicationCache;
    cache.addEventListener('cached', logEvent, false);
    cache.addEventListener('checking', logEvent, false);
    cache.addEventListener('downloading', logEvent, false);
    cache.addEventListener('error', logEvent, false);
    cache.addEventListener('noupdate', logEvent, false);
    cache.addEventListener('obsolete', logEvent, false);
    cache.addEventListener('progress', logEvent, false);
    cache.addEventListener('updateready', logEvent, false);
  },

  swapCache: function() {
    window.applicationCache.swapCache();
    window.location.reload();
  },

  online: true,
  cacheStatus: null,
  lastCacheEvent: null,
});
