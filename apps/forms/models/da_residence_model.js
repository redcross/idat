// ==========================================================================
// Project:   Forms.DaResidence
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Forms.DAResidence = SC.Record.extend(
/** @scope Forms.DAResidence.prototype */ {
  primaryKey: '_id',

  // TODO: Add your own code here.
  family: function() {
    return this.get('parentRecord');
  }.property('parentRecord'),

  unitDamage: SC.Record.attr(String),

  gasOn: SC.Record.attr(String),
  electricOn: SC.Record.attr(String),
  waterOn: SC.Record.attr(String),

  freshFoodStatus: SC.Record.attr(String),
  storedFoodStatus: SC.Record.attr(String),

  bedrooms: SC.Record.toMany("Forms.DABedroom", {nested: true, inverse: "form"}),


  completedAt: SC.Record.attr(SC.DateTime),
  completedBy: SC.Record.attr(String),

  shouldPrint: function() {
    var numRooms, damageLevel = this.get('unitDamage');
    return numRooms > 0 || (damageLevel && damageLevel !== '');
  }.property('bedrooms', 'unitDamage'),

  isNotCompleted: function() {
    return YES;
    //return SC.none(this.get('completedBy'));
  }.property('completedAt').cacheable(),

  detailsFields: 'unitDamage gasOn waterOn electricOn freshFoodStatus storedFoodStatus'.w(),

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
    var complete = true, count = this.getPath('bedrooms.length'),
        str = 'Main Form: ', fields;
    fields = this.getMissingFields(this.get('detailsFields'));
    complete  = complete && (fields == 'Complete');
    str += fields;
    str += '\n%@ Beds Entered\n'.fmt(count);
    this.get('bedrooms').forEach(function(bed, idx) {
      fields = bed.get('detailsComplete');
      complete = complete && (fields == 'Complete');
      str += 'Bedroom %@: %@\n'.fmt(idx+1, fields);
    });
    this.set('isComplete', complete)
    return str;
  }.property(),

  isComplete: null,

}) ;

SC.mixin(Forms.DAResidence, {
  isNestedRecord: YES, // datasource won't commit/create this
});