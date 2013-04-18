// ==========================================================================
// Project:   Forms.CacPriceListItem Fixtures
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

sc_require('models/cac_price_list_item_model');

Forms.CACPriceListItem.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See
  // the example below.

  { guid: 1,
    itemClass: 2,
    name: "Groceries and Food for 1 Week",
    issuedPerPerson: true,
    type: "food"},

  { guid: 2,
    itemClass: 2,
    name: "Infant formula/supplies",
    issuedPerPerson: false,
    perFamilyPrice: 50},

  { guid: 3,
    itemClass: 2,
    name: "Clothing AND Shoes",
    issuedPerPerson: true,
    perPersonPrice: 130},

  { guid: 4,
    itemClass: 2,
    name: "Clothing Only",
    issuedPerPerson: true,
    perPersonPrice: 110},

  { guid: 5,
    itemClass: 2,
    name: "Shoes Only",
    issuedPerPerson: true,
    perPersonPrice: 20},

  { guid: 6,
    itemClass: 2,
    name: "Seasonal Garments",
    issuedPerPerson: true,
    perPersonPrice: 60},

  { guid: 7,
    itemClass: 2,
    name: "Laundry Supplies",
    issuedPerPerson: true,
    type: "laundrySupplies"},

  { guid: 8,
    itemClass: 2,
    name: "Laundry, Coin-Op",
    issuedPerPerson: true,
    type: "laundryCoinOp"},

  { guid: 9,
    itemClass: 2,
    name: "Dry Cleaning",
    issuedPerPerson: true,
    perPersonPrice: 15},

  { guid: 10,
    itemClass: 2,
    name: "Cleaning Supplies",
    issuedPerPerson: false,
    perFamilyPrice: 15},

  { guid: 11,
    itemClass: 2,
    name: "Transportation",
    issuedPerPerson: true,
    perPersonPrice: 40},

  { guid: 12,
    itemClass: 3,
    name: "Hotel",
    issuedPerPerson: true,
    type: "hotel"},

  { guid: 13,
    itemClass: 2,
    name: "Other Class 2",
    issuedPerPerson: true},

  { guid: 14,
    itemClass: 3,
    name: "Other Class 3",
    issuedPerPerson: true},

  { guid: 15,
    itemClass: 4,
    name: "Other Class 4",
    issuedPerPerson: true},

  { guid: 16,
    itemClass: 5,
    name: "Other Class 5",
    issuedPerPerson: true},
];
