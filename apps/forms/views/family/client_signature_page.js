// ==========================================================================
// Project:   Forms.ClientSignature
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Forms.clientSignaturePage = SC.Page.design({

  clientSignaturePane: SC.PanelPane.extend({

    layout: {width: 1024, height: 600},

    delegate: null,
    signatureValue: null,
    signatureImageData: null,
    signedBy: null,

    classNames: ['signaturePane'],

    nowShowing: 'instructionsView',

    doSignature: function() {
      this.set('nowShowing', 'signatureView');
    },

    sigDone: function() {
      var record = Forms.family.get('content'), sigObject = {
        name: this.get('signedBy'),
        signedAt: SC.DateTime.create().toISO8601(),
        data: this.get('signatureValue'),
        image: this.get('signatureImageData')
      };

      record.writeAttribute('clientSignature', SC.clone(sigObject));
      if (record.getPath('regularCacForm.isIssuing')) {
        record.get('regularCacForm').writeAttribute('clientSignature', SC.clone(sigObject));
      }
      if (record.getPath('hotelCacForm.isIssuing')) {
        record.get('hotelCacForm').writeAttribute('clientSignature', SC.clone(sigObject));
      }

      this.remove();
      var delegate = this.get('delegate');
      /*if (!SC.none(delegate)) {
        delegate.signaturePaneDidComplete(record);
      }*/
    },

    show: function() {

      this.setPath('page.instructionsView.contentView', this.getPath('page.instructionsView').createChildView(this.get('templateView')));

      this.set('nowShowing', 'instructionsView'),
      this.set('signedBy', Forms.family.get('hohName'));
      this.append();
      this.set('signatureValue', null);
    },

    isValid: function() {
      var sig = this.get('signedBy');
      return sig && sig.trim() !== '';
    }.property('signedBy'),
    
    layout: {right: 0, left: 0, top: 0, bottom: 0},
    isModal: YES,
    contentView: SC.WorkspaceView.design({
      topToolbar: SC.ToolbarView.design({
        childViews: "cancelButton languageSelect doneButton signButton".w(),

        cancelButton: SC.ButtonView.design({
          title: "Cancel",
          isCancel: YES,
          controlSize: SC.HUGE_CONTROL_SIZE,
          action: "cancel",
          layout: {centerY: 0, left: 10,  height: 30, width: 80},

          cancel: function() {
            this.get('pane').remove();
          }
        }),

        languageSelect: SC.SegmentedView.design({
          layout: {centerX: 0, centerY: 0, height: 30, width: 500},
          controlSize: SC.LARGE_CONTROL_SIZE,
          itemsBinding: "Forms.lookups.languages",
          itemTitleKey: "title",
          itemValueKey: "value",
          valueBinding: "Forms.family.clientLanguageDisplay",
        }),

        doneButton: SC.ButtonView.design({
          layout: {centerY: 0, height: 30, right: 10, width: 80},
          title: "Done",
          isDefault: YES,
          controlSize: SC.HUGE_CONTROL_SIZE,
          action: 'sigDone',
          isVisibleBinding: SC.Binding.oneWay(".pane.nowShowing").transform(function(val) {
            return val == 'signatureView';
          }),
        }),

        signButton: SC.ButtonView.design({
          layout: {centerY: 0, height: 30, right: 10, width: 150},
          title: "Go To Signature",
          isDefault: YES,
          controlSize: SC.HUGE_CONTROL_SIZE,
          action: 'doSignature',
          isVisibleBinding: SC.Binding.oneWay(".pane.nowShowing").transform(function(val) {
            return val != 'signatureView';
          }),
        })
      }),

      contentView: SC.ContainerView.extend({
        nowShowingBinding: ".pane.nowShowing",
      }),
    }),

    templateView: SC.TemplateView.extend({
      templateName: "new_signature",
      classNames: ["client-signature"],

      language: function() {
        return Forms.translations.get(this.get('languageName'));
      }.property('languageName').cacheable(),
      languageName: "english",

      content: null,
      contentBinding: "Forms.family",
      languageNameBinding: "Forms.family.clientLanguageDisplay",
    }),
  }),

  instructionsView: SC.ScrollView.extend({
    //childViews: "contentView".w(),
    
  }),

  

  signatureView: SC.View.extend({
    classNames: ['capture-client-signature'],
    childViews: ['signature', 'instructions'],
    signature: Signature.SignatureView.extend({
      layout: { height: 150, width: 600, centerX: 0, bottom: 100},
      valueBinding: ".pane.signatureValue",
      imageDataBinding: ".pane.signatureImageData"
    }),
    instructions: SC.TemplateView.extend({
      layout: { centerX: 0, width: 600, top: 50, bottom: 325},
      templateName: 'signature_instructions',
      classNames: ['signature-instructions']
    })
  })
})
