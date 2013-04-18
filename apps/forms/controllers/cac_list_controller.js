// ==========================================================================
// Project:   Forms.cacList
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.CACListController = SC.ArrayController.extend(
/** @scope Forms.cacList.prototype */ {

  familyBinding: "Forms.family.content",
  //contentBinding: "Forms.family.cacItems",
  destroyOnRemoval: YES,

  _selectionObserver: function() {
    var sel = this.get('selection'),
        record = sel.firstObject(),
        otherController = (this == Forms.hotelCacList) ? Forms.regularCacList : Forms.hotelCacList;

    if (SC.none(record)) {
      if (otherController.getPath('selection.length') == 0)
        Forms.cacItem.set('content', null);
      return;
    }

    otherController.set('selection', SC.SelectionSet.create());

    Forms.cacItem.set('content', record);
  }.observes('selection'),

  isEditableBinding: SC.Binding.not("*form.locked").oneWay(),

  /*_queryObserver: function() {
    var q = SC.Query.create({
      recordType: Forms.CACLineItem,
      conditions: "family={family}",
      parameters: {family: this.get('family')},
      localOnly: YES,
    });
    this.set('content', Forms.store.find(q));
  }.observes("family"),

  // TODO: Add your own code here.
  removeLineItem: function() {
    this.get('selection').forEach(function(el) {
	    el.destroy();
	  }, this);
  }*/

}) ;

Forms.hotelCacList = Forms.CACListController.create({
  contentBinding: "Forms.family*hotelCacForm.lineItems",
  formBinding: "Forms.family*hotelCacForm"
})

Forms.regularCacList = Forms.CACListController.create({
  contentBinding: "Forms.family*regularCacForm.lineItems",
  formBinding: "Forms.family*regularCacForm"
})