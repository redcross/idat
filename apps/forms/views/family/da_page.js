sc_require('views/family/da_bedroom_view');
sc_require('views/util/sign_off_view');
sc_require('views/util/form_view');

Forms.daPage = SC.Page.design({
  name: 'da',

  get: function(path) {
    var ret, key = 'sc-page-get-da-' + path;
    SC.Benchmark.start(key);
    ret = sc_super();
    SC.Benchmark.end(key);
    return ret;
  },

  getPath: function(path) {
    var ret, key = 'sc-page-get-da-' + path;
    SC.Benchmark.start(key);
    ret = sc_super();
    SC.Benchmark.end(key);
    return ret;
  },

  daMaster: SC.ScrollView.design({
    layout: {top: 20},
    
    contentView: Forms.FormView.design({
      isEnabledBinding: SC.Binding.and("Forms.daResidence.canEdit", "Forms.daResidence.isNotCompleted"),
      contentBinding: "Forms.daResidence.content",

      exampleRow: SC.FormRowView.extend({
        labelView: SC.FormRowView.LabelView.extend({ textAlign: SC.ALIGN_RIGHT, controlSize: SC.LARGE_CONTROL_SIZE, layout: {height: 24}})
      }),

      childViews: "completedBy unitDamage gasOn electricOn waterOn freshFoodStatus storedFoodStatus bedroomButtons bedlist".w(),

      /*completedBy: SC.FormView.row("Completed by:", Forms.SignOffView.design({
        isEnabledBinding: "Forms.daResidence.canEdit",
        layout: {width: 500, height: 30}
      })),*/
      completedBy: SC.FormView.row("Completed by:", Forms.TextFieldView.design({
        //isEnabledBinding: "Forms.daResidence.canEdit",
        layout: {width: 300, height: 30}
      })),

      unitDamage: SC.FormView.row("Damage:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemsBinding: "Forms.lookups.damageLevels",
        itemTitleKey: 'title',
        itemValueKey: 'value',
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      gasOn: SC.FormView.row("Gas:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemsBinding: "Forms.lookups.onOffUnknown",
        itemTitleKey: 'title',
        itemValueKey: 'value',
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      electricOn: SC.FormView.row("Electric:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemsBinding: "Forms.lookups.onOffUnknown",
        itemTitleKey: 'title',
        itemValueKey: 'value',
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      waterOn: SC.FormView.row("Water:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemsBinding: "Forms.lookups.onOffUnknown",
        itemTitleKey: 'title',
        itemValueKey: 'value',
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      storedFoodStatus: SC.FormView.row("Stored Food:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemsBinding: "Forms.lookups.okDestroyed",
        itemTitleKey: 'title',
        itemValueKey: 'value',
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      freshFoodStatus: SC.FormView.row("Fresh Food:", SC.SegmentedView.design({
        allowsEmptySelection: YES,
        itemsBinding: "Forms.lookups.okDestroyed",
        itemTitleKey: 'title',
        itemValueKey: 'value',
        controlSize: SC.LARGE_CONTROL_SIZE,
        align: SC.ALIGN_LEFT,
        //layoutDirection: SC.LAYOUT_VERTICAL,
        layout: {width: 500, height: 30}
      })),

      bedroomButtons: SC.FormView.row("Bedrooms:", SC.View.design({
        layout: {height: 30, width: 200},
        childViews: "add".w(),

        add: SC.ButtonView.design({
          title: "Add",
          controlSize: SC.HUGE_CONTROL_SIZE,
          layout: {left: 0, top: 0, height: 30, width: 80},
          target: "Forms.daBedrooms",
          action: "addBedroom",
        })
      })),

      bedlist: SC.ListView.design({
        content: [],
        contentBinding: "Forms.daBedrooms.arrangedObjects",
        exampleView: Forms.DABedroomView,
        rowHeight: 300,
        classNames: "bedrooms-collection".w(),
      }),
    })
  }),
});