// ==========================================================================
// Project:   Forms.residents
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.residents = SC.ArrayController.create(
/** @scope Forms.residents.prototype */ {
  contentBinding: "Forms.family.residents",
  destroyOnRemoval: YES,

  canRemoveResident: function() {
    if (!this.get('canRemoveContent') || !this.get('hasSelection'))
      return NO;
    var canDelete = YES;
    this.get('selection').forEach(function(el) {
	    if (el.get('isHOH'))
	      canDelete = NO;
	  }, this);
	  return canDelete;
  }.property("canRemoveContent", "selection"),

  // TODO: Add your own code here.
	addResident: function() {
    var numResidents = this.getPath('arrangedObjects.length'),
        r = {
	    lastName: "",
	    firstName: "",
	    atScene: true,
	    gender: "",
	    age: "",
	    relationship: "",
	    disposition: "ok",
	    isHOH: numResidents == 0,
	  };
	  Forms.family.get('residents').pushObject(r);
    var record = Forms.family.get('residents').lastObject();
    this.selectObject(record);
    //this.selectObject(r);
    //this.set('selection', SC.SelectionSet.create());
    //this.selectObject(r);
    //console.log(this.get('selection'));
    Forms.store.commitRecords();

	  Forms.familyDetailPage.residents.details.contentView.firstName._singleField.$input().focus();
	},

	removeResident: function() {
	  var obj = this.get('selection').firstObject();
	  SC.AlertPane.warn({
	    message: "Really delete?",
	    description: "Are you sure you want to delete the entry for %@ %@".fmt(obj.get('firstName'), obj.get('lastName')),
	    buttons: [
	      {title: "Delete", action: "reallyRemoveResident", target: Forms.residents},
	      {title: "Cancel"}
	    ]
	  });
  },

  reallyRemoveResident: function(sender) {
	  this.get('selection').forEach(function(el) {
	    this.removeObject(el);
	    //console.log(el.toString());
	  }, this);
	  sender.get('pane').dismiss();
	}

}) ;
