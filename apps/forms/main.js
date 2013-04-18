// ==========================================================================
// Project:   Forms
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
sc_require('data-sources/uuid');
sc_require('data-sources/notification_client')

Forms.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably
  // create multiple pages and panes.


  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: Forms.contactsController.set('content',Forms.contacts);

  //var incidents = Forms.store.find(SC.Query.local())

  //Forms.familyDetailPage.awake();

  //Forms.priceList.set('content', Forms.store.find(Forms.CACPriceListItem));

  //Forms.notificationClient = Forms.CouchNotificationClient.create({dbName: 'forms-dev', useLongPoll: YES});

  Forms.incidentDetails.set('content', Forms.incidentDetailTree);

  Forms.statechart.initStatechart();

  /*PouchDB.ConflictResolver.create({
    database: Forms.dataSource.get('localDatabaseName'),
  }).awake();*/

  //SC.Benchmark.verbose = YES;
} ;

function main() { Forms.main(); }
