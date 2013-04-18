// ==========================================================================
// Project:   Forms.DaBedroomView
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Forms.DABedroomView = SC.View.extend(SC.FlowedLayout,
/** @scope Forms.DaBedroomView.prototype */ {

  // TODO: Add your own code here.

  classNames: ["border"],

  removeBed: function() {
    var r = this.get('content');
    if (!SC.none(r)) {
      //r.set('form', null);
      Forms.daBedrooms.removeObject(r);
      //Forms.store.destroyRecord(r);
    }
  },

  childViews: "damages infoForm".w(),

  layout: {width: 900},
  layoutDirection: SC.LAYOUT_HORIZONTAL,
  canWrap: NO,

  damages: Forms.FormView.design({
    controlSize: SC.REGULAR_CONTROL_SIZE,
    layout: {height: 100, width: 400},

    childViews: "title damageLevel damageCause bedframe mattress clothesStatus shoesStatus pillowsStatus linensStatus".w(),
    //layoutDirection: SC.LAYOUT_HORIZONTAL,
    contentBinding: ".parentView.content",
    isEnabledBinding: SC.Binding.and("Forms.daResidence.canEdit", "Forms.daResidence.isNotCompleted"),

    title: SC.LabelView.extend({
      textAlign: SC.ALIGN_CENTER,
      value: "Bedroom",
      layout: {height: 24},
      controlSize: SC.LARGE_CONTROL_SIZE
    }),

    damageLevel: SC.FormView.row("Damage:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      itemsBinding: "Forms.lookups.damageLevels",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),

    damageCause: SC.FormView.row("Cause:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      allowsMultipleSelection: YES,
      itemsBinding: "Forms.lookups.damageCauses",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      valueAlwaysMultiple: true,
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),

    bedframe: SC.FormView.row("Frame:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      itemsBinding: "Forms.lookups.okCleanedDestroyed",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),

    mattress: SC.FormView.row("Mattress:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      itemsBinding: "Forms.lookups.okCleanedDestroyed",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),

    clothesStatus: SC.FormView.row("Clothes:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      itemsBinding: "Forms.lookups.okCleanedDestroyed",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),

    shoesStatus: SC.FormView.row("Shoes:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      itemsBinding: "Forms.lookups.okCleanedDestroyed",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),

    pillowsStatus: SC.FormView.row("Pillows:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      itemsBinding: "Forms.lookups.okCleanedDestroyed",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),

    linensStatus: SC.FormView.row("Linens:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      itemsBinding: "Forms.lookups.okCleanedDestroyed",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),
  }),

  infoForm: Forms.FormView.design({
    controlSize: SC.REGULAR_CONTROL_SIZE,
    childViews: "remove residentName notes instructions bedSize bedSizeOther".w(),
    layout: {width: 325},
    contentBinding: ".parentView.content",
    isEnabledBinding: SC.Binding.and("Forms.daResidence.canEdit", "Forms.daResidence.isNotCompleted"),

    remove: SC.FormView.row("", SC.ButtonView.design({
      title: "Remove",
      //controlSize: SC.HUGE_CONTROL_SIZE,
      //isEnabledBinding: SC.Binding.and(".parentView.parentView.controller.canRemoveContent", ".parentView.parentView.controller.hasSelection"),
      layout: {left: 100, top: 0, height: 24, width: 80},

      action: "removeBed"
    })),

    residentName: SC.FormView.row("Name:", SC.SelectView.design({
      itemsBinding: "Forms.residents.arrangedObjects",
      itemValueKey: "fullName",
      itemTitleKey: "fullName",
      emptyName: '',
      title: "Remove",
      //controlSize: SC.HUGE_CONTROL_SIZE,
      //isEnabledBinding: SC.Binding.and(".parentView.parentView.controller.canRemoveContent", ".parentView.parentView.controller.hasSelection"),
      layout: {left: 100, top: 0, height: 24, width: 225},

      action: "removeBed"
    })),

    notes: SC.FormView.row("Notes:", SC.TextFieldView.design({
      isTextArea: YES,
      layout: {width: 225, height: 75}
    })),

    instructions: SC.FormView.row("", SC.View.design({
      layout: {width: 225, height: 75},
      childViews: 'label'.w(),

      label: SC.LabelView.design({
        value: "Include: location of room (ie, 3rd door on the left), resident names if known, and any other relevant details."
      })
      
    })),

    bedSize: SC.FormView.row("Size:", SC.SegmentedView.design({
      allowsEmptySelection: YES,
      itemsBinding: "Forms.lookups.bedSizes",
      itemTitleKey: 'title',
      itemValueKey: 'value',
      //controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      //layoutDirection: SC.LAYOUT_VERTICAL,
      layout: {width: 250, height: 24}
    })),

    bedSizeOther: SC.FormView.row("Size:", SC.TextFieldView.design({
      layout: {width: 225, height: 30}
    }), {
      isVisible: false,
      isVisibleBinding: SC.Binding.oneWay("*content.bedSize").transform(function(el) {
        return el && (el === 'other');
      })
    }),

  })

});
