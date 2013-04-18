Forms.FamilyState = SC.State.design({
  enterState: function() {
    Forms.getPath('familyPage.mainPane').append();
  },

  exitState: function() {
    Forms.getPath('familyPage.mainPane.masterDetail').hideMasterPicker();
    Forms.getPath('familyPage.mainPane').remove();
    Forms.store.commitRecords();
  },

  showIncident: function() {
    this.gotoState('mainState');
  }
});