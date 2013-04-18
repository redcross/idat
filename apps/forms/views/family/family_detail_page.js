// ==========================================================================
// Project:   Forms.family
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

// This page describes a part of the interface for your application.
sc_require('views/util/form_view');
sc_require('views/util/text_field');
sc_require('views/util/signature_row');

Forms.familyDetailPage = SC.Page.design({

  // Add your views here.  Ex:

  // mainView: SC.View.design({
  //   layout: { top: 0, left: 0, right: 0, height: 0 }
  // })

  vitals: SC.ScrollView.design({
    layout: {top: 20},
    contentView: Forms.FormView.design({
      isEnabledBinding: "Forms.family.canEdit",

      exampleRow: SC.FormRowView.extend({
        labelView: SC.FormRowView.LabelView.extend({ textAlign: SC.ALIGN_RIGHT, controlSize: SC.LARGE_CONTROL_SIZE, layout: {height: 24}})
      }),

      childViews: 'unitNumber streetNumber streetName numAdults numChildren numBeds needsHousing needsAttention language preferredPhone preferredPhoneType'.w(),
      contentBinding: 'Forms.family',
      controlSize: SC.LARGE_CONTROL_SIZE,

      unitNumber: SC.FormView.row("Unit:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      streetNumber: SC.FormView.row("Street Number:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      streetName: SC.FormView.row("Street Name:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      numAdults: SC.FormView.row("Adults:", Forms.NumberView.design({ layout: {height: 24, width: 150}})),
      numChildren: SC.FormView.row("Children:", Forms.NumberView.design({ layout: {height: 24, width: 150}})),
      numBeds: SC.FormView.row("Num Beds:", Forms.NumberView.design({ layout: {height: 24, width: 150}})),
      needsHousing: SC.FormView.row(" ", SC.CheckboxView.design({ layout: {height: 24, width: 200}, title: "Needs Housing"})),
      needsAttention: SC.FormView.row(" ", SC.CheckboxView.design({ layout: {height: 24, width: 200}, title: "Flag for Followup"})),
      language: SC.FormView.row("Language:", SC.SegmentedView.design({
        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemsBinding: "Forms.lookups.languages",
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        layoutDirection: SC.LAYOUT_HORIZONTAL,
        layout: {width: 500, height: 30}
      })),

      preferredPhone: SC.FormView.row("Phone:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      preferredPhoneType: SC.FormView.row("Type:", SC.SegmentedView.design({
        layout: {width: 200, height: 30},
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        items: "Work Cell Hotel Other".w()
      })),
    })
  }),

  details: SC.ScrollView.design({
    layout: {top: 20},
    contentView: Forms.FormView.design({
      isEnabledBinding: "Forms.family.canEdit",

      exampleRow: SC.FormRowView.extend({
        labelView: SC.FormRowView.LabelView.extend({ textAlign: SC.ALIGN_RIGHT, controlSize: SC.LARGE_CONTROL_SIZE, layout: {height: 24}})
      }),

      childViews: 'residenceType ownershipType insurance releaseAgencies releaseAgencyOther assistanceGiven assistanceGivenOther landlordName landlordPhone crossStreet city state zip email incomeAmount incomeSource rentAmount form1475Needs form1475Notes identifiedBy identificationDetails hasPets petDetails casCaseNumber notes completedBy'.w(),
      contentBinding: 'Forms.family',
      controlSize: SC.LARGE_CONTROL_SIZE,

      residenceType: SC.FormView.row("Residence Type:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemsBinding: "Forms.lookups.residenceTypes",
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      ownershipType: SC.FormView.row("Residence is:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemsBinding: "Forms.lookups.ownershipTypes",
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      insurance: SC.FormView.row("Insurance:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemsBinding: "Forms.lookups.insuranceTypes",
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      releaseAgencies: SC.FormView.row("Info Releases:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        allowsMultipleSelection: YES,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemsBinding: "Forms.lookups.releaseAgencies",
        valueAlwaysMultiple: true,
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),
      releaseAgencyOther: SC.FormView.row("Other Agency:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}}), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.family.releaseAgencyIsOther")
      }),

      assistanceGiven: SC.FormView.row("Assistance Given:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        allowsMultipleSelection: YES,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemsBinding: "Forms.lookups.assistanceGiven",
        valueAlwaysMultiple: true,
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),
      assistanceGivenOther: SC.FormView.row("Other Assistance:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),

      landlordName: SC.FormView.row("Landlord Name:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      landlordPhone: SC.FormView.row("Landlord Phone:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),

      crossStreet: SC.FormView.row("Cross Street:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      city: SC.FormView.row("City:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      state: SC.FormView.row("State:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      zip: SC.FormView.row("Zip:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),

      preferredPhone: SC.FormView.row("Phone:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      preferredPhoneType: SC.FormView.row("Type:", SC.SegmentedView.design({
        layout: {width: 200, height: 30},
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        items: "Work Cell Hotel Other".w()
      })),

      email: SC.FormView.row("Email:", Forms.TextFieldView.design({ 
        layout: {height: 24, width: 150},
        type: 'email',
        autoCapitalize: NO,
        autoCorrect: NO,
      })),
      incomeAmount: SC.FormView.row("Income Amount:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}}), {
        isVisibleBinding: SC.Binding.oneWay("Forms.incident.incidentIsSF")
      }),
      incomeSource: SC.FormView.row("Income Source:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}}), {
        isVisibleBinding: SC.Binding.oneWay("Forms.incident.incidentIsSF")
      }),
      rentAmount: SC.FormView.row("Rent Amount:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}}), {
        isVisibleBinding: SC.Binding.oneWay("Forms.incident.incidentIsSF")
      }),

      form1475Needs: SC.FormView.row("1475:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        allowsMultipleSelection: YES,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemsBinding: "Forms.lookups.form1475",
        valueAlwaysMultiple: true,
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),
      form1475Notes: SC.FormView.row("1475 Notes:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),

      identifiedBy: SC.FormView.row("Identified By:", SC.SegmentedView.design({
        layout: {width: 400, height: 30},
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        itemsBinding: "Forms.lookups.identificationTypes",
        itemTitleKey: 'title',
        itemValueKey: 'value',
      })),

      identificationDetails: SC.FormView.row("ID Details:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),

      hasPets: SC.FormView.row(" ", SC.CheckboxView.design({ layout: {height: 24, width: 200}, title: "Has Pets"})),
      petDetails: SC.FormView.row("Pet Details:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
      casCaseNumber: SC.FormView.row("CAS Case Number:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),

      notes: SC.FormView.row("Notes:", Forms.TextFieldView.design({ layout: {height: 225, width: 400}, isTextArea: YES})),
      completedBy: SC.FormView.row("Completed By:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),

    })
  }),

  residents: SC.View.design({
    childViews: "tableView details".w(),
    layout: {top: 20},

    tableView: SC.TableView.design({
      layout: {height: 200},
      contentBinding: "Forms.residents.arrangedObjects",
      selectionBinding: "Forms.residents.selection",
      //allowsMultipleSelection: NO,
      //allowsEmptySelection: NO,

      columns: [
        SC.TableColumn.create({key: "lastName", title: "Last", isResizable: NO, isReorderable: NO}),
        SC.TableColumn.create({key: "firstName", title: "First", isResizable: NO, isReorderable: NO}),
        SC.TableColumn.create({key: "atScene", title: "At Scene?", isResizable: NO, isReorderable: NO}),
        SC.TableColumn.create({key: "age", title: "Age", isResizable: NO, isReorderable: NO}),
        SC.TableColumn.create({key: "gender", title: "M/F", isResizable: NO, isReorderable: NO}),
        SC.TableColumn.create({key: "relationship", title: "Relationship to HOH", isResizable: YES, isReorderable: NO, isFlexible: YES}),
        SC.TableColumn.create({key: "disposition", title: "D/I/H/M/OK", isResizable: NO, isReorderable: NO}),
      ]

    }),

    details: SC.ScrollView.design({
      layout: {top: 200},

      contentView: Forms.FormView.design({
        isEnabledBinding: "Forms.resident.canEdit",

        exampleRow: SC.FormRowView.extend({
          labelView: SC.FormRowView.LabelView.extend({ textAlign: SC.ALIGN_RIGHT, controlSize: SC.LARGE_CONTROL_SIZE, layout: {height: 24}})
        }),

        contentBinding: "Forms.resident",
        childViews: "buttons isHOH firstName lastName atScene age gender relationship disposition".w(),

    		buttons: SC.FormView.row("", SC.View.design(SC.FlowedLayout, {
    			childViews: "addButton removeButton save".w(),
    			layoutDirection: SC.LAYOUT_HORIZONTAL,
    			layout: {height: 30, width: 330},
    			defaultFlowSpacing: {right: 10},

    			addButton: SC.ButtonView.design({
    				layout: {height: 30, width: 100},
    				title: "Add",
    				action: "addResident",
    				target: "Forms.residents",
    				controlSize: SC.HUGE_CONTROL_SIZE,

    				isEnabledBinding: "Forms.residents.canAddContent"
    			}),
    			removeButton: SC.ButtonView.design({
    				layout: {height: 30, width: 100},
    				title: "Remove",
    				action: "removeResident",
    				target: "Forms.residents",
    				controlSize: SC.HUGE_CONTROL_SIZE,
    				isEnabledBinding: "Forms.residents.canRemoveResident"
    			}),
    			save: SC.ButtonView.design({
    				layout: {height: 30, width: 100},
    				title: "Save",
    				action: "saveResident",
    				target: "Forms.resident",
    				controlSize: SC.HUGE_CONTROL_SIZE,
    				isEnabledBinding: "Forms.resident.isDirty"
    			}),
    		})),
        isHOH: SC.FormView.row(" ", SC.CheckboxView.design({ layout: {height: 24, width: 200}, title: "Head of Household"})),
        firstName: SC.FormView.row("First Name:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}, autoCorrect: NO})),
        lastName: SC.FormView.row("Last Name:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}, autoCorrect: NO})),
        atScene: SC.FormView.row(" ", SC.CheckboxView.design({ layout: {height: 24, width: 200}, title: "Present at Scene"})),
        age: SC.FormView.row("Age:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
        gender: SC.FormView.row("Gender:", SC.SegmentedView.design({
          allowsEmptySelection: YES,
          items: ["M", "F"],
          controlSize: SC.LARGE_CONTROL_SIZE,
          align: SC.ALIGN_LEFT,
          //layoutDirection: SC.LAYOUT_VERTICAL,
          layout: {width: 500, height: 30}
        })),
        relationship: SC.FormView.row("Relationship:", Forms.TextFieldView.design({ layout: {height: 24, width: 150}})),
        disposition: SC.FormView.row("Status:", SC.SegmentedView.design({
         allowsEmptySelection: YES,
          itemTitleKey: 'title',
          itemValueKey: 'value',
          itemsBinding: "Forms.lookups.residentDispositions",
          controlSize: SC.LARGE_CONTROL_SIZE,
          align: SC.ALIGN_LEFT,
          //layoutDirection: SC.LAYOUT_VERTICAL,
          layout: {width: 500, height: 30}
        })),
      })
    })
  }),

});
