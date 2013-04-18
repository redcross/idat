// ==========================================================================
// Project:   Forms.priceList
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.priceList = SC.ArrayController.create(
/** @scope Forms.priceList.prototype */ {

  // TODO: Add your own code here.
  addItem: function(sender) {
    var that = this;
    (function() {
      that.reallyAddItem(sender);
    }).invokeLater();
  },

  reallyAddItem: function(sender) {
    sender.get('pane').remove();
    var prototype = this.get('selection').firstObject();
    this.set('selection', []);

    if (SC.none(prototype)) return;

    if (prototype.get('type')==='hotel') {
      Forms.hotel.set('selectMode', 'add');
      Forms.hotel.set('priceListItem', prototype);
      Forms.hotels.set('selection', []);
      Forms.hotelPage.hotelPane.append();
      return;
    }

    var record = Forms.store.createRecord(Forms.CACLineItem, {
      _id: Forms.uuid.getUuid(),
      itemClass: prototype.get('itemClass'),
      description: prototype.get('name'),
      hasCustomDescription: false,
      numberOfPeople: Forms.family.get("numPeople"),
    });
    record.set('priceListItem', prototype);
    record.set('family', Forms.family.get('content'));
    record.updatePrices(false);
    

    Forms.family.createCACFormsIfNeeded();
    Forms.family.getPath('regularCacForm.lineItems').pushObject(record);

    Forms.regularCacList.selectObject(record);
  }

}) ;
