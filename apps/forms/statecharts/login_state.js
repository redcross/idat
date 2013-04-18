Forms.LoginState = SC.State.extend({
  enterState: function(ctx) {
    if (ctx && ctx.logout) {
      this.removeLoginData();

      // Destroy data in the local DB
      Forms.dataSource.destroy(function() {
        alert('You are logged out and all data on this computer has been removed.');
        window.location.reload();
      });
    } else {
      SC.Request.getUrl('/_session').json()
      .notify(this, this.didGetUserInfo)
      .send();
    }
    //Forms.getPath('loginPage.loginPane').append();

    //Forms.offlineController.statusPane.create().append()
  },

  exitState: function() {
    //Forms.getPath('loginPage.loginPane').remove();
  },

  removeLoginData: function() {
    SC.Request.deleteUrl('/_session').send();
    ['username', 'password', 'name', 'database', 'loggedIn'].forEach(function(attr) {
      delete window.localStorage[attr];
    })
    Forms.loginController.set('username', null);
    Forms.loginController.set('password', null);
    Forms.loginController.set('name', null);
  },

  doLogin: function() {
    var name = Forms.loginController.get('username'),
        pass = Forms.loginController.get('password');

    var req = SC.Request.postUrl("/_session", {name: name, password: pass})
        .json()
        .notify(200, this, this.didLogin)
        .notify(400, this, this.didFail)
        .send();

    this.gotoState('loggingInState');
  },

  didGetUserInfo: function(resp) {
    var body = resp.get('body');
    if (SC.ok(resp) && body && body['ok'] == true) {
      var userCtx = body['userCtx'];
      var name = userCtx && userCtx['name'];
      if (!SC.none(name)) {
        this.alreadyLoggedIn();
        return;
      }
    } else {
      // Maybe offline.  See if we're currently logged in
      if (window.localStorage["loggedIn"] === 'true') {
        this.alreadyLoggedIn();
        return;
      }
    }
    this.gotoState('emptyLoginState');
  },

  didLogin: function(resp) {
    var body;
    if (!SC.ok(resp) || SC.none(body = resp.get('body')) || SC.none(body['name'])) {
      this.didFail();
      return;
    }
    SC.Request.getUrl("/_users/org.couchdb.user:%@".fmt(body['name']))
        .json()
        .notify(200, this, this.didActuallyLogin)
        .notify(400, this, this.didFail)
        .send();
  },

  didActuallyLogin: function(resp) {
    var body;
    if (!SC.ok(resp) || SC.none(body = resp.get('body')) || SC.none(body['database'])) {
      this.didFail();
      return;
    }
    Forms.loginController.set('database', body['database']);

    window.localStorage["username"] = Forms.loginController.get('username');
    window.localStorage["password"] = Forms.loginController.get('password');
    window.localStorage["name"] = Forms.loginController.get('name');
    window.localStorage["database"] = Forms.loginController.get('database');
    window.localStorage["loggedIn"] = 'true';

    this.gotoState('initialDownloadState');
  },

  alreadyLoggedIn: function() {
    var database = window.localStorage["database"], that = this;
    Forms.loginController.set('username', window.localStorage["username"]);
    Forms.loginController.set('password', window.localStorage["password"]);
    Forms.loginController.set('name', window.localStorage["name"]);
    Forms.loginController.set('database', database);

    if (SC.none(database) || database === 'null') {
      this.gotoState('emptyLoginState');
      return;
    }

    Forms.dataSource.set('databaseName', Forms.loginController.get('database'));
    Forms.dataSource.awake(function() {
      that.gotoState('chooseIncident', {autopick: true})
    });
  },

  didFail: function() {
    this.gotoState('emptyLoginState');
    SC.AlertPane.error({
      message: "Incorrect username or password"
    });
  },

  initialSubstate: 'pendingState',

  pendingState: SC.State.design({

  }),

  emptyLoginState: SC.State.design({
    enterState: function() {
      Forms.getPath('loginPage.loginPane').append();
    },

    exitState: function() {
      Forms.getPath('loginPage.loginPane').remove();
    }
  }),

  loggingInState: SC.State.design({
    enterState: function() {
      Forms.loginPage.get('workingPane').set('message', 'Logging In…').append();
    },

    exitState: function() {
      Forms.loginPage.get('workingPane').remove();
    }
  }),

  initialDownloadState: SC.State.design({
    enterState: function() {
      var that = this;
      Forms.loginPage.get('workingPane').set('message', 'Downloading Data').append();
      Forms.dataSource.set('databaseName', Forms.loginController.get('database'));
      Forms.dataSource.awakeInitial(function() {
        that.downloadDone();
      });
    },

    exitState: function() {
      Forms.loginPage.get('workingPane').remove();
    },

    downloadDone: function() {
      var that = this;
      Forms.dataSource.awake(function() {
        that.gotoState('chooseIncident');
      });
    }
  })
});