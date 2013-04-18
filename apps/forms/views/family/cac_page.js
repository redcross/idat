// ==========================================================================
// Project:   Forms.cacPage
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

// This page describes a part of the interface for your application.
var cacTable = SC.TableView.design({

  columns: [
    SC.TableColumn.create({key: "itemClass", title: "Class", width: 70, isResizable: NO, isReorderable: NO}),
    SC.TableColumn.create({key: "description", title: "Description", width: 200, isResizable: YES, isReorderable: NO, isFlexible: YES}),
    SC.TableColumn.create({key: "unitPrice", title: "Unit", width: 60, isResizable: NO, isReorderable: NO}),
    SC.TableColumn.create({key: "totalPrice", title: "Total", width: 70, isResizable: NO, isReorderable: NO}),
  ]
});

sc_require('views/util/form_view');
sc_require('views/util/text_field');
sc_require('views/util/number_view');

Forms.cacPage = SC.Page.design({

  // Add your views here.  Ex:

  // mainView: SC.View.design({
  //   layout: { top: 0, left: 0, right: 0, height: 0 }
  // })
  cacView: SC.View.design({
    childViews: "regularTable hotelTable detailView".w(),

    regularTable: cacTable.extend({
      layout: {left: 0, right: 340, top: 20, height: 200},
      contentBinding: "Forms.regularCacList.arrangedObjects",
      selectionBinding: "Forms.regularCacList.selection",
    }),

    hotelTable: cacTable.extend({
      layout: {left: 0, right: 340, top: 220, bottom: 0},
      contentBinding: "Forms.hotelCacList.arrangedObjects",
      selectionBinding: "Forms.hotelCacList.selection",
    }),

    detailView: Forms.FormView.design({
      layout: {width: 320, right: 0, top: 20, bottom: 0},
      childViews: "buttons description numberOfPeople numberOfNights unitPrice contingencyPrice checkInDate numberOfSingles numberOfDoubles numberOfTriples numberOfOthers hotelName editHotel".w(),
      contentBinding: "Forms.cacItem",
      isEnabledBinding: "Forms.cacItem.allowedToEdit",

      buttons: SC.FormView.row("", SC.View.design({
        layout: {height: 30, width: 200},
        childViews: "add remove".w(),

        add: SC.ButtonView.design({
          title: "Add",
          controlSize: SC.HUGE_CONTROL_SIZE,
          layout: {left: 0, top: 0, height: 30, width: 80},
          isEnabledBinding: SC.Binding.and("Forms.hotelCacList.canAddContent", "Forms.regularCacList.canAddContent"),
          action: "addLineItem",

          addLineItem: function() {
            Forms.cacPage.get('priceListPane').popup(this, SC.PICKER_POINTER);
          }
        }),

        remove: SC.ButtonView.design({
          title: "Remove",
          controlSize: SC.HUGE_CONTROL_SIZE,
          isEnabledBinding: SC.Binding.and("Forms.cacItem.hasContent", "Forms.cacItem.canDelete"),
          layout: {left: 100, top: 0, height: 30, width: 80},

          target: "Forms.cacItem",
          action: "removeLineItem"
        })
      })),

      description: SC.FormView.row("Description: ", Forms.TextFieldView.design({
        layout: {width: 150, height: 100}, 
        isTextArea: YES,
        customDescriptionBinding: "*content.hasCustomDescription",
        canEditBinding: "Forms.cacItem.allowedToEdit",
        isEditable: function() {
          return this.get('canEdit') && this.get('customDescription');
        }.property('canEdit', 'customDescription')
      })),
      numberOfPeople: SC.FormView.row("Num People: ", Forms.NumberView.design({layout: {width: 150, height: 24}}), {
        isVisibleBinding: SC.Binding.from("Forms.cacItem*priceListItem.issuedPerPerson"),
        isVisible: NO,
      }),
      unitPrice: SC.FormView.row("$ Each: ", Forms.TextFieldView.design({layout: {width: 150, height: 24}}), {
        isVisibleBinding: SC.Binding.not("Forms.cacItem.isHotel")
      }),
      contingencyPrice: SC.FormView.row("$ Contingency: ", Forms.TextFieldView.design({layout: {width: 150, height: 24}}), {
        isVisibleBinding: SC.Binding.oneWay("Forms.cacItem.isHotel")
      }),
      numberOfSingles: SC.FormView.row("Singles: ", Forms.NumberView.design({layout: {width: 150, height: 24}}), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.cacItem.isHotel")
      }),
      numberOfDoubles: SC.FormView.row("Doubles: ", Forms.NumberView.design({layout: {width: 150, height: 24}}), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.cacItem.isHotel")
      }),
      numberOfTriples: SC.FormView.row("Triples: ", Forms.NumberView.design({layout: {width: 150, height: 24}}), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.cacItem.isHotel")
      }),
      numberOfOthers: SC.FormView.row("Others: ", Forms.NumberView.design({layout: {width: 150, height: 24}}), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.cacItem.isHotel")
      }),
      numberOfNights: SC.FormView.row("Nights: ", Forms.NumberView.design({layout: {width: 150, height: 24}}), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.cacItem.isHotel")
      }),
      checkInDate: SC.FormView.row("Check In: ", SCUI.DatePickerView.design(SC.ContentValueSupport, {layout: {width: 150, height: 24}, valueBinding: ".date"}), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.cacItem.isHotel")
      }),
      hotelName: SC.FormView.row("Hotel: ", SC.LabelView.design({layout: {width: 150, height: 24}, controlSize: SC.LARGE_CONTROL_SIZE}), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.oneWay("Forms.cacItem.isHotel")
      }),
      editHotel: SC.FormView.row("", SC.ButtonView.design({
        layout: {width: 150, height: 30},
        controlSize: SC.HUGE_CONTROL_SIZE,
        title: "Change Hotel",
        target: "Forms.cacItem",
        action: "changeHotel"
      }), {
        isVisible: NO,
        isVisibleBinding: SC.Binding.from("Forms.cacItem.isHotel")
      }),
    })
  }),

  priceListPane:  SC.PickerPane.extend({
    theme: 'popover',
    layout: {width: 320, height: 480},
    contentView: SC.WorkspaceView.design({
      contentView: SC.ScrollView.design({
        contentView: SC.ListView.design({
          contentBinding: "Forms.priceList.arrangedObjects",
          selectionBinding: "Forms.priceList.selection",
          contentValueKey: 'title',
          actOnSelect: YES,
          target: "Forms.priceList",
          action: "addItem",
          rowHeight: 30,
        }),
      }),
    }),
  }),

  cacIssue: SC.View.design({
    childViews: "regularView hotelView".w(),

    regularView: Forms.CACInfoView.design({
      layout: {width: 340, left: 0},
      contentBinding: "Forms.family.regularCacForm",
      familyBinding: "Forms.family.content",
      isHotel: NO,
      title: 'Food/Clothing',
    }),

    hotelView: Forms.CACInfoView.design({
      layout: {left: 350, width: 340},
      contentBinding: "Forms.family.hotelCacForm",
      familyBinding: "Forms.family.content",
      isHotel: YES,
      title: 'Hotel'
    }),
  }),

  captureSignaturePane: SC.PanelPane.create({
    layout: {width: 800, height: 600, centerX: 0, centerY: 0},

    delegate: null,
    form: null,

    signedBy: null,

    sigDone: function() {
      var view = this.contentView.contentView.sigView.sig;

      var record = Forms.store.createRecord(Forms.Signature, {
        _id: Forms.uuid.getUuid(),
        name: this.get('signedBy')
      });
      record.set('signedAt', SC.DateTime.create());
      record.set('data', view.get('value'));
      record.set('image', view.get('imageData'));

      console.log(record, record.toString());

      this.remove();
      var delegate = this.get('delegate');
      if (!SC.none(delegate)) {
        delegate.signaturePaneDidComplete(record);
      }
    },

    show: function() {
      var view = this.contentView.contentView.sigView.sig,
          role = this.get('signatureRole');

      if (role == 'client') {
        this.set('signedBy', Forms.family.get('hohName'));
      } else {
        this.set('signedBy', Forms.loginController.get('name'));
      }
      
      this.append();
      view.set('value', null);
    },

    isValid: function() {
      var sig = this.get('signedBy');
      return sig && sig.trim() !== '';
    }.property('signedBy'),

    contentView: SC.WorkspaceView.design({

      topToolbar: SC.ToolbarView.design({
        childViews: "doneButton cancelButton".w(),

        doneButton: SC.ButtonView.design({
          layout: {height: 30, centerY: 0, right: 7, width: 80},
          controlSize: SC.HUGE_CONTROL_SIZE,
          title: "Done",
          isDefault: YES,
          action: "sigDone",
          isEnabledBinding: ".pane.isValid",
        }),

        cancelButton: SC.ButtonView.design({
          layout: {height: 30, centerY: 0, left: 7, width: 80},
          controlSize: SC.HUGE_CONTROL_SIZE,
          title: "Cancel",
          action: "remove",
        })
      }),

      contentView: SC.View.design({
        layout: {centerX: 0, centerY: 0, width: 300, height: 600},
        childViews: ['nameLabel', 'nameField', 'sigView', 'clientLegalField'],

        nameLabel: SC.LabelView.extend({
          value: "Signed By: ",
          controlSize: SC.LARGE_CONTROL_SIZE,
          layout: {width: 100, height: 30, left: 10, top: 20}
        }),

        nameField: SC.TextFieldView.extend({
          valueBinding: '.pane.signedBy',
          controlSize: SC.LARGE_CONTROL_SIZE,
          layout: {width: 100, height: 30, left: 140, top: 20}
        }),

        clientLegalField: SC.LabelView.extend({
          value: "I certify that I have received the American Red Cross CLIENT ASSISTANCE CARD with the account number shown above.  " + 
                "I agree to use this CLIENT ASSISTANCE CARD to obtain only the goods and services listed above related to needs resulting from a disaster.  " + 
                "I also acknowledge that I will not be issued funds for items for which I have already been assisted as noted above.  " + 
                "I have received a copy of and agree to the associated CLIENT ASSISTANCE CARD Terms and Conditions.",
          layout: {left: 10, right: 10, top: 70, height: 75},
          roleBinding: '.pane.signatureRole',
          isVisible: function() {
            return this.get('role') == 'client';
          }.property('role'),
        }),

        sigView: SC.View.extend({
          layout: {centerX: 0, centerY: 0, width: 600, height: 150},
          childViews: 'sig'.w(),
          sig: Signature.SignatureView.design({
          })
        })
      })
    })
  })
});
