// ==========================================================================
// Project:   Forms.family
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.family = Forms.ObjectController.create(
/** @scope Forms.family.prototype */ {
  nowShowing: 'Forms.familyDetailPage.vitals',

  clientLanguageDisplay: "english",

  contentBinding: SC.Binding.single("Forms.families.selection"),

  assistanceGivenBindingDefault: SC.Binding.multiple(),
  form1475NeedsBindingDefault: SC.Binding.multiple(),

  _oldContent: null,
  doHideMasterPicker: function() {
    if (this.get('content')!==this._oldContent) {
      this._oldContent = this.get('content');
      Forms.familyPage.mainPane.masterDetail.hideMasterPicker();
      Forms.store.commitRecords();
    }
  }.observes("content"),

  // TODO: Add your own code here.
  doSignature: function() {
    Forms.clientSignaturePage.clientSignaturePane.append();
  },



  createCACFormsIfNeeded: function() {
    if (!(this.get('status') & SC.Record.READY)) return;

    if (SC.none(this.get('hotelCacForm'))) {
      var record = Forms.store.createRecord(Forms.CACForm, {
        _id: Forms.uuid.getUuid(),
      });
      record.set('family', this.get('content'));
      this.set('hotelCacForm', record);
    }

    if (SC.none(this.get('regularCacForm'))) {
      var record = Forms.store.createRecord(Forms.CACForm, {
        _id: Forms.uuid.getUuid(),
      });
      record.set('family', this.get('content'));
      this.set('regularCacForm', record);
    }
  }.observes('status'),

  createDAFormIfNeeded: function() {
    if (!(this.get('status') & SC.Record.READY)) return;

    if (this.get('hasContent') && SC.none(this.get('daForm'))) {
        var record = Forms.store.createRecord(Forms.DAResidence, {
          _id: Forms.uuid.getUuid(),
        });
        record.set('family', this.get('content'));
        this.set('daForm', record);
      }
  }.observes('status', 'content'),

  printAll: function() {
    var pages = this.get('pagesToPrint');
    Forms.printController.print(pages);
  }

}) ;
