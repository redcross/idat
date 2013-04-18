// ==========================================================================
// Project:   Forms.hotels
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.hotels = SC.ArrayController.create(
/** @scope Forms.hotels.prototype */ {

  contentBinding: "Forms.incident.hotels",
  destroyOnRemoval: YES,

  addHotel: function() {
	  var r = Forms.store.createRecord(Forms.Hotel, {
	    _id: Forms.uuid.getUuid(),
	  });
	  this.addObject(r);

	  this.selectObject(r);
	},

	removeHotel: function() {
	  this.get('selection').forEach(function(el) {
	    this.removeObject(el);
	  }, this);
  },

}) ;
