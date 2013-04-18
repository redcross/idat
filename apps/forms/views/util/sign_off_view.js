// ==========================================================================
// Project:   Forms.SignOffView
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Forms.SignOffView = SC.View.extend(SC.FlowedLayout, SC.ContentDisplay,
/** @scope Forms.SignOffView.prototype */ {

  // TODO: Add your own code here.
  childViews: "label signButton clearButton".w(),
  contentDisplayProperties: 'completedBy completedAt'.w(),

  signatureText: function() {
    var completedAt = this.getPath('content.completedAt'), completedBy = this.getPath('content.completedBy');
    if (completedBy && completedAt) {
      return "%@ at %@".fmt(completedBy, completedAt.toFormattedString("%h:%M"));
    }
    return null;
  }.property('content.completedAt', 'content.completedBy').cacheable(),

  displayDidChange: function() {
    this.notifyPropertyChange('signatureText');
  }.observes('content'),

  hasSignature: function() {
    return !SC.none(this.get('signatureText'));
  }.property("signatureText").cacheable(),

  sign: function() {
    var content = this.get('content');
    if (content) {
      content.set('completedAt', SC.DateTime.create());
      content.set('completedBy', 'Somebody');
    }
  },

  clear: function() {
    var content = this.get('content');
    if (content) {
      content.set('completedAt', null);
      content.set('completedBy', null);
    }
  },

  label: SC.LabelView.design({
    valueBinding: ".parentView.signatureText",
    isVisibleBinding: ".parentView.hasSignature",

    layout: {height: 30, width: 200},
  }),

  signButton: SC.ButtonView.design({
    title: 'Sign Off',
    isVisibleBinding: SC.Binding.not(".parentView.hasSignature"),
    isEnabledBinding: '.parentView.isEnabled',
    controlSize: SC.HUGE_CONTROL_SIZE,

    action: 'sign',

    layout: {height: 30, width: 80},
  }),

  clearButton: SC.ButtonView.design({
    title: 'clear',
    isVisibleBinding: ".parentView.hasSignature",
    isEnabledBinding: '.parentView.isEnabled',
    controlSize: SC.HUGE_CONTROL_SIZE,

    action: 'clear',

    layout: {height: 30, width: 80},
  }),

});
