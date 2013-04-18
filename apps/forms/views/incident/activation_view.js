Forms.IncidentActivationForm = Forms.FormView.extend({

  topToolbar: SC.ToolbarView.extend({
    childViews: "backButton".w(),

    backButton: SC.ButtonView.extend({
      layout: {left: 7, height: 30, width: 100, centerY: 0},
      title: "Activation",
      controlSize: SC.HUGE_CONTROL_SIZE,
      themeName: "point-left",
      action: "pop",
    }),
  }),

  controlSize: SC.REGULAR_CONTROL_SIZE,

  contentBinding: "Forms.incidentActivation",
  childViews: "formName activatedBy cardNumber total hohName address1 address2 cityState zip preferredPhone incidentNumber incidentState chapterCode countyCode accessCode markActivated".w(),

  isEnabledBinding: "Forms.incidentActivation.hasContent",

  classNames: ['activation-form'],

  formName: Forms.FormView.row("Choose Card:", SC.SegmentedView.design({
    allowsEmptySelection: YES,
    itemTitleKey: 'title',
    itemValueKey: 'value',
    itemIsEnabledKey: 'isEnabled',
    items: [
      SC.Object.create({title: 'Regular', value: 'regularCacForm', isEnabledBinding: 'Forms.incidentActivation.canActivateRegular'}), 
      SC.Object.create({title: 'Hotel', value: 'hotelCacForm', isEnabledBinding: 'Forms.incidentActivation.canActivateHotel'}), 
    ],
    controlSize: SC.LARGE_CONTROL_SIZE,
    align: SC.ALIGN_LEFT,
    //layoutDirection: SC.LAYOUT_VERTICAL,
    layout: {width: 500, height: 30}
  })),

  activatedBy: Forms.FormView.row("Activated By:", SC.TextFieldView.design({
    content: YES,
    contentValueKey: YES,
    layout: {width: 150, height: 18},
    valueBinding: 'Forms.incidentActivation.activatorName'
  })),

  labelLayout: {width: 150, height: 16},
  defaultFlowSpacing: { left: 5, top: 2, bottom: 2, right: 5 },

  cardNumber: Forms.FormView.row("Card Number:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  total: Forms.FormView.row("Total:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  comment: Forms.FormView.row("Comment:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),

  hohName: Forms.FormView.row("Client Name:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  address1: Forms.FormView.row("Address:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  address2: Forms.FormView.row("", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  cityState: Forms.FormView.row("City State:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  zip: Forms.FormView.row("Zip:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  preferredPhone: Forms.FormView.row("Phone:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),

  incidentNumber: Forms.FormView.row("Incident Number:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  incidentState: Forms.FormView.row("Incident State:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  chapterCode: Forms.FormView.row("Chapter Code:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  countyCode: Forms.FormView.row("County Code:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),
  accessCode: Forms.FormView.row("Access Code:", SC.LabelView.design({layoutBinding: SC.Binding.oneWay(".parentView.parentView.labelLayout"), isTextSelectable: YES})),

  markActivated: Forms.FormView.row('', SC.ButtonView.design({
    layout: {width: 180, height: 30},
    controlSize: SC.HUGE_CONTROL_SIZE,
    title: "Mark Activated",
    action: "doActivate",
  })),
});

Forms.IncidentActivationList = SC.ScrollView.extend({
  contentView: SC.ListView.extend({
    contentBinding: "Forms.incidentActivationList.arrangedObjects",
    selectionBinding: "Forms.incidentActivationList.selection",
    contentValueKey: "description",

    actOnSelect: YES,
    action: "activationSelected",

    rowHeight: 30
  })
});

Forms.IncidentActivationDesktop = SC.View.extend({
  childViews: 'list form'.w(),
  list: Forms.IncidentActivationList.extend({
    layout: {left: 0, width: 200}
  }),
  form: Forms.IncidentActivationForm.extend({
    layout: {left: 200},
  }),

  doActivate: function() {
    Forms.incidentActivation.markActivated();
  }
});

Forms.IncidentActivationMobile = Forms.IncidentActivationList.extend({
  topToolbar: SC.ToolbarView.extend({
    childViews: "backButton debugButton".w(),

    backButton: SC.ButtonView.extend({
      layout: {left: 7, height: 30, width: 100, centerY: 0},
      title: "Incident",
      controlSize: SC.HUGE_CONTROL_SIZE,
      themeName: "point-left",
      action: "pop",
    }),

    debugButton: SC.ButtonView.extend({
      layout: {right: 7, height: 30, width: 80, centerY: 0},
      title: "Debug",
      controlSize: SC.HUGE_CONTROL_SIZE,
      target: "Forms.statechart",
      action: "showDebug",
      isVisibleBinding: SC.Binding.oneWay('Forms.showDebug')
    }),
  }),

  detailView: Forms.IncidentActivationForm.extend({
    doActivate: function() {
      Forms.incidentActivation.markActivated();
      Forms.incidentDetailPage.getPath('mobilePane.navigation').pop();
    }
  }),

  activationSelected: function() {
    var view = this.get('detailView');
    if (view.isClass) {
      view = view.create();
      this.set('detailView', view);
    }
    Forms.incidentDetailPage.getPath('mobilePane.navigation').push(view);
  },

  
});

Forms.IncidentActivation = SC.browser.isMobile ? Forms.IncidentActivationMobile : Forms.IncidentActivationDesktop;
