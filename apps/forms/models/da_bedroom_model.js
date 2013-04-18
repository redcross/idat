// ==========================================================================
// Project:   Forms.DaBedroom
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Forms.DABedroom = SC.Record.extend(
/** @scope Forms.DABedroom.prototype */ {
  primaryKey: '_id',

  // TODO: Add your own code here.
  //residents: SC.Record.toMany("Forms.FamilyMember"),
  //form: SC.Record.toOne("Forms.DAResidence", {inverse: "bedrooms"}),

  residentName: SC.Record.attr(String),
  damageLevel: SC.Record.attr(String),
  damageCause: SC.Record.attr(Array),
  mattress: SC.Record.attr(String),
  bedframe: SC.Record.attr(String),

  clothesStatus: SC.Record.attr(String),
  shoesStatus: SC.Record.attr(String),
  pillowsStatus: SC.Record.attr(String),
  linensStatus: SC.Record.attr(String),

  bedSize: SC.Record.attr(String),
  notes: SC.Record.attr(String),

  detailsFields: 'damageLevel damageCause mattress bedframe clothesStatus shoesStatus pillowsStatus linensStatus bedSize'.w(),

  getMissingFields: function(fields) {
    var missingFields = [];
    fields.forEach(function(el) {
      var field = this.getPath(el);
      if (SC.none(field) || field == '') {
        missingFields.pushObject(el.titleize());
      }
    }, this);
    if (missingFields.get('length') > 0) {
      return 'Missing ' + missingFields.join(', ');
    } else {
      return "Complete"
    }
  },

  detailsComplete: function() {
    return this.getMissingFields(this.get('detailsFields'));
  }.property(),

}) ;

SC.mixin(Forms.DABedroom, {
  isNestedRecord: YES, // datasource won't commit/create this
});