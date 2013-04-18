// ==========================================================================
// Project:   Forms - mainPage
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

// This page describes the main user interface for your application.
Forms.familyPage = SC.Page.design({
  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'masterDetail'.w(),

    masterDetail: SC.MasterDetailView.design({
      layout: { left: 0, right: 0, top: 0, bottom: 0 },
      autoHideMaster: YES,

      pickerPane: SC.PickerPane.extend({
        /*transitions: {
          opacity: {
            duration: 0.25,
            timing: SC.Animatable.TRANSITION_EASE_IN_OUT,
            action: function(){
              if (this.style.opacity === 0) this._call_when_done();
            }
          }
        },*/
        //style: { opacity: 1 },
        layout: { width: 250, height: 480 },
        theme: "popover",
/*
        append: function() {
          this.disableAnimation();
          this.adjust("opacity", 1).updateLayout();
          this.enableAnimation();
          sc_super();
        },

        remove: function() {
          this._call_when_done = arguments.callee.base;
          this.adjust("opacity", 0);
        }*/
      }),

      masterView: SC.WorkspaceView.design({
        contentView: SC.ListView.design({
          contentBinding: "Forms.families.arrangedObjects",
          selectionBinding: "Forms.families.selection",

          contentValueKey: "description",
          rowHeight: 40,
          contentUnreadCountKey: 'needsHousingDisplay'
        }),

        topToolbar: SC.ToolbarView.design({
          childViews: "backButton debugButton".w(),

          backButton: SC.ButtonView.design({
            layout: {left: 10, height: 30, width: 100, centerY: 0},
            title: "Incident",
            controlSize: SC.HUGE_CONTROL_SIZE,
            themeName: "point-left",
            target: "Forms.statechart",
            action: "showIncident",
          }),

          debugButton: SC.ButtonView.design({
            layout: {right: 10, height: 30, width: 80, centerY: 0},
            title: "Debug",
            controlSize: SC.HUGE_CONTROL_SIZE,
            target: "Forms.statechart",
            action: "showDebug",
            isVisibleBinding: SC.Binding.oneWay('Forms.showDebug')
          }),

        }),


        bottomToolbar: SC.ToolbarView.design({
          childViews: "add remove".w(),

          add: SC.ButtonView.design({
            title: "Add",
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: {right: 10, centerY: 0, height: 30, width: 80},
            isEnabledBinding: "Forms.family.canAddContent",

            target: "Forms.families",
            action: "addFamily",
          }),

          remove: SC.ButtonView.design({
            title: "Remove",
            controlSize: SC.HUGE_CONTROL_SIZE,
            isEnabledBinding: SC.Binding.and("Forms.families.canRemoveContent", "Forms.families.hasSelection"),
            layout: {left: 10, centerY: 0, height: 30, width: 80},

            target: "Forms.families",
            action: "removeFamily"
          })
        }),
      }),

      detailView: SC.WorkspaceView.design({
        topToolbar: SC.ToolbarView.design({
          childViews: "labelView leftButtons".w(),

          labelView: SC.LabelView.design({
            layout: {height: 24, right: 0, left: 0, centerY: 0},
            valueBinding: "Forms.family.description",
            controlSize: SC.LARGE_CONTROL_SIZE,
            textAlign: SC.ALIGN_CENTER
          }),

          leftButtons: SC.View.design(SC.FlowedLayout, {
            layout: {height: 30, centerY: 0},
            flowPadding: {left: 0},
            defaultFlowSpacing: {left: 7},
            childViews: "showMaster save".w(),
            layoutDirection: SC.LAYOUT_HORIZONTAL,
            align: SC.ALIGN_LEFT,

            showMaster: SC.ButtonView.design({
              layout: {height: 30, width: 100 },
              controlSize: SC.HUGE_CONTROL_SIZE,
              isVisible: NO,
              isVisibleBinding: ".parentView.parentView.masterIsHidden",
              title: "Families",
              action: "toggleMasterPicker"
            }),

            save: SC.ButtonView.design({
              layout: {height: 30, width: 80},
              title: "Save",
              controlSize: SC.HUGE_CONTROL_SIZE,
              target: "Forms.statechart",
              action: "save",
              isEnabledBinding: "Forms.family.isDirty"
            })
          }),
        }),

        contentView: Forms.FamilyDetail.design({}),
      }),
    }),
  }),

});
