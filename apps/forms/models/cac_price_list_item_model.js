// ==========================================================================
// Project:   Forms.CacPriceListItem
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Forms.CACPriceListItem = SC.Record.extend(
/** @scope Forms.CacPriceListItem.prototype */ {
  allView: 'all_price_list_items',
  primaryKey: '_id',

  // TODO: Add your own code here.
	itemClass: SC.Record.attr(Number),
	name: SC.Record.attr(String),

	// to configure behavior for setting format and the like
	type: SC.Record.attr(String),
	issuedPerPerson: SC.Record.attr(Boolean),

	// Notes when editing the item.
	description: SC.Record.attr(String),

	perPersonPrice: SC.Record.attr(Number),
	perFamilyPrice: SC.Record.attr(Number),

	title: function() {
	  return "[Class %@] %@".fmt(this.get('itemClass'), this.get('name'));
	}.property("itemClass", "name"),

}) ;
