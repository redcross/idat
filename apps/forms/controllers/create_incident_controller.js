Forms.createIncident = SC.ObjectController.create({
  canCreate: function() {
    return this.get('county') && this.get('chapter');
  }.property('county', 'chapter'),
})

Forms.createIncidentCounties = SC.ArrayController.create({
  contentBinding: "Forms.createIncident*chapter.counties"  
})