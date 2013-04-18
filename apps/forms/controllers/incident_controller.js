// ==========================================================================
// Project:   Forms.incident
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.incident = Forms.ObjectController.create(
/** @scope Forms.incident.prototype */ {
  //contentBinding: SC.Binding.single("Forms.incidents.selection"),

  incidentIsSF: function() {
    return this.get('county') == 'San Francisco'
  }.property('county').cacheable(),

  // TODO: Add your own code here.
  printAll: function() {
    var pages = [{content: this.get('content'), templateName: 'incident_report'}];
    // push incident report page here
    this.get('families').forEach(function(el) {
      pages.pushObjects(el.get('pagesToPrint'));
    });

    Forms.printController.print(pages);
  },

  sendDocReport: function() {
    var title, body, assistance, destination = "arcbadoc@redcross.org", url,
        incidentType = Forms.lookups.lookup("incidentTypes", this.get("incidentType"));
    title = "%@ %@ - %@".fmt(this.get('incidentDate').toFormattedString("%m/%d"), incidentType, this.get('county'));
    
    assistance = Forms.lookups.lookupList('summaryAssistanceGiven', this.get('summaryAssistance'));
    
    body = [
      "%@ - %@".fmt(Forms.lookups.lookup("residenceTypes", this.get('defaultResidenceType')), incidentType),
      this.get('incidentDate').toFormattedString("%m/%d/%Y"),
      "%@ (%@)".fmt(this.get('city'), this.get('county')),
      "%@ Units Affected".fmt(this.get('unitsAffected')),
      "%@ People Affected - %@ Adults, %@ Children".fmt(this.get('totalAffected'), this.get('totalAdults'), this.get('totalChildren')),
      "Services Provided: %@".fmt(assistance.join(", ")),
      "Other Information: "
    ];

    if (this.get('incidentIsSF')) destination = "sfdat_incident@yahoogroups.com";

    url = "mailto:%@?subject=%@&body=%@".fmt(destination, encodeURIComponent(title), encodeURIComponent(body.join("\n")));
    window.location.href = url;
  },

  sendDemReport: function() {
    var title = "Red Cross Incident", body, assistance, destination = "4153270543@cookmail.com", url,
      incidentType = Forms.lookups.lookup("incidentTypes", this.get("incidentType")),
      incidentDate = this.get('incidentDate').toFormattedString("%m/%d");

    body = "%@ %@ %@.  # Displaced (# adults, # children).  # Placed in shelter/hotel, # found own housing.  No special remarks.".fmt(incidentType, this.get('address'), incidentDate)
  
    url = "mailto:%@?subject=%@&body=%@".fmt(destination, encodeURIComponent(title), encodeURIComponent(body));
    window.location.href = url;
  },

  nowShowing: null,

}) ;

Forms.incidentCounties = SC.ArrayController.create({
  contentBinding: "Forms.incident*chapter.counties"
});
