Forms.createIncidentPage = SC.Page.create({

  createIncidentPane: SC.PanelPane.extend({
    layout: SC.browser.isMobile ? {} : {width: 500, height: 500, centerX: 0, centerY: 0},

    contentView: SC.WorkspaceView.extend({
      topToolbar: SC.ToolbarView.extend({
        childViews: ['title', 'cancelButton'],

        cancelButton: SC.ButtonView.extend({
          title: 'Cancel',
          layout: {left: 7, centerY: 0, height: 30, width: 100},
          isCancel: YES,
          target: "Forms.statechart",
          action: "cancel",
          controlSize: SC.HUGE_CONTROL_SIZE
        }),

        title: SC.LabelView.extend({
          value: "Create Incident",
          layout: {left: 0, right: 0, height: 24, centerY: 0},
          controlSize: SC.LARGE_CONTROL_SIZE,
          textAlign: SC.ALIGN_CENTER
        })
      }),

      contentView: Forms.FormView.extend({
        contentBinding: "Forms.createIncident",
        childViews: ['chapter', 'county', 'createButton'],

        chapter: Forms.FormView.row("Chapter:", SC.SelectView.design({
          layout: {width: 150, height: 24},
          itemsBinding: "Forms.chapters.arrangedObjects",
          itemTitleKey: 'name',
          emptyName: '',
        })),
        county: Forms.FormView.row("County:", SC.SelectView.design({
          layout: {width: 150, height: 24},
          itemsBinding: "Forms.createIncidentCounties.arrangedObjects",
          itemTitleKey: 'name',
          emptyName: '',
        })),
        createButton: SC.ButtonView.extend({
          layout: {height: 30},
          fillWidth: YES,
          title: "Create",
          isEnabledBinding: "Forms.createIncident.canCreate",
          target: "Forms.statechart",
          action: "doCreateIncident",
          controlSize: SC.HUGE_CONTROL_SIZE,
          isDefault: YES
        })
      })
    })
  })

})