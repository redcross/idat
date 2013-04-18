sc_require('statecharts/create_incident_state');

Forms.statechart = SC.Statechart.create({
  //trace: YES,
  
  rootState: SC.State.extend({
    initialSubstate: 'login',

    save: function() {
      Forms.store.commitRecords();
    },

    doLogout: function() {
      this.gotoState('login', {logout: true});
    },

    doConfirmLogout: function() {
      SC.AlertPane.warn({
        message: "Confirm Logout?",
        description: "Are you sure you want to log out of the application?  You will not be able to log back in unless you are" +
          " online and within range of an internet connection.",
        buttons: [
          { title: "Log Out", target: this, action: "doLogout"},
          { title: "Cancel" }
        ]
      });
    },

    enterState: function() {
      if (!SC.browser.isWebkit) {
        SC.AlertPane.error({
          message: "Wrong Browser",
          description: "The browser you are using is not supported and may cause the application to crash.  Please use Safari or Chrome.",
          buttons: [
            { title: "I Understand"},
          ]
        })
      }
    },

    login: SC.State.plugin("Forms.LoginState"),
    chooseIncident: SC.State.plugin("Forms.ChooseIncidentState"),
    createIncident: SC.State.plugin("Forms.CreateIncidentState"),
    incidentView: SC.State.plugin("Forms.IncidentState"),

    showDebug: function() {
      Forms.debugPage.get('debugPane').append();
    }

  })
});