// ==========================================================================
// Project:   Forms.daBedroom
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.daBedrooms = SC.ArrayController.create(
/** @scope Forms.daBedroom.prototype */ {

  contentBinding: "Forms.family*daForm.bedrooms",
  destroyOnRemoval: YES,

  addBedroom: function() {
    var r = Forms.store.createRecord(Forms.DABedroom, {
      _id: Forms.uuid.getUuid(),
    });
    this.addObject(r);

    this.selectObject(r);
  },

  removeBedroom: function() {
    this.get('selection').forEach(function(el) {
      this.removeObject(el);
    }, this);
  },

}) ;
