Forms.IncidentState = SC.State.design({
  enterState: function(context) {
    
    var incident = context.content,
        id = incident.get('id'),
        that = this;

    Forms.incident.set('content', incident);
    window.localStorage["chosenIncident"] = incident.get('id');

    Forms.incidentActivation.set('activatorName', Forms.loginController.get('name'));

    [Forms.Hotel, Forms.Family/*, Forms.CACLineItem*/].forEach(function(rt) {
      var key = '%@_%@'.fmt(rt.toString(), id);
      Forms.store.find(SC.Query.create({
        recordType: rt,
        view: 'document_by_type_incident',
        startkey: key,
        endkey: key,
        successfulCallback: (rt == Forms.Family) ? function() { that.loadNestedRecords() } : null,
      }));
    });

    var fams = Forms.store.find(SC.Query.local(Forms.Family, {
      conditions: "incident = {incident}",
      parameters: {incident: incident},
      orderBy: function(a, b) {
        function makeArr(el) {
          var unit = el.get('unitNumber') || '',
              streetNum = el.get('streetNumber') || '',
              streetName = el.get('streetName') || '';

          return [streetName.toLowerCase(), parseInt(streetNum), streetNum.toLowerCase(), parseInt(unit), unit.toLowerCase()];
        }

        var dataA = makeArr(a), dataB = makeArr(b);
        for (var i = 0; i < dataA.length; i++) {
          if (dataA[i] > dataB[i]) return 1;
          if (dataA[i] < dataB[i]) return -1;
        }
        return 0;
      },
    }));

    if (!SC.browser.isMobile) Forms.incidentDetails.selectObject(Forms.incidentDetails.get('arrangedObjects').objectAt(3));

    Forms.families.set('content', fams);

    Forms.demographics.update();
    this._demographicsTimer = SC.Timer.schedule({
      interval: 5 * 1000,
      repeats: YES,
      target: "Forms.demographics",
      action: "update"
    });
  },

  loadNestedRecords: function() {
    //console.log("loading nested records");
    Forms.store.find("Forms.Family").forEach(function(fam) {
      //console.log("loading %@".fmt(fam.toString()));
      fam.get('regularCacForm');
      fam.get('hotelCacForm');
      fam.getPath('hotelCacForm.lineItems');
      fam.get('daForm');
    });
    this.invokeLater(function() {

      Forms.hotelAssignments.set('content', Forms.store.find(SC.Query.create({
        recordType: Forms.CACLineItem,
        conditions: "priceListItem.type='hotel'",
        localOnly: YES,
      })));

      Forms.incidentActivationList.set('content', Forms.store.find(SC.Query.create({
        recordType: Forms.Family,
        conditions: "needsActivation={yes}",
        parameters: {incident: this.get('incident'), yes: YES},
        localOnly: YES,
      })));

      Forms.incidentCacs.set('content', Forms.store.find(SC.Query.create({
        conditions: "total > 0",
        //parameters: {incident: incident},
        recordType: Forms.CACForm,
        localOnly: YES,
      })));

    }, 1000);
  },

  exitState: function() {
    Forms.incidentCacs.set('content', []);
    this._demographicsTimer.invalidate();
    this._demographicsTimer = null;
  },

  showFamilies: function() {
    this.gotoState('familyView');
  },

  back: function() {
    this.gotoState('exitingState', {back: true});
  },

  initialSubstate: 'mainState',

  exitingState: SC.State.design({
    enterState: function(ctx) {
      var that = this;
      Forms.store.commitRecords();
      Forms.set('store', SC.Store.create().from('Forms.dataSource'));
      //Forms.store.commitRecords(null, null, null, null, function() {
        //console.log("commit complete");
                // Unload everything 
        //var storeKeys = Forms.store.storeKeys();
        //Forms.store.unloadRecords(null, null, storeKeys);
        that.gotoState('chooseIncident', ctx);
      //});
    }
  }),

  mainState: SC.State.design({
    enterState: function() {
      var path = SC.browser.isMobile ? 'incidentDetailPage.mobilePane' : 'incidentDetailPage.mainPane';
      Forms.getPath(path).append();
    },

    exitState: function() {
      var path = SC.browser.isMobile ? 'incidentDetailPage.mobilePane' : 'incidentDetailPage.mainPane';
      Forms.getPath(path).remove();
      Forms.store.commitRecords();

      if (!SC.browser.isMobile) {
        var md = Forms.getPath('incidentDetailPage.mainPane.masterDetail');
        if (md) md.hideMasterPicker();
      }
    }
  }),

  familyView: SC.State.plugin("Forms.FamilyState"),
});