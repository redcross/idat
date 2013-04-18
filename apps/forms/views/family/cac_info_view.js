// ==========================================================================
// Project:   Forms.CacInfo
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
sc_require('views/util/signature_row_view.js');
sc_require('views/util/form_view.js');

Forms.CACInfoView = SC.View.extend(SC.FlowedLayout, {

  content: null,
  family: null,
  isHotel: YES,

  contentIsUnlocked: NO,
  contentIsUnlockedBinding: SC.Binding.not("*content.locked").oneWay(),
  contentStatusBinding: SC.Binding.oneWay("*content.status"),

  contentIsReady: function() {
    return this.get('contentIsUnlocked') && (this.get('contentStatus') & SC.Record.READY)
  }.property('contentIsUnlocked', 'contentStatus'),

  init: function() {
    sc_super();

    this.set('controller', this.get('controllerPrototype').create());

    this.queryObserver();
  },

  queryObserver: function() {
    /*var q;
    if (this.get('isHotel'))
      q = "family={family} AND priceListItem.type='hotel'";
    else
      q = "family={family} AND priceListItem.type!='hotel'";
    this.setPath('controller.content', Forms.store.find(SC.Query.create({
      recordType: Forms.CACLineItem,
      conditions: q,
      parameters: {family: this.get('family')},
      localOnly: YES,
    })));*/
    if (SC.none(this.get('family'))) return;

    formKey = this.get('isHotel') ? 'hotelCacForm' : 'regularCacForm';
    this.setPath('controller.content', this.get('family').get(formKey).get('lineItems'))
  }.observes("family", "isHotel"),

  controllerPrototype: SC.ArrayController.extend({
    infoView: null,
    //contentBinding: ".infoView*content.lineItems",
    
  }),

  print: function() {
    var content = this.get('content'), lineItems = this.getPath('controller.content');

    Forms.printController.print([{content: SC.Object.create({form: content, copyDescription: ''}), templateName:'cac-1030'}]);
  },

  setDefaultAccessCode: function() {
    var code = this.get('isHotel') ? '8888' : (this.getPath('family.preferredPhone') || '').slice(-4);
    this.get('content').set('accessCode', code);
  },

  layoutDirection: SC.LAYOUT_VERTICAL,
  childViews: "titleLabel lineItems detailsForm".w(),
  flowPadding: {left: 10, top: 10},
  defaultFlowSpacing: {top: 10},
  canWrap: NO,

  titleLabel: SC.LabelView.design({
    layout: {width: 300, height: 24},
    textAlign: SC.ALIGN_CENTER,
    controlSize: SC.LARGE_CONTROL_SIZE,
    tagName: 'h1',
    valueBinding: '.parentView.title'
  }),

  lineItems: SC.ListView.design({
    layout: {width: 300, height: 100},
    rowHeight: 30,

    contentBinding: ".parentView.controller.arrangedObjects",

    contentValueKey: "description",
  }),



  detailsForm: Forms.FormView.design({
    exampleRow: SC.FormView.prototype.exampleRow,
    contentBinding: ".parentView.content",
    isEnabledBinding: SC.Binding.oneWay(".parentView.contentIsReady"),
    //useStaticLayout: YES,
    layout: {width: 320, height: 400},
    childViews: "numItems total cardNumber isInvalidLabel accessCode clientSignature authorizedSignature supervisorSignature activatedBy locked print".w(),
    numItems: SC.FormView.row("Items:", SC.LabelView.design({layout: {width: 150, height: 24}, controlSize: SC.LARGE_CONTROL_SIZE, valueBinding: ".parentView.parentView.parentView.controller.length"})),
    total: SC.FormView.row("Total:", SC.LabelView.design({layout: {width: 150, height: 24}, controlSize: SC.LARGE_CONTROL_SIZE})),
    cardNumber: SC.FormView.row("Card Number:", SC.TextFieldView.design({
      layout: {width: 150, height: 24}, 
      validator: SC.Validator.CreditCard,
      rightAccessoryView: SC.ImageView.design({
        layout: {width: 16, height: 16, centerY: 0, right: 5},
        value: sc_static('red-x@2x.png'),
        scale: SC.BEST_FIT,
        useCanvas: NO,
      }),
      //type: 'number',

      valueObserver: function() {
        var acc = this.get('childViews')[0]
        if(!acc.set) return;

        var valid = SC.ok(this.performValidateSubmit());
        acc.set('isVisible', !valid);
        this.set('isInvalid', !valid);
      }.observes('value'),
    })),
    isInvalidLabel: SC.FormView.row('', SC.LabelView.extend({
      content: YES,
      contentValueKey: YES,
      value: function() {
        return "The card number is invalid";
      }.property(),
      classNames: ['card-invalid'],
      layout: {width: 150, height: 24},
    }), {
      content: YES,
      isVisibleBinding: ".parentView.cardNumber._singleField.isInvalid"
    }),
    accessCode: SC.FormView.row("Access Code:", SC.View.extend({
      layout: {width: 150, height: 24},
      childViews: "field setDefault".w(),
      field: SC.TextFieldView.design({
        layout: {width: 60},
        contentBinding: ".parentView.content",
        contentValueKeyBinding: ".parentView.contentValueKey",
        isEnabledBinding: ".parentView.isEnabled",
        type: 'number',
      }),
      setDefault: SC.ButtonView.design({
        layout: {width: 80, right: 0},
        title: "Set Default",
        action: "setDefaultAccessCode",
        isEnabledBinding: ".parentView.isEnabled",
      }),

    })),
    clientSignature: SC.FormView.row("Client Signature:", Forms.SignatureRowView.design({layout: {width: 150, height: 24}, signatureRole: 'client'})),
    authorizedSignature: SC.FormView.row("Authorized By:", Forms.SignatureRowView.design({layout: {width: 150, height: 24}, signatureRole: 'authorized'})),
    supervisorSignature: SC.FormView.row("Supervisor:", Forms.SignatureRowView.design({layout: {width: 150, height: 24}, signatureRole: 'supervisor'})),
    activatedBy: SC.FormView.row("Activated By:", SC.TextFieldView.design({layout: {width: 150, height: 24}})),
    locked: SC.FormView.row(" ", SC.CheckboxView.design({ layout: {height: 24, width: 200}, title: "Ready to be Activated", trueKey: true, isEnabledBinding: '.trueKey'})),
    print: SC.FormView.row("Print Form", SC.ButtonView.design({layout: {width: 100, height: 24}, title: "Print", action: "print", trueKey: true, isEnabledBinding: '.trueKey'}))
  })
});
