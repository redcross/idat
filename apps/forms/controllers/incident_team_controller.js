Forms.incidentTeam = SC.ArrayController.create({
  contentBinding: "Forms.incident.responders",

  addResponder: function() {
    this.get('content').pushObject({role: "Responder"});
  },
})