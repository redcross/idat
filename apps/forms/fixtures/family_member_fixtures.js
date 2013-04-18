// ==========================================================================
// Project:   Forms.FamilyMember Fixtures
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

sc_require('models/family_member_model');

Forms.FamilyMember.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See
  // the example below.

   { guid: 1,
     firstName: "Michael",
     lastName: "Scott",
     age: "30s",
     atScene: true,
     isHOH: true,
     family: 1,
     disposition: "ok",
     gender: "M",
     relationship: "Head of Household" },

   { guid: 2,
     firstName: "Dwight",
     lastName: "Schrute",
     disposition: "d",
     family: 1,
     isHOH: false,
     atScene: false,
     age: "20s",
     gender: "M",
     relationship: "Comic Relief" },

   { guid: 3,
     firstName: "Jim",
     lastName: "Halpert",
     disposition: "m",
     gender: "M",
     atScene: false,
     relationship: "Something",
     age: "20s",
     family: 1 },
  //
  // { guid: 4,
  //   firstName: "Pam",
  //   lastName: "Beesly" },
  //
  // { guid: 5,
  //   firstName: "Ryan",
  //   lastName: "Howard" }

];
