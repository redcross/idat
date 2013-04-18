Forms.IncidentMasterView = SC.ScrollView.extend({
  contentView: SC.SourceListView.extend({
    contentBinding: "Forms.incidentDetails.arrangedObjects",
    selectionBinding: "Forms.incidentDetails.selection",
    contentIconKey: 'icon',
    contentValueKey: 'name',
    hasContentIcon: YES,
  }),

  topToolbar: SC.ToolbarView.extend({
    childViews: "backButton debugButton".w(),

    backButton: SC.ButtonView.extend({
      layout: {left: 7, height: 30, width: 100, centerY: 0},
      title: "Incidents",
      controlSize: SC.HUGE_CONTROL_SIZE,
      themeName: "point-left",
      target: "Forms.statechart",
      action: "back",
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

  bottomToolbar: SC.ToolbarView.extend({
    childViews: "clientsButton".w(),

    clientsButton: SC.ButtonView.extend({
      layout: {right: 7, height: 30, width: 100, centerY: 0},
      title: "Clients",
      controlSize: SC.HUGE_CONTROL_SIZE,
      target: "Forms.statechart",
      action: "showDebug",
      themeName: "point-right"
    }),
  })
});