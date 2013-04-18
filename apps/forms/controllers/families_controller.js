// ==========================================================================
// Project:   Forms.families
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.families = SC.ArrayController.create(
/** @scope Forms.families.prototype */ {

 // contentBinding: "Forms.incident.families",


  addFamily: function() {
	  var incident = Forms.incident.get('content'),
      r = Forms.store.createRecord(Forms.Family, {
	    _id: Forms.uuid.getUuid(),
	    daForm: {},
	    hotelCacForm: {},
	    regularCacForm: {},
      numAdults: 1,
      numChildren: 0,
      numBeds: 1,
      crossStreet: incident.get('crossStreet'),
      city: incident.get('city'),
      state: incident.get('state'),
      zip: incident.get('zip'),
      residenceType: incident.get('defaultResidenceType')
	  });
	  r.set('incident', incident);

	  this.selectObject(r);

	  Forms.family.set('nowShowing', "Forms.familyDetailPage.vitals");
	},

	removeFamily: function() {
	  var obj = this.get('selection').firstObject();
	  SC.AlertPane.warn({
	    message: "Really delete?",
	    description: "Are you sure you want to delete the entry for %@".fmt(obj.get('description')),
	    buttons: [
	      {title: "Delete", action: "reallyRemoveFamily", target: Forms.families},
	      {title: "Cancel"}
	    ]
	  });
  },

  reallyRemoveFamily: function(sender) {
	  this.get('selection').forEach(function(el) {
	    el.destroy();

	    //this.removeObject(el);
	  }, this);
	  sender.get('pane').dismiss();
	}

}) ;
