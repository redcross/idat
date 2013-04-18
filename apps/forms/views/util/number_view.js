// ==========================================================================
// Project:   Forms.NumberView
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Forms.NumberView = SC.View.extend(SC.FlowedLayout, SC.ContentValueSupport,
/** @scope Forms.NumberView.prototype */ {

  isEnabled: YES,
  canWrap: NO,

  // TODO: Add your own code here.
  childViews: "label incrementButton decrementButton".w(),
  defaultFlowSpacing: {left: 5, right: 5},

  label: SC.LabelView.design({
    valueBinding: SC.Binding.oneWay(".parentView.value"),
    layout: {height: 24, width: 30, top: 6},
    controlSize: SC.LARGE_CONTROL_SIZE,
    flowSpacing: {top: 1},
  }),

  incrementButton: SC.ButtonView.design({
    title: "+",
    action: "increment",
    controlSize: SC.HUGE_CONTROL_SIZE,
    layout: {height: 30, width: 50},
    isEnabledBinding: ".parentView.isEnabled",
  }),

  decrementButton: SC.ButtonView.design({
    title: "-",
    action: "decrement",
    controlSize: SC.HUGE_CONTROL_SIZE,
    layout: {height: 30, width: 50},
    isEnabledBinding: ".parentView.isEnabled",
  }),

  increment: function() {
    this.set('value', this.get('value')+1);
  },

  decrement: function() {
    this.set('value', Math.max(this.get('value')-1, 0));
  }

});
