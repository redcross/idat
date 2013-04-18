// ==========================================================================
// Project:   Forms.Hotel
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
var hash = {};

// maybe later: change this to a child "RoomType" model
"single double triple other".w().forEach(function(count) {
  hash[count + "Rate"] = SC.Record.attr(Number, {defaultValue: 0});
  hash[count + "sBooked"] = SC.Record.attr(Number, {defaultValue: 0});
  hash[count + "sAvailable"] = function() {
    var reserved = this.get(count + 'sBooked');
    var bookings = this.get('assignments').getEach('numberOf' + count.titleize().pluralize());
    var totalBookings = 0;
    bookings.forEach(function(el) {totalBookings += el});
    return reserved - totalBookings;
  }.property(count + 'sBooked', "roomBookingCount").cacheable();
});

Forms._HotelAssignmentCache = {};

Forms.Hotel = SC.Record.extend(
/** @scope Forms.Hotel.prototype */ hash, {
  primaryKey: '_id',

  incident: SC.Record.toOne("Forms.Incident", {inverse: "hotels"}),
  //lineItems: SC.Record.toMany("Forms.CACLineItem", {inverse: "hotel"}),
  assignments: function() {
    var id = this.get('id');
    if (SC.none(this._assignments)) {
      var query = SC.Query.create({
        conditions: "hotel={hotel}",
        recordType: Forms.CACLineItem,
        parameters: {hotel: this},
        localOnly: YES,
      });
      this._assignments = Forms.store.find(query);
      console.log("generating assignments for " + id);
      //this._assignments = [];
    }
    return this._assignments;
  }.property().cacheable(),

  // TODO: Add your own code here.
  name: SC.Record.attr(String),
  address1: SC.Record.attr(String),
  address2: SC.Record.attr(String),
  phone: SC.Record.attr(String),
  numberOfNights: SC.Record.attr(Number),
  checkInDate: SC.Record.attr(SC.DateTime),

}) ;

delete hash;
