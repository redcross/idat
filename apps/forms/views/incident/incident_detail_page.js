// ==========================================================================
// Project:   Forms.incidentDetail
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

sc_require('views/incident/incident_master');
sc_require('views/incident/activation_view');
sc_require('views/incident/edit_hotel_view');

// This page describes a part of the interface for your application.

Forms.IncidentPageToolbar = SC.ToolbarView.extend({
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

})

Forms.incidentDetailPage = SC.Page.design({

  // Add your views here.  Ex:

  mobilePane: SC.MainPane.design({
    childViews: 'navigation'.w(),

    navigation: SC.NavigationView.extend({
      navigationContentView: Forms.IncidentMasterView,

      pop: function() {
        Forms.statechart.sendAction('save');
        sc_super();
      }
    })
  }),

  mainPane: SC.MainPane.design({
    childViews: 'masterDetail'.w(),

    masterDetail: SC.MasterDetailView.design({
      layout: { left: 0, right: 0, top: 0, bottom: 0 },
      autoHideMaster: YES,

      pickerPane: SC.PickerPane.extend({
        style: { opacity: 1 },
        layout: { width: 250, height: 480 },
        theme: "popover",
      }),

      masterView: SC.NavigationView.extend({
        navigationContentView: Forms.IncidentMasterView
      }),

      detailView: SC.WorkspaceView.design({
        topToolbar: SC.ToolbarView.design({
          childViews: "labelView leftButtons familiesButton".w(),

          leftButtons: SC.View.design(SC.FlowedLayout, {
            layout: {height: 30, centerY: 0},
            flowPadding: {left: 0},
            defaultFlowSpacing: {left: 7},
            childViews: "showMaster save addTeamMember".w(),
            layoutDirection: SC.LAYOUT_HORIZONTAL,
            align: SC.ALIGN_LEFT,

            showMaster: SC.ButtonView.design({
              layout: {height: 30, width: 100 },
              controlSize: SC.HUGE_CONTROL_SIZE,
              isVisible: NO,
              isVisibleBinding: ".parentView.parentView.masterIsHidden",
              titleBinding: "Forms.incidentDetailSelection.name",
              action: "toggleMasterPicker",

              themeName: SC.browser.mobile ? 'point-left' : 'ace'
            }),

            save: SC.ButtonView.design({
              layout: {height: 30, width: 80},
              title: "Save",
              controlSize: SC.HUGE_CONTROL_SIZE,
              target: "Forms.statechart",
              action: "save",
              isEnabledBinding: SC.Binding.or("Forms.incident.isDirty", "Forms.hotel.isDirty"),
            }),

            addTeamMember: SC.ButtonView.design({
              layout: {height: 30, width: 120},
              title: "Add Responder",
              controlSize: SC.HUGE_CONTROL_SIZE,
              target: "Forms.incidentTeam",
              action: "addResponder",
              nowShowingBinding: "Forms.incidentDetailSelection.show",
              isVisible: function() {
                return this.get('nowShowing') == 'team';
              }.property("nowShowing"),

            }),
          }),

          familiesButton: SC.ButtonView.design({
            title: "Families",
            controlSize: SC.HUGE_CONTROL_SIZE,
            target: "Forms.statechart",
            action: "showFamilies",
            theme: "point-right",
            layout: {top:7, right: 10,  height: 30, width: 130}
          }),

          labelView: SC.LabelView.design({
            layout: {height: 24, right: 0, left: 0, centerY: 0},
            valueBinding: "Forms.incident.title",
            controlSize: SC.LARGE_CONTROL_SIZE,
            textAlign: SC.ALIGN_CENTER
          }),


        }),

        contentView: SC.ContainerView.design({
          nowShowing: "registrations",
          nowShowingBinding: 'Forms.incidentDetailSelection.show',
        })
      }),
    }),
  }),

  summary: SC.ScrollView.design({

    topToolbar: Forms.IncidentPageToolbar,

    hasHorizontalScroller: NO,
    contentView: Forms.FormView.extend({
      isEnabledBinding: "Forms.incident.canEdit",

      shouldResizeWidth: NO,

      childViews: 'collectDetails collectReport collectTeam print sendDocReport sendDemReport'.w(),
      //contentBinding: 'Forms.incident',

      collectDetails: Forms.FormView.label("Incident Details:", {
        valueBinding: "Forms.incident.detailsValidatorGroupMessage",
        controlSize: SC.REGULAR_CONTROL_SIZE
      }),
      collectReport: Forms.FormView.label('Incident Report:', {
        valueBinding: "Forms.incident.reportValidatorGroupMessage",
        controlSize: SC.REGULAR_CONTROL_SIZE
      }),
      collectTeam: Forms.FormView.label('Team Details:', {
        valueBinding: SC.Binding.oneWay('Forms.incident*responders.length').transform(function(val) {
          return "%@ Responders Entered".fmt(val);
        }),
        controlSize: SC.REGULAR_CONTROL_SIZE
      }),

      print: Forms.FormView.row('Print Paperwork:', SC.ButtonView.design({
        layout: {width: 180, height: 30},
        controlSize: SC.HUGE_CONTROL_SIZE,
        title: "Print Paperwork",
        action: "printAll",
        target: "Forms.incident",
      })),

      sendDocReport: Forms.FormView.row('Send Reports:', SC.ButtonView.design({
        layout: {width: 250, height: 30},
        controlSize: SC.HUGE_CONTROL_SIZE,
        title: "Send DOC Report",
        action: "sendDocReport",
        target: "Forms.incident",
      })),

      sendDemReport: Forms.FormView.row('', SC.ButtonView.design({
        layout: {width: 250, height: 30},
        controlSize: SC.HUGE_CONTROL_SIZE,
        title: "Send SF DEM Report",
        action: "sendDemReport",
        target: "Forms.incident",
      }), {
        isVisibleBinding: SC.Binding.oneWay("Forms.incident.incidentIsSF")
      }),
    })
  }),

  details: SC.ScrollView.design({

    topToolbar: Forms.IncidentPageToolbar,

    hasHorizontalScroller: NO,
    contentView: Forms.FormView.extend({
      isEnabledBinding: "Forms.incident.canEdit",

      shouldResizeWidth: NO,

      childViews: 'incidentName incidentDate incidentNumber address crossStreet city state zip incidentType defaultResidenceType chapter county'.w(),
      contentBinding: 'Forms.incident',

      incidentDate: Forms.FormView.row("Incident Date:", SCUI.DatePickerView.design(SC.ContentValueSupport, {valueBinding: ".date", layout: {width: 150, height: 24}, formatDate: "%m/%d/%Y",})),
      incidentNumber: Forms.FormView.textField("Incident Number:"),
      incidentName: Forms.FormView.textField("Incident Name:"),

      address: Forms.FormView.textField("Address:"),
      city: Forms.FormView.textField("City:"),
      state: Forms.FormView.textField("State:"),
      zip: Forms.FormView.textField("Zip:", {type: 'number'}),
      crossStreet: Forms.FormView.textField("Cross Street:"),

      incidentType: Forms.FormView.segmented("Incident Type:", {
        allowsEmptySelection: YES,
        itemsBinding: "Forms.lookups.incidentTypes",
        layoutDirection: SC.LAYOUT_HORIZONTAL, // Override the mobile detection
      }),
      defaultResidenceType: Forms.FormView.segmented("Residence Type:", {
        itemsBinding: "Forms.lookups.residenceTypes",
        controlSize: SC.LARGE_CONTROL_SIZE,
      }),

      chapter: Forms.FormView.row("Chapter:", SC.SelectView.design({
        layout: {width: 150, height: 24},
        itemsBinding: "Forms.chapters.arrangedObjects",
        itemTitleKey: 'name',
        emptyName: '',
      })),
      county: Forms.FormView.row("County:", SC.SelectView.design({
        layout: {width: 150, height: 24},
        itemsBinding: "Forms.incidentCounties.arrangedObjects",
        itemTitleKey: 'name',
        emptyName: '',
      })),
      chapterCode: Forms.FormView.textField("Chapter Code:"),
      countyCode: Forms.FormView.textField("County Code:"),
    })
  }),

  report: SC.ScrollView.design({

    wantsAcceleratedLayer: YES,

    topToolbar: Forms.IncidentPageToolbar,


    hasHorizontalScroller: NO,
    contentView: Forms.FormView.extend({
      shouldResizeWidth: NO,
      isEnabledBinding: "Forms.incident.canEdit",

      childViews: 'verifiedBy verifiedByOther unitsAffected unitsDestroyed unitsMajor unitsMinor unitsUndamaged peopleInjured peopleHospitalized peopleDeceased totalAdults totalChildren totalAffected totalFamilies vehicles timeNotified timeArrived timeDeparted summaryAssistance casIncidentNumber narrative'.w(),
      contentBinding: 'Forms.incident',

      verifiedBy: Forms.FormView.segmented("Verified By:", {
        allowsEmptySelection: YES,
        itemsBinding: "Forms.lookups.verifiedBy",
      }),
      verifiedByOther: Forms.FormView.textField("Verified By:", {}, {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.incident.verifiedByIsOther")
      }),

      unitsAffected: Forms.FormView.textField("Affected Units:", {type: 'number'}),
      unitsDestroyed: Forms.FormView.textField("Destroyed:", {type: 'number'}),
      unitsMajor: Forms.FormView.textField("Major:", {type: 'number'}),
      unitsMinor: Forms.FormView.textField("Minor:", {type: 'number'}),
      unitsUndamaged: Forms.FormView.textField("No Damage:", {type: 'number'}),

      peopleInjured: Forms.FormView.textField("People Injured:", {type: 'number'}),
      peopleHospitalized: Forms.FormView.textField("Hospitalized:", {type: 'number'}),
      peopleDeceased: Forms.FormView.textField("Deceased:", {type: 'number'}),
      totalAdults: Forms.FormView.textField("Total Adults:", {type: 'number'}),
      totalChildren: Forms.FormView.textField("Total Children:", {type: 'number'}),
      totalAffected: Forms.FormView.textField("Total Affected:", {type: 'number'}),
      totalFamilies: Forms.FormView.textField("Total Families:", {type: 'number'}),

      vehicles: Forms.FormView.segmented("Vehicles Used:", {
        allowsEmptySelection: YES,
        allowsMultipleSelection: YES,
        valueAlwaysMultiple: YES,
        itemsBinding: "Forms.lookups.vehicles",
      }),

      timeNotified: Forms.FormView.textField("Time Notified:"),
      timeArrived: Forms.FormView.textField("Time Arrived:"),
      timeDeparted: Forms.FormView.textField("Time Departed:"),

      summaryAssistance: Forms.FormView.segmented("Assistance Provided:", {
        allowsEmptySelection: YES,
        allowsMultipleSelection: YES,
        valueAlwaysMultiple: YES,
        itemsBinding: "Forms.lookups.summaryAssistanceGiven",
        shouldAutoResize: SC.browser.isMobile,
        layout: {width: 500, height: 24}
      }),

      casIncidentNumber: Forms.FormView.textField("CAS Incident:"),

      narrative: Forms.FormView.row("Narrative:", Forms.TextFieldView.design({
        layout: {width: 350, height: 225},
        isTextArea: YES,
      })),
    })
  }),

  team: SC.ListView.extend({
    contentBinding: "Forms.incidentTeam.arrangedObjects",
    rowHeight: 40,

    topToolbar: Forms.IncidentPageToolbar,

    exampleView: SC.View.extend(SC.FlowedLayout, {
      layoutDirection: SC.LAYOUT_HORIZONTAL, canWrap: NO,
      defaultFlowSpacing: {left: 5, right: 5},
      flowPadding: {top: 5},

      content: null,
      childViews: "nameLabel nameField assignment role remove".w(),

      nameLabel: SC.LabelView.extend({
        value: 'Name:', 
        layout: {width: 50, height: 30},
        defaultFlowSpacing: {top: 8}
      }),
      nameField: SC.TextFieldView.extend({valueBinding: ".parentView*content.name", layout: {width: 150, height: 30}}),

      removeMember: function() {
        Forms.incidentTeam.removeObject(this.get('content'));
      },

      assignment: SC.SelectView.extend({
        valueBinding: ".parentView*content.assignment",
        items: ["Enroute", "General", "Casework", "DA", "Feeding", "Evac Center", "Released"],
        layout: {height: 24, width: 150},
        defaultFlowSpacing: {top: 8}
      }),

      role: SC.SelectView.extend({
        valueBinding: ".parentView*content.role",
        items: ["Lead", "Responder", "DMH", "DHS", "PA", "Dispatch", "Activator"],
        layout: {height: 24, width: 150},
        defaultFlowSpacing: {top: 5}
      }),

      remove: SC.ButtonView.extend({
        title: "Remove",
        action: "removeMember",
        layout: {width: 75, height: 30},
        controlSize: SC.HUGE_CONTROL_SIZE,
      })
    })
  }),

  registrations: SC.TableView.design({
    contentBinding: "Forms.incidentFamilies.arrangedObjects",
    selectionBinding: "Forms.incidentFamilies.selection",

    topToolbar: Forms.IncidentPageToolbar,

    columns: [
      SC.TableColumn.create({key: "unitNumber", title: "Unit", width: 58}),
      SC.TableColumn.create({key: "streetDescription", title: "Address", }),
      SC.TableColumn.create({key: "hohName", title: "Name"}),
      SC.TableColumn.create({key: "numPeopleString", title: "Est.", width: 57}),
      SC.TableColumn.create({key: "numResidents", title: "Reg.", width: 64}),
      SC.TableColumn.create({key: "needsHousing", title: "Hotel", width: 65, formatter: function(val) {return val ? 'Yes' : 'No'}}),
      SC.TableColumn.create({key: "needsAttention", title: "Followup", width: 86, formatter: function(val) {return val ? 'Yes' : 'No'}}),
      SC.TableColumn.create({key: "daComplete", title: "DA", width: 53, formatter: function(val) {return val ? 'Yes' : 'No'}}),
      SC.TableColumn.create({key: "cacComplete", title: "CAC", width: 64, formatter: function(val) {return val ? 'Yes' : 'No'}}),
    ]
  }),

  demographics: SC.ScrollView.extend({
    topToolbar: Forms.IncidentPageToolbar,

    contentView: Forms.FormView.extend({
      contentBinding: "Forms.demographics",
      childViews: "numFamilies numPeople numAdults numChildren famsNeedingHotel peopleNeedingHotel hotelBedsNeeded hotelRoomsNeeded famsNeedingAttention peopleNeedingAttention".w(),

      numFamilies: Forms.FormView.label("Number of Families:"),
      numPeople: Forms.FormView.label("Number of People:"),
      numAdults: Forms.FormView.label("Number of Adults:"),
      numChildren: Forms.FormView.label("Number of Children:"),
      famsNeedingHotel: Forms.FormView.label("Families Needing Hotel:"),
      peopleNeedingHotel: Forms.FormView.label("People Needing Hotel:"),
      hotelBedsNeeded: Forms.FormView.label("Hotel Beds Needed:"),
      hotelRoomsNeeded: Forms.FormView.label("Hotel Rooms Needed:"),
      famsNeedingAttention: Forms.FormView.label("Families Needing Attention:"),
      peopleNeedingAttention: Forms.FormView.label("People Needing Attention:"),
    })
  }),

  hotels: Forms.EditHotelView.design({
  }),

  hotelAssignments: SC.TableView.design({
    topToolbar: Forms.IncidentPageToolbar,

    contentBinding: "Forms.hotelAssignments.arrangedObjects",
    selectionBinding: "Forms.hotelAssignments.selection",

    columns: [
      SC.TableColumn.create({key: "familyUnitNumber", title: "Unit", width: 58}),
      SC.TableColumn.create({key: "familyStreetDescription", title: "Address", }),
      SC.TableColumn.create({key: "familyHohName", title: "Name"}),
      SC.TableColumn.create({key: "hotelName", title: "Hotel", width: 100}),
      //SC.TableColumn.create({key: "hotelNumberOfNights", title: "Nights", width: 100}),
      SC.TableColumn.create({key: "numberOfSingles", title: "Singles", width: 80}),
      SC.TableColumn.create({key: "numberOfDoubles", title: "Doubles", width: 80}),
      SC.TableColumn.create({key: "numberOfTriples", title: "Triples", width: 80}),
      SC.TableColumn.create({key: "numberOfOthers", title: "Others", width: 80}),
    ]
  }),

  cacIssuance: SC.TableView.design({
    topToolbar: SC.ToolbarView.extend({
      childViews: "backButton debugButton".w(),

      backButton: SC.ButtonView.extend({
        layout: {left: 7, height: 30, width: 100, centerY: 0},
        title: "Incidents",
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

    contentBinding: "Forms.incidentCacs.arrangedObjects",
    selectionBinding: "Forms.incidentCacs.selection",

    columns: [
      SC.TableColumn.create({key: "familyUnitNumber", title: "Unit", width: 58}),
      SC.TableColumn.create({key: "familyStreetDescription", title: "Address", }),
      SC.TableColumn.create({key: "familyHohName", title: "Name"}),
      SC.TableColumn.create({key: "formType", title: "Form Type"}),
      SC.TableColumn.create({key: "cardLast4", title: "Card Number", width: 58}),
      SC.TableColumn.create({key: "accessCode", title: "Access", width: 58}),
      SC.TableColumn.create({key: "locked", title: "Complete", }),
      SC.TableColumn.create({key: "total", title: "Total"}),
      SC.TableColumn.create({key: "authorizedName", title: "Issuer"}),
      SC.TableColumn.create({key: "supervisorName", title: "Supervisor"}),
      SC.TableColumn.create({key: "activatedBy", title: "Activator"}),/*
      SC.TableColumn.create({key: "hotelName", title: "Hotel", width: 100}),
      //SC.TableColumn.create({key: "hotelNumberOfNights", title: "Nights", width: 100}),
      SC.TableColumn.create({key: "numberOfSingles", title: "Singles", width: 80}),
      SC.TableColumn.create({key: "numberOfDoubles", title: "Doubles", width: 80}),
      SC.TableColumn.create({key: "numberOfTriples", title: "Triples", width: 80}),
      SC.TableColumn.create({key: "numberOfOthers", title: "Others", width: 80}),*/
    ]
  }),

  cacActivation: Forms.IncidentActivation

});
