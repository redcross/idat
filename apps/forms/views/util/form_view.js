sc_require('views/util/text_field');

Forms.FormView = SC.FormView.extend({
  controlSize: (SC.browser.isMobile ? SC.REGULAR_CONTROL_SIZE : SC.LARGE_CONTROL_SIZE),

  exampleRow: function() {
    var cs = this.get('controlSize');
    return SC.FormRowView.extend({
      labelView: SC.FormRowView.LabelView.extend({ 
        textAlign: SC.ALIGN_RIGHT, 
        controlSize: cs, 
        layout: {height: 24},
        isEditable: function() { return false; }.property()
      }),
    })
  }.property(),

  createChildViews: function() {
    sc_super();
    var that = this;

    var childViews = this.get('childViews');
    childViews.forEach(function(el) {
      el.get('childViews').forEach(function(cv) {
        if (!cv.isEnabledBinding)
          cv.isEnabledBinding = SC.Binding.from('isEnabled', this).to('isEnabled', cv).oneWay().connect();
        if (!cv.isEditableBinding)
          cv.isEditableBinding = SC.Binding.from('isEnabled', this).to('isEditable', cv).oneWay().connect();
      }, this)
    }, this);
  },
});

SC.mixin(Forms.FormView, {
  row: function(label, fieldType, ext) {
    if (label.isClass) {
      ext = fieldType;
      fieldType = label;
      label = null;
    }
    // now, create a hash (will be used by the parent form's exampleRow)
    if (!ext) {
      ext = {};
    } else {
      ext = SC.clone(ext);
    }

    ext.canWrap = NO;
    fieldType = fieldType.extend({
      fillRemaining: SC.browser.isMobile
    });

    ext.label = label;
    ext.childViews = ["_singleField"];
    ext._singleField = fieldType;
    ext.shouldResizeWidth = NO;
    return ext;
  },

  label: function(label, fieldExt, ext) {
    fieldExt = fieldExt || {};
    var klass = SC.LabelView.extend({
      layout: {height: 30, width: 200},
      isEditable: function() { return false; }.property(),
      controlSize: SC.LARGE_CONTROL_SIZE,
    }, fieldExt);

    return this.row(label, klass, ext);
  },

  textField: function(label, fieldExt, ext) {
    fieldExt = fieldExt || {};

    var klass = Forms.TextFieldView.extend({
      layout: {width: 150, height: 24},
    }, fieldExt);

    return this.row(label, klass, ext);
  },

  segmented: function(label, fieldExt, ext) {
    fieldExt = fieldExt || {};

    var klass = SC.SegmentedView.extend({
      layout: {width: 100, height: 24},
      shouldAutoResize: YES,
      controlSize: SC.LARGE_CONTROL_SIZE,
      align: SC.ALIGN_LEFT,
      itemTitleKey: 'title',
      itemValueKey: 'value',
      layoutDirection: SC.browser.isMobile ? SC.LAYOUT_VERTICAL : SC.LAYOUT_HORIZONTAL,
      fillRemaining: SC.browser.isMobile,
    }, fieldExt);

    ext = ext || {};
    ext = SC.extend(SC.clone(ext), {
      shouldResizeWidth: !SC.browser.isMobile,
    });

    return this.row(label, klass, ext);
  }
})