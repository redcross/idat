// ==========================================================================
// Project:   Forms.FamilyMember
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Forms.FamilyMember = SC.Record.extend(
/** @scope Forms.FamilyMember.prototype */ {

  // TODO: Add your own code here.
  firstName: SC.Record.attr(String),
  lastName: SC.Record.attr(String),
  age: SC.Record.attr(String),
  disposition: SC.Record.attr(String),
  atScene: SC.Record.attr(Boolean),
  gender: SC.Record.attr(String),
  relationship: SC.Record.attr(String),
  isHOH: SC.Record.attr(Boolean),

  _hohObserver: function() {
    var status = this.get('store').readStatus(this.get('storeKey'));
    if (!(status & SC.Record.READY))
      return;
    if (this.get('isHOH')) {
      var residents = this.getPath('parentRecord.residents');
      if (residents) {
        residents.forEach(function(res) {
          var status = res.get('store').readStatus(res.get('storeKey'));
          if (res === this || !(status & SC.Record.READY))
            return;
          if (res.get('isHOH')) {
            res.set('isHOH', false);
            res.set('relationship', '');
          }
        }, this);
      }
      this.set('relationship', 'Head of Household');
    } else if (this.get('relationship') == 'Head of Household') {
      this.set('relationship', '');
    }
    var fam = this.get('parentRecord')
    if (!SC.none(fam)) {
      fam.notifyPropertyChange("headOfHousehold");
    }
  }.observes("isHOH"),

  fullName: function() {
    return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
  }.property("firstName", "lastName").cacheable(),


}) ;

SC.mixin(Forms.FamilyMember, {
  isNestedRecord: YES, // datasource won't commit/create this
});
