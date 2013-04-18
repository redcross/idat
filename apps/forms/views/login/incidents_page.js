Forms.incidentsPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'workspaceView'.w(),

    workspaceView: SC.WorkspaceView.extend({
      topToolbar: SC.ToolbarView.extend({
        childViews: "instructions newIncidentButton logoutButton".w(),

        newIncidentButton: SC.ButtonView.design({
          layout: {centerY: 0, right: 7, width: 100, height: 30},
          controlSize: SC.HUGE_CONTROL_SIZE,
          title: 'New Incident',
          target: 'Forms.statechart',
          action: 'confirmNewIncident',
        }),

        logoutButton: SC.ButtonView.design({
          layout: {centerY: 0, left: 7, width: 75, height: 30},
          controlSize: SC.HUGE_CONTROL_SIZE,
          title: 'Log Out',
          target: 'Forms.statechart',
          action: 'doConfirmLogout',
        }),

        instructions: SC.LabelView.design({
          layout: {height: 24, left: 0, right: 0, centerY: 0},

          value: "Please click to select an incident below:",
          textAlign: SC.ALIGN_CENTER,

          controlSize: SC.LARGE_CONTROL_SIZE,
        }),
      }),

      contentView: SC.ScrollView.design({
        //layout: {width: 600, height: 480, centerX: 0, centerY: 0},
        contentView: SC.ListView.design({
          contentBinding: "Forms.incidents.arrangedObjects",
          contentValueKey: 'description',
          hasContentBranch: YES,
          contentIsBranchKey: 'trueKey',
          rowHeight: 40,
          selectionBinding: "Forms.incidents.selection",
          //target: "Forms.statechart",
          //action: "showIncident",
          //actOnSelect: YES,
        })
      }),

      bottomToolbar: SC.ToolbarView.extend({
        childViews: "textField".w(),

        textField: SC.LabelView.design({
          layout: {height: 24, left: 0, right: 0, centerY: 0},

          valueBinding: SC.Binding.oneWay("Forms.loginController.loginText"),
          textAlign: SC.ALIGN_CENTER,

          controlSize: SC.LARGE_CONTROL_SIZE,
        }),
      })
    }),
  })
})