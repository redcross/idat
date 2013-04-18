// ==========================================================================
// Project:   Forms.cacItem
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
sc_require('controllers/controller.js');

Forms.cacItem = Forms.ObjectController.create(
/** @scope Forms.cacItem.prototype */ {
  //contentBinding: SC.Binding.single("Forms.cacList.selection"),
  // TODO: Add your own code here.

  changeHotel: function(sender) {
    Forms.hotel.set('selectMode', 'edit');
    Forms.hotel.set('lineItem', this.get('content'));
    Forms.hotels.selectObject(this.get('hotel'));

    Forms.hotelPage.hotelPane.append();
  },

  canDelete: function() {
    var allowed = YES;
    "Singles Doubles Triples Others".w().forEach(function(rt) {
      if (this.get('numberOf' + rt) !== 0)
        allowed = NO;
    }, this);
    return allowed && this.get('allowedToEdit');
  }.property("numberOfSingles", "numberOfDoubles", "numberOfTriples", "numberOfOthers", "allowedToEdit").cacheable(),


  removeLineItem: function() {
    var item = this.get('content'),
        controller = item.get('isHotel') ? Forms.hotelCacList : Forms.regularCacList;

    if (!controller.get('canRemoveContent')) {
      SC.AlertPane.error({
        message: "Can't Delete Line Item",
        description: "The form has been locked from changes.  You can unlock it from the 'CAC Issue' screen."
      });
      return;
    }

    controller.removeObject(item);
  },
}) ;
