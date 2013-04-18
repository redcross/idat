Forms.Chapter = SC.Record.extend(
/** @scope Forms.DABedroom.prototype */ {
  primaryKey: '_id',

  counties: SC.Record.toMany("Forms.County"),
  priceList: SC.Record.toMany("Forms.County"),

  name: SC.Record.attr(String),
  code: SC.Record.attr(String),

  cacChapterAddress1: SC.Record.attr(String),
  cacChapterAddress2: SC.Record.attr(String),
  cacChapterAddress3: SC.Record.attr(String)

});

Forms.County = SC.Record.extend(
/** @scope Forms.DABedroom.prototype */ {
  primaryKey: '_id',

  name: SC.Record.attr(String),
  code: SC.Record.attr(String),

});

