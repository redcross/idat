Forms.debugPage = SC.Page.create({
  debugPane: SC.PalettePane.extend({
    layout: SC.browser.isMobile ? {} : {width: 500, height: 500, centerX: 0, centerY: 0},

    incidentDbRev: '',
    incidentServerRev: '',
    familyDbRev: '',
    familyServerRev: '',

    append: function() {
      this._timer = SC.Timer.schedule({
        target: this,
        repeats: YES,
        interval: 5 * 1000,
        action: "updateRevisions"
      });
      sc_super();
      this.updateRevisions();
    },

    remove: function() {
      if (this._timer) this._timer.invalidate();
      this._timer = null;
      sc_super();
    },

    updateRevisions: function() {
      var that = this, id = Forms.incident.get('id');
      this.set('incidentDbRev', '*' + this.get('incidentDbRev'));
      this.set('incidentServerRev', '*' + this.get('incidentServerRev'));
      Forms.dataSource._db.get(id, function(err, resp) {
        if (!resp) return;
        that.set('incidentDbRev', resp._rev);
      });
      Forms.dataSource._upstream.get(id, function(err, resp) {
        if (!resp) return;
        that.set('incidentServerRev', resp._rev);
      });

      id = Forms.family.get('id');
      if (!id) return;

      this.set('familyDbRev', '*' + this.get('familyDbRev'));
      this.set('familyServerRev', '*' + this.get('familyServerRev'));
      Forms.dataSource._db.get(id, function(err, resp) {
        if (!resp) return;
        that.set('familyDbRev', resp._rev);
      });
      Forms.dataSource._upstream.get(id, function(err, resp) {
        if (!resp) return;
        that.set('familyServerRev', resp._rev);
      });
    },

    contentView: SC.WorkspaceView.extend({
      topToolbar: SC.ToolbarView.extend({
        childViews: ['closeButton', 'title'],

        closeButton: SC.ButtonView.extend({
          controlSize: SC.HUGE_CONTROL_SIZE,
          title: "Close",
          action: "remove",
          layout: {left: 10, height: 30, width: 80, centerY: 0},
          isCancel: YES,
        }),

        title: SC.LabelView.extend({
          value: "Debug",
          layout: {width: 100, height: 24, centerX: 0, centerY: 0},
          controlSize: SC.LARGE_CONTROL_SIZE
        })
      }),

      contentView: SC.ScrollView.extend({
        contentView: SC.FormView.extend({
          controlSize: SC.REGULAR_CONTROL_SIZE,
          //layout: {left: 200},
          //contentBinding: "Forms.incidentActivation",
          //childViews: "formName activatedBy cardNumber total hohName address1 address2 cityState zip preferredPhone incidentNumber incidentState chapterCode countyCode accessCode markActivated".w(),
          labelLayout: {width: 150, height: 16},
          defaultFlowSpacing: { left: 5, top: 2, bottom: 2, right: 5 },

          childViews: ['localDB', 'upstreamDB', "sequenceNumber", 'activeUp', 'activeDown', 'lastChange', "lastChangeUp", "lastChangeDown", 'incidentRev', 'incidentDbRev', 'incidentServerRev', 'familyRev', 'familyDbRev', 'familyServerRev', 'printDebug', 'online', 'lastEvent', 'status'],

          localDB: SC.FormView.row("Local DB:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.dataSource.localDatabaseName"),
            layout: {height: 18, width: 250}
          })),

          upstreamDB: SC.FormView.row("Upstream DB:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.dataSource.upstreamDatabase"),
            layout: {height: 18, width: 250}
          })),

          sequenceNumber: SC.FormView.row("Current Sequence:", SC.LabelView.extend({

          })),

          activeUp: SC.FormView.row("Active Up:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.dataSource.replicationOKUpstream").transform(function(val) {
              return val ? 'Yes' : 'No';
            }),
            layout: {height: 18, width: 150}
          })),

          activeDown: SC.FormView.row("Active Down:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.dataSource.replicationOKDownstream").transform(function(val) {
              return val ? 'Yes' : 'No';
            }),
            layout: {height: 18, width: 150}
          })),

          lastChange: SC.FormView.row("Last Change:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.dataSource.lastChange").transform(function(val) {
              return val && val.toFormattedString("%m/%D %h:%M:%S");
            }),
            layout: {height: 18, width: 150}
          })),

          lastChangeUp: SC.FormView.row("Last Up:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.dataSource.lastChangeUpstream").transform(function(val) {
              return val && val.toFormattedString("%m/%D %h:%M:%S");
            }),
            layout: {height: 18, width: 150}
          })),

          lastChangeDown: SC.FormView.row("Last Down:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.dataSource.lastChangeDownstream").transform(function(val) {
              return val && val.toFormattedString("%m/%D %h:%M:%S");
            }),
            layout: {height: 18, width: 150}
          })),

          incidentRev: SC.FormView.row("Incident Revision:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.incident._rev"),
            layout: {height: 18, width: 250}
          })),

          incidentDbRev: SC.FormView.row("Incident Rev (db):", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay(".pane.incidentDbRev"),
            layout: {height: 18, width: 250}
          })),

          incidentServerRev: SC.FormView.row("Incident Rev (server):", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay(".pane.incidentServerRev"),
            layout: {height: 18, width: 250}
          })),

          familyRev: SC.FormView.row("Family Revision:", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay("Forms.family._rev"),
            layout: {height: 18, width: 250}
          })),

          familyDbRev: SC.FormView.row("Family Rev (db):", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay(".pane.familyDbRev"),
            layout: {height: 18, width: 250}
          })),

          familyServerRev: SC.FormView.row("Family Rev (server):", SC.LabelView.extend({
            valueBinding: SC.Binding.oneWay(".pane.familyServerRev"),
            layout: {height: 18, width: 250}
          })),

          printDebug: SC.FormView.row("Debug Printing:", SC.CheckboxView.extend({
            title: 'Debug Mode',
            valueBinding: 'Forms.printController.debug',
            layout: {height: 18, width: 150}
          })),

          online: SC.FormView.row('Cache Online:', SC.LabelView.extend({
            layout: {width: 100, height: 18},
            valueBinding: SC.Binding.oneWay('Forms.offlineController.online').transform(function(val) {
              return val ? 'Yes' : 'No';
            })
          })),
          lastEvent: SC.FormView.row('Last Cache Event:', SC.LabelView.extend({
            layout: {width: 100, height: 18},
            valueBinding: 'Forms.offlineController.cacheStatus'
          })),
          status: SC.FormView.row('Cache Status:', SC.LabelView.extend({
            layout: {width: 100, height: 18},
            valueBinding: 'Forms.offlineController.lastCacheEvent'
          }))
        })
      })
    })
  })
})