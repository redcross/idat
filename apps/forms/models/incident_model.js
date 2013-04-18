// ==========================================================================
// Project:   Forms.Incident
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
sc_require('lib/validating_record');

Forms.Incident = Forms.ValidatingRecord.extend(
/** @scope Forms.Incident.prototype */ {
  allView: "all_incidents",
  primaryKey: '_id',

  // TODO: Add your own code here.
  //families: SC.Record.toMany("Forms.Family", {inverse: "incident"}),
  hotels: SC.Record.toMany("Forms.Hotel", {inverse: "incident"}),
  responders: SC.Record.toMany("Forms.IncidentTeamMember", {nested: true}),
  priceListItems: SC.Record.toMany("Forms.CACPriceListItem"),
  chapter: SC.Record.toOne("Forms.Chapter"),
  county: SC.Record.toOne("Forms.County"),

  incidentName: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  incidentDate: SC.Record.attr(SC.DateTime, {isRequired: YES, validatorGroup: 'details'}),
  incidentNumber: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  incidentType: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),

  address: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  crossStreet: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  city: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  state: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  zip: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  chapterCodeOther: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  countyCodeOther: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),

  
  summaryAssistance: SC.Record.attr(Array),

  defaultResidenceType: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'details'}),
  casIncidentNumber: SC.Record.attr(String),

  verifiedBy: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  verifiedByOther: SC.Record.attr(String),
  unitsAffected: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  unitsDestroyed: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  unitsMajor: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  unitsMinor: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  unitsUndamaged: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  peopleInjured: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  peopleHospitalized: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  peopleDeceased: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  totalAdults: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  totalChildren: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  totalAffected: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  totalFamilies: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  vehicles: SC.Record.attr(Array),
  timeNotified: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  timeArrived: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),
  timeDeparted: SC.Record.attr(String, {isRequired: YES, validatorGroup: 'report'}),

  narrative: SC.Record.attr(String),

  /*chapterCode: function(key, val) {
    var chapter = this.get(key);
    /*if (SC.none(chapter) && val) {
      this.set(key + 'Other', val);
      return val;
    } else if (SC.none(chapter)) {
      return this.get(key + 'Other');
    }
    return chapter && chapter.get('code');
  }.property('chapter', 'chapterCodeOther'),*/


  verifiedByIsOther: function() {
    return this.get('verifiedBy') == 'other';
  }.property('verifiedBy'),

  families: function() {
    //console.log("generating families query");
    var query = SC.Query.create({
      recordType: Forms.Family,
      conditions: "incident={incident}",
      parameters: {incident: this},
      localOnly: YES,
    });
    return Forms.store.find(query);
  }.property().cacheable(),

  description: function() {
    //var date = SC.DateTime.parse(this.get('incidentDate').toString(),  '%Y-%m-%dT%H:%M:%S%Z');
    var date = this.get('incidentDate');
    return "[%@] %@ %@ (%@)".fmt(this.get('incidentNumber'), date && date.toFormattedString("%m/%d/%Y"), this.get('incidentName'), this.get('address'));
  }.property("incidentName", "incidentDate", 'incidentNumber', 'address').cacheable(),

  title: function() {
   var date = this.get('incidentDate');
    return "%@ %@".fmt(date && date.toFormattedString("%m/%d/%Y"), this.get('address'));
  }.property("incidentName", "incidentDate", 'incidentNumber', 'address').cacheable(),

  formattedIncidentDate: function() {
    var date = this.get('incidentDate');
    if (!date) return '';
    return date.toFormattedString("%m/%d/%Y");
  }.property('incidentDate').cacheable(),

  leadName: function() {
    var name = '';
    this.get('responders').forEach(function(resp) {
      if (resp.get('role') === 'Lead')
        name = resp.get('name');
    });
    return name;
  }.property('responders').cacheable(),

/*
  detailsErrors: function() {
    var errors = this.get('validatorErrors');
    if (errors['details']) {
      console.log("Errors!", errors);
    }
  }.observes('validatorErrors'),*/

  trueKey: YES,

}) ;
