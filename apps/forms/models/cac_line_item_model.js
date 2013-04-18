// ==========================================================================
// Project:   Forms.CacLineItem
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Forms.CACLineItem = SC.Record.extend(
/** @scope Forms.CACLineItem.prototype */ {
  //allView: "all_line_items",
  primaryKey: '_id',

  form: function() {
    return this.getPath('parentRecord');
  }.property('parentRecord'),
  family: function() {
    return this.getPath('form.parentRecord');
  }.property('form'),
  incident: function() {
    return this.getPath('family.incident');
  }.property('family'),

  priceWithoutContingency: function() {
    var total = this.get('totalPrice');
    if (this.get('isHotel')) return total - this.get('contingencyPrice');
    else return total;
  }.property('isHotel', 'totalPrice'),

  // TODO: Add your own code here.
  // TODO: Add your own code here.
	itemClass: SC.Record.attr(Number),
  priceListItem: SC.Record.toOne("Forms.CACPriceListItem"),
  hotel: SC.Record.toOne("Forms.Hotel", {inverse: 'lineItems'}),

	// Description on the cac form
	// IE: Food for 1 person for 1 week
	description: SC.Record.attr(String),
	hasCustomDescription: SC.Record.attr(Boolean),

	numberOfPeople: SC.Record.attr(Number),

	numberOfSingles: SC.Record.attr(Number, {defaultValue: 0}),
	numberOfDoubles: SC.Record.attr(Number, {defaultValue: 0}),
	numberOfTriples: SC.Record.attr(Number, {defaultValue: 0}),
	numberOfOthers: SC.Record.attr(Number, {defaultValue: 0}),
  checkInDate: SC.Record.attr(SC.DateTime),

  checkOutDate: function() {
    var ci = this.get('checkInDate'),
        nights = this.get('numberOfNights');
    if (SC.none(ci)) return null;
    return ci.advance({day: nights});
  }.property('checkInDate', 'numberOfNights'),

	unitPrice: SC.Record.attr(Number),
	totalPrice: SC.Record.attr(Number),
  contingencyPrice: SC.Record.attr(Number),

	selectedForIssue: SC.Record.attr(Boolean, {defaultValue: YES}),

	// Passthroughs for the table view
	familyUnitNumber: function() { return this.getPath('family.unitNumber'); }.property("family.unitNumber"),
  familyStreetDescription: function() { return this.getPath('family.streetDescription'); }.property("family.streetDescription"),
  familyHohName: function() { return this.getPath('family.hohName'); }.property("family.hohName"),
  hotelName: function() { return this.getPath('hotel.name'); }.property('hotel.name'),

  /*updateIncident: function() {
    var fam = this.get('family');
    if (fam && (this.get('status') & SC.Record.READY)) {
      this.set('incident', fam.get('incident'));
    } else {
      //this.set('incident', null);
    }
  }.observes("family"),*/

	numberOfRooms: function() {
	  return this.get('numberOfSingles') + this.get('numberOfDoubles') + this.get('numberOfTriples') + this.get('numberOfOthers');
	}.property('numberOfSingles', 'numberOfDoubles', 'numberOfTriples', 'numberOfOthers').cacheable(),

	updatePrices: function(force) {
	  var item = this.get('priceListItem');
	  if (!item) return;

	  var type = item.get('type');
	  var people = this.get('numberOfPeople');
	  var unitIsNull = SC.none(this.get('unitPrice'));
	  var hotel = this.get('hotel');
	  if (type === 'hotel' && !SC.none(hotel)) {

	    var total = 0, nights = this.get('numberOfNights');
	    total += hotel.get('singleRate') * this.get('numberOfSingles');
	    total += hotel.get('doubleRate') * this.get('numberOfDoubles');
	    total += hotel.get('tripleRate') * this.get('numberOfTriples');
	    total += hotel.get('otherRate') * this.get('numberOfOthers');

	    this.set('unitPrice', total);
	    this.set('contingencyPrice', total * nights * .25);
	    this.set('totalPrice', (total * nights) + this.get('contingencyPrice'));
      	
	  } else if (type === null) {
	    if (item.get('issuedPerPerson') === true) {
	      if (this.get('unitPrice') === null) {
	        this.set('unitPrice', item.get('perPersonPrice'));
	      }
	    } else {
	      if (this.get('unitPrice') === null) {
	        this.set('unitPrice', item.get('perFamilyPrice'));
	      }
	      this.set('numberOfPeople', 1);
	    }
	    this.set('totalPrice', this.get('unitPrice') * this.get('numberOfPeople'));
	  } else if (type === 'food') {
	    if (unitIsNull || force) {
  	    var price = 50;
  	    if (people > 1) {
  	      price = 75 + (20*(people-2));
  	    }
  	    this.set('unitPrice', price);
	    }
	    this.set('totalPrice', this.get('unitPrice'));
	  } else if (type === 'laundrySupplies') {
	    if (unitIsNull || force) {
  	    var price = 10;
  	    if (people >= 5)
  	      price = 15;
        this.set('unitPrice', price);
      }
	    this.set('totalPrice', this.get('unitPrice'));
	  } else if (type === 'laundryCoinOp') {
	    if (unitIsNull || force) {
        var price = 5 + (people * 5);
        if (price >= 55)
          price = 55;
        this.set('unitPrice', price);
      }
	    this.set('totalPrice', this.get('unitPrice'));
    } else if (type === 'hotelChicago') {
      var level = Math.min(Math.ceil(people / 4), 5), amount;
      switch (level) {
        case 0:
        case 1:
        case 2:
        case 3:
          amount = level * 200;
          break;
        case 4:
          amount = 700;
          break;
        case 5:
        default:
          amount = 800;
          break;
      }
      this.set('unitPrice', amount).set('totalPrice', amount);
    }
  },

	isHotel: function() {
	  return this.getPath("priceListItem.type")==="hotel";
	}.property("*priceListItem.type").cacheable(),

	_priceCalculator: function() {
	  this.updatePrices(false);
	}.observes("numberOfRooms", "unitPrice", "numberOfNights", "priceListItem", "hotel"),

	_priceForce: function() {
	  this.updatePrices(true);
	}.observes("numberOfPeople"),

	_descriptionUpdater: function() {
	  if (!this.get('hasCustomDescription')) {
	    var item = this.get('priceListItem');
	    if (!item) return;

	    var desc = item.get("name");
	    var str;
	    var count = this.get('numberOfPeople')
	    if (item.get('type')!=='hotel') {
  	    if (item.get('issuedPerPerson')) {
  	      str = "%@ for %@ %@".fmt(desc, count, count === 1 ? "person" : "people");
  	    } else {
  	      str = desc;
  	    }
  	  } else {
  	    var nights = this.get('numberOfNights');
  	    str = "%@ rooms for %@ %@ for %@ nights\n".fmt(this.get('numberOfRooms'), count, count === 1 ? "person" : "people", nights);
  	    var d = this.get('checkInDate');
  	  }
	    this.set('description', str);
	  }
	}.observes("numberOfPeople", "numberOfRooms", "priceListItem", "hotel"),

  nightsDescription: function() {
    var nights = this.get('numberOfNights');
    var d = this.get('checkInDate');
    str = "";
    if (!SC.none(d)) {
      for (var i = 0; i < nights; i++) {
        str = str + d.toFormattedString("%m/%d ");
        d = d.advance({day: 1});
      }
      str = str + "\nchecking out %@".fmt(d.toFormattedString("%m/%d "));
    }
    return str;
  }.property("numberOfNights", "checkInDate").cacheable(),

	_totalNotifier: function() {
	  var form = this.get('form');
	  if (!SC.none(form)) {
	    form.lineItemTotalChanged(this);
	  }
	}.observes("totalPrice"),

	_hotelNotifier: function() {
	  var hotel = this.get('hotel');
	  if (!SC.none(hotel)) {
	    hotel.notifyPropertyChange("roomBookingCount");
		}
	}.observes("numberOfRooms"),

	allowedToEdit: function() {
		//var family = this.get('family');
	  var form = this.get('form');
    return form ? !form.get('locked') : true;
	}.property('family', 'isHotel'),

}) ;

SC.mixin(Forms.CACLineItem, {
  isNestedRecord: YES, // datasource won't commit/create this
});
