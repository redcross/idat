// ==========================================================================
// Project:   Forms
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Forms = SC.Application.create(
  /** @scope Forms.prototype */ {

  NAMESPACE: 'Forms',
  VERSION: '0.3.0',
  BUILD_DATE: '%BUILDDATE%',

  showDebug: YES,

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  //store: SC.Store.create().from(SC.Record.fixtures)
  store: SC.Store.create().from('Forms.dataSource'),
  dataSource: PouchDB.DataSource.create({
    databaseName: null,

    upstreamDatabase: function() {
      return "%@//%@/%@".fmt(window.location.protocol, window.location.host, this.get('databaseName'));
    }.property().cacheable(),

    localDatabaseName: function() {
      return "%@%@-v1".fmt(SC.browser.isAndroid ? "websql://" : "", this.get('databaseName'));
    }.property().cacheable(),

  }),
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

SC.TableColumn = SC.Object.extend(SCTable.Column, {valueKeyBinding: ".key", nameBinding: '.title'});
SC.TableView = SCTable.TableView.extend({
  renderTableCellContent: function(tableView, renderContext, rowContent, rowIndex, column, columnIndex) {
    var formatter = column.get('formatter'),
        value = rowContent ? rowContent.get(column.get('valueKey')) : null;

    if (formatter) value = formatter(value);
    return renderContext.push('<div class=\"text\">%@</div>'.fmt(SC.RenderContext.escapeHTML(String(value))));
  },
});

SC.browser.isMobile = (SC.browser.device === SC.DEVICE.ipod || SC.browser.device === SC.DEVICE.iphone || SC.browser.device === SC.DEVICE.android);

window.IDBTransaction = {READ_WRITE: 'readwrite'};