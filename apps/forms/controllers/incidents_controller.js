// ==========================================================================
// Project:   Forms.incidents
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.incidents = SC.ArrayController.create(
/** @scope Forms.incidents.prototype */ {

  // TODO: Add your own code here.
  _selectionObserver: function() {
    var obj = this.get('selection').firstObject();
    if (!SC.none(obj)) {
        Forms.statechart.sendEvent('didSelectIncident', obj);
    }
  }.observes('selection'),

}) ;
