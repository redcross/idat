Forms.CreateIncidentState = SC.State.design({
  enterState: function() {
    var store = Forms.store,//.chain(),
        record = store.createRecord(Forms.Incident, {_id: Math.uuid().toLowerCase()});

    Forms.createIncident.set('content', record);
    Forms.getPath('createIncidentPage.createIncidentPane').append();
  },

  exitState: function() {
    Forms.getPath('familyPage.mainPane.masterDetail').hideMasterPicker();
    Forms.getPath('createIncidentPage.createIncidentPane').remove();
    //Forms.store.commitRecords();
  },

  cancel: function() {
    var record = Forms.createIncident.get('content');
    record.destroy();
    Forms.createIncident.set('content', null);

    this.gotoState('chooseIncident');
  },

  doCreateIncident: function() {
    var now = SC.DateTime.create();
    var record = Forms.createIncident.get('content');

    record.set('incidentNumber', record.getPath('county.incidentNumberCode') + now.toFormattedString("%y%m%d%H"));
    record.set('incidentDate', now);

    record.commitRecord();

    this.gotoState('incidentView', {content: record});
  }
});