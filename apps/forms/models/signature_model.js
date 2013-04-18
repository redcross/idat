Forms.Signature = SC.Record.extend({
  primaryKey: '_id',

  name: SC.Record.attr(String),
  data: SC.Record.attr(Object),
  image: SC.Record.attr(String),
  signedAt: SC.Record.attr(SC.DateTime),

  formattedSignedAt: function() {
    return this.get('signedAt').toFormattedString("%m/%d/%Y");
  }.property('signedAt').cacheable(),
});

SC.mixin(Forms.Signature, {
  isNestedRecord: YES, // datasource won't commit/create this
});