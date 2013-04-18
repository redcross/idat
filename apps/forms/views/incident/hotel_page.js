Forms.hotelPage = SC.Page.design({

  hotelPane: SC.PanelPane.create({
    layout: {width: 800, height: 600, centerX: 0, centerY: 0},
    contentView: SC.WorkspaceView.design({
      topToolbar: SC.ToolbarView.design({
        childViews: "cancel done titleLabel".w(),

        cancel: SC.ButtonView.design({
          layout: {left: 10, width: 80, height: 30, centerY: 0},
          title: "Cancel",
          isCancel: YES,
          controlSize: SC.HUGE_CONTROL_SIZE,
          action: "doCancel",
          doCancel: function() {
            this.get('pane').remove();
          }
        }),

        done: SC.ButtonView.design({
          layout: {right: 10, width: 80, height: 30, centerY: 0},
          title: "Done",
          controlSize: SC.HUGE_CONTROL_SIZE,
          isDefault: YES,
          isEnabledBinding: "Forms.hotel.hasContent",
          target: "Forms.hotel",
          action: "hotelSelected",
        }),

        titleLabel: SC.LabelView.design({
          layout: {height: 24, width: 100, centerX: 0, centerY: 0},
          value: "Select Hotel",
          controlSize: SC.LARGE_CONTROL_SIZE,
          align: SC.ALIGN_CENTER
        })
      }),

      contentView: Forms.EditHotelView.design({}),
    })
  }),
})