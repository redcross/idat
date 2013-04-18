// ==========================================================================
// Project:   Forms.resident
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.resident = Forms.ObjectController.create(
/** @scope Forms.resident.prototype */ {
  contentBinding: SC.Binding.single("Forms.residents.selection"),
  // TODO: Add your own code here.

  saveResident: function() {
    console.log('saveResident');
    Forms.store.commitRecords();
  },

}) ;
