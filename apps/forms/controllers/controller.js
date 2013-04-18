Forms.ObjectController = SC.ObjectController.extend({
  isDirty: function() {
    if (!this.get('hasContent')) return false;
    return !!(this.get('status') == SC.Record.READY_DIRTY)
  }.property("status", 'hasContent').cacheable(),

  canEdit: function() {
    if (!this.get('hasContent')) return false;
    if (!this.get('isEditable')) return false;
    return !!(this.get('status') & SC.Record.READY);
  }.property('hasContent', 'status', 'isEditable').cacheable(),
})