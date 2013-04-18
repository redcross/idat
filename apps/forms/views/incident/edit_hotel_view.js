sc_require('views/number_view');

Forms.EditHotelList = SC.ScrollView.design({
  
  contentView: SC.ListView.design({
    contentBinding: "Forms.hotels.arrangedObjects",
    selectionBinding: "Forms.hotels.selection",
    rowHeight: 44,

    contentValueKey: 'name',

    actOnSelect: YES,
    action: "hotelSelected",
  })
});

Forms.EditHotelForm = SC.ScrollView.design({

  showAddRemove: YES,

  contentView: Forms.FormView.design({

    childViews: "buttons name address1 address2 phone checkInDate numberOfNights singleRate doubleRate tripleRate otherRate singlesBooked doublesBooked triplesBooked othersBooked singlesAvailable doublesAvailable triplesAvailable othersAvailable".w(),
    contentBinding: "Forms.hotel",
    isEnabledBinding: "Forms.hotel.canEdit",


    name: Forms.FormView.textField("Name:"),
    address1: Forms.FormView.textField("Address:"),
    address2: Forms.FormView.textField("City:"),
    phone: Forms.FormView.textField("Phone:"),

    singleRate: Forms.FormView.textField("Per Single:", {type: 'number'}),
    doubleRate: Forms.FormView.textField("Per Double:", {type: 'number'}),
    tripleRate: Forms.FormView.textField("Per Triple:", {type: 'number'}),
    otherRate: Forms.FormView.textField("Per Other:", {type: 'number'}),

    numberOfNights: Forms.FormView.row("Num Nights:", Forms.NumberView.design({layout: {width: 150, height: 24}})),

    singlesBooked: Forms.FormView.row("Singles Booked:",  Forms.NumberView.design({layout: {width: 150, height: 24}})),
    doublesBooked: Forms.FormView.row("Doubles Booked:",  Forms.NumberView.design({layout: {width: 150, height: 24}})),
    triplesBooked: Forms.FormView.row("Triples Booked:",  Forms.NumberView.design({layout: {width: 150, height: 24}})),
    othersBooked: Forms.FormView.row("Others Booked:",  Forms.NumberView.design({layout: {width: 150, height: 24}})),

    checkInDate: Forms.FormView.row("Check In:", SCUI.DatePickerView.design(SC.ContentValueSupport, {valueBinding: ".date", layout: {width: 150, height: 24}, formatDate: "%m/%d/%Y",})),

    singlesAvailable: Forms.FormView.label("Singles Rem.: "),
    doublesAvailable: Forms.FormView.label("Doubles Rem.: "),
    triplesAvailable: Forms.FormView.label("Triples Rem.: "),
    othersAvailable: Forms.FormView.label("Others Rem.: "),

    buttons: Forms.FormView.row("", SC.View.design({
      layout: {height: 30, width: 180},
      childViews: "add remove".w(),

      add: SC.ButtonView.design({
        title: "Add",
        controlSize: SC.HUGE_CONTROL_SIZE,
        layout: {left: 0, top: 0, height: 30, width: 80},
        isEnabledBinding: "Forms.hotels.canAddContent",
        target: "Forms.hotels",
        action: "addHotel",
      }),

      remove: SC.ButtonView.design({
        title: "Remove",
        controlSize: SC.HUGE_CONTROL_SIZE,
        isEnabledBinding: SC.Binding.and("Forms.hotels.canRemoveContent", "Forms.hotels.hasSelection"),
        layout: {left: 100, top: 0, height: 30, width: 80},

        target: "Forms.hotels",
        action: "removeHotel"
      })
    }), {isVisibleBinding: SC.Binding.oneWay(".parentView.parentView.parentView.showAddRemove")}),
  }),
});

Forms.EditHotelDesktop = SC.View.extend({
  childViews: "hotelList scroll".w(),

  hotelList: Forms.EditHotelList.extend({
    layout: {left: 0, width: 300, top: 0, bottom: 0},
  }),

  scroll: Forms.EditHotelForm.extend({
    layout: {left: 320, right: 0, top: 0, bottom: 0},
  }),
});

Forms.EditHotelMobile = Forms.EditHotelList.extend({
  topToolbar: SC.ToolbarView.extend({
    childViews: "backButton addButton".w(),

    backButton: SC.ButtonView.extend({
      layout: {left: 7, height: 30, width: 100, centerY: 0},
      title: "Incident",
      controlSize: SC.HUGE_CONTROL_SIZE,
      themeName: "point-left",
      action: "pop",
    }),

    addButton: SC.ButtonView.extend({
      layout: {right: 7, height: 30, width: 80, centerY: 0},
      title: "Add",
      controlSize: SC.HUGE_CONTROL_SIZE,
      action: "addHotel",
      isEnabledBinding: "Forms.hotels.canAddContent",
    }),

    addHotel: function() {
      Forms.hotels.addHotel();
      Forms.incidentDetailPage.hotels.hotelSelected(YES); // yucky - should not need to know where the page is
    }
  }),

  detailView: Forms.EditHotelForm.extend({
    topToolbar: SC.ToolbarView.extend({
      childViews: "backButton removeButton".w(),

      backButton: SC.ButtonView.extend({
        layout: {left: 7, height: 30, width: 100, centerY: 0},
        title: "Hotels",
        controlSize: SC.HUGE_CONTROL_SIZE,
        themeName: "point-left",
        action: "back",
        back: function() {
          Forms.hotel.set('content', null);
          Forms.incidentDetailPage.getPath('mobilePane.navigation').pop();
        }
      }),

      removeButton: SC.ButtonView.extend({
        layout: {right: 7, height: 30, width: 80, centerY: 0},
        title: "Remove",
        controlSize: SC.HUGE_CONTROL_SIZE,
        action: "remove",
        isEnabledBinding: SC.Binding.and("Forms.hotels.canRemoveContent", "Forms.hotels.hasSelection"),
        remove: function() {
          Forms.hotels.removeHotel();
          Forms.hotel.set('content', null);
          Forms.incidentDetailPage.getPath('mobilePane.navigation').pop();
        },
      }),
    }),

    showAddRemove: NO,
  }),

  hotelSelected: function(force) {
    var view = this.get('detailView');

    if (force !== YES && !Forms.hotel.get('hasContent')) return;

    if (view.isClass) {
      view = view.create();
      this.set('detailView', view);
    }
    Forms.incidentDetailPage.getPath('mobilePane.navigation').push(view);
  },
});

Forms.EditHotelView = SC.browser.isMobile ? Forms.EditHotelMobile : Forms.EditHotelDesktop;


