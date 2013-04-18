// ==========================================================================
// Project:   Forms.SignatureRow
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Forms.SignatureRowView = SC.View.extend(SC.ContentValueSupport, 
/** @scope Forms.SignatureRow.prototype */ {

  childViews: "labelView button".w(),

  paneName: 'cacPage.captureSignaturePane',
  signatureRole: 'client',

  buttonTitle: "Sign",
  value: null,

  labelView: SC.LabelView.design({
    //controlSize: SC.LARGE_CONTROL_SIZE,
    valueBinding: '.parentView*value.name',
    layout: {top: 0, left: 0, right: 70, bottom: 0},
  }),

  button: SC.ButtonView.design({
    layout: {top: 0, width: 60, right: 0, bottom: 0},
    titleBinding: ".parentView.buttonTitle",
    action: "showSignature",
    isEnabledBinding: ".parentView.isEnabled",
  }),

  showSignature: function(sender) {
    if (SC.none(this.get('value'))) {
      var pane = Forms.getPath(this.get('paneName'));
      pane.set('delegate', this);
      pane.set('signatureRole', this.get('signatureRole'));
      pane.show();
    } else {
      SC.AlertPane.warn({
        message: 'Really Clear The Signature?',
        description: 'Are you sure you want to clear the signature by %@?'.fmt(this.getPath('value.name')),
        buttons: [
          {title: "Clear", action: "reallyClearSignature", target: this},
          {title: "Cancel"}
        ]
      })
    }
  },

  reallyClearSignature: function() {
    this.set('value', null);
  },

  signaturePaneDidComplete: function(sigObject) {
    this.set('value', sigObject);
    Forms.store.commitRecords();
  },

  _valueObserver: function() {
    var val = this.get('value');
    if (SC.none(val)) {
      this.set('buttonTitle', 'Sign');
    } else {
      this.set('buttonTitle', 'Clear');
    }
  }.observes('value'),

});
