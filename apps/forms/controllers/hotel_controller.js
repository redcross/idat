// ==========================================================================
// Project:   Forms.hotel
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.hotel = Forms.ObjectController.create(
/** @scope Forms.hotel.prototype */ {

  contentBinding: SC.Binding.single("Forms.hotels.selection"),
  // TODO: Add your own code here.

  selectMode: null,
  lineItem: null,
  priceListItem: null,

  observeSave: function() {
    //Forms.store.commitRecords();
  }.observes('content'),

  hotelSelected: function(sender) {
    sender.get('pane').remove();
    var mode = this.get('selectMode');

    if (mode === 'add') {
      var prototype = this.get('priceListItem');

      var record = {
        itemClass: prototype.get('itemClass'),
        description: prototype.get('name'),
        hasCustomDescription: false,
        numberOfPeople: Forms.family.get("numPeople"),
        numberOfNights: this.get('numberOfNights'),
        unitPrice: this.get('pricePerNight'),
      };
      Forms.family.getPath('hotelCacForm.lineItems').pushObject(record);
      record = Forms.family.getPath('hotelCacForm.lineItems').lastObject();

      record.set('checkInDate', this.get('checkInDate'));
      record.set('priceListItem', prototype);
      record.set('hotel', this.get('content'));
      //record.set('incident', this.get('incident'));
      record.updatePrices(false);
      Forms.hotelCacList.selectObject(record);

    } else if (mode === 'edit') {
      var record = this.get('lineItem');
      record.set('hotel', this.get('content'));
    }

    this.set('content', null);
  }

}) ;
