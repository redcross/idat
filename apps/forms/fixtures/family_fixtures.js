// ==========================================================================
// Project:   Forms.Family Fixtures
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

sc_require('models/family_model');

Forms.Family.FIXTURES = [

  { guid: 1,
      streetNumber: "85",
      streetName: "Second St",
      unitNumber: "8th",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      phoneNumber: "(415) 427-8010",
      phoneType: "Work",
      numPeople: 6,
      numBeds: 4,
      needsHousing: true,
      incident: 1,
      form1475Needs: ['dhs', 'meds'],
      releaseAgencies: ['sfhsa'],
      residents: [1,2,3]
      }

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See
  // the example below.

  // { guid: 1,
  //   firstName: "Michael",
  //   lastName: "Scott" },
  //
  // { guid: 2,
  //   firstName: "Dwight",
  //   lastName: "Schrute" },
  //
  // { guid: 3,
  //   firstName: "Jim",
  //   lastName: "Halpert" },
  //
  // { guid: 4,
  //   firstName: "Pam",
  //   lastName: "Beesly" },
  //
  // { guid: 5,
  //   firstName: "Ryan",
  //   lastName: "Howard" }

];
