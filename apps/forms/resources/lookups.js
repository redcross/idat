Forms.lookups = SC.Object.create({
  lookup: function(lookupName, val, valueKey) {
    valueKey = valueKey || 'title';
    var lookup = this.get(lookupName) || [], 
        ret = lookup.find(function(el) {return el.value === val});
    return (valueKey in ret && ret[valueKey]) || val;
  },

  lookupList: function(lookupName, vals, valueKey) {
    var that = this;
    if (!SC.isArray(vals)) return [];

    return vals.map(function(v) {
      return that.lookup(lookupName, v, valueKey);
    });
  },

  languages: [
    {title: "English", value: "english"},
    {title: "Spanish", value: "spanish"},
    {title: "Chinese", value: "chinese"},
    //{title: "Chinese (Cantonese)", value: "chinese-cantonese"},
    {title: "Vietnamese", value: "vietnamese"}
  ],

  form1475:  [
    {value: 'meds', title: 'Lost Medication'},
    {value: 'glasses', title: 'Prescription Eyeglasses'},
    {value: 'dhs', title: 'DHS (Other)'},
    {value: 'dmhs', title: 'DMHS'},
    {value: 'other', title:'Other'}
  ],

  residenceTypes: [
    {value: 'apartment', title: 'Apartment'},
    {value: 'sro', title: 'SRO'},
    {value: 'house', title: 'Single Family Home'},
    {value: 'flat', title: 'Flat/Duplex'},
    {value: 'mobilehome', title: 'Mobile Home'},
  ],

  ownershipTypes:  [
    {value: 'own', title: 'Owned'},
    {value: 'rent-furnished', title: 'Rented Furnished'},
    {value: 'rent', title: 'Rented Unfurnished'},
  ],

  insuranceTypes:  [
    {value: 'none', title: 'None', inSig: "no"},
    {value: 'homeowners', title: 'Homeowner\'s', inSig: "homeowner's"},
    {value: 'renters', title: 'Renter\'s', inSig: "renter's"},
  ],

  releaseAgencies:  [
    {value: 'sfhsa', title: 'SF Human Services Agency'},
    {value: 'tzuchi', title: 'Tzu Chi'},
    {value: 'other', title: 'Other (Specify)'},
  ],

  assistanceGiven:  [
    {value: 'housing', title: 'Temporary Housing'},
    {value: 'food', title: 'Food'},
    {value: 'clothing', title: 'Clothing'},
    {value: 'transportation', title: 'Transportation'},
    {value: 'comfortkits', title: 'Comfort Kits'},
    {value: 'other', title: 'Other'},
  ],

  residentDispositions:  [
    {value: 'ok', title: 'OK'},
    {value: 'i', title: 'Inj.'},
    {value: 'h', title: 'Hosp.'},
    {value: 'm', title: 'Miss.'},
    {value: 'd', title: 'Dec.'},
  ],

  identificationTypes:  [
    {value: 'dl', title: 'DL/Govt. ID'},
    {value: 'bill', title: 'Utility Bill'},
    {value: 'owner', title: 'Building Owner/Mgr'},
    {value: 'other', title: 'Other'},
  ],

  damageLevels:  [
    {value: 'none', title: 'None'},
    {value: 'minor', title: 'Minor'},
    {value: 'major', title: 'Major'},
    {value: 'destroyed', title: 'Destroyed'},
    {value: 'inaccessible', title: 'Inacc.'},
  ],

  damageCauses:  [
    {value: 'fire', title: 'Fire'},
    {value: 'smoke', title: 'Smoke'},
    {value: 'water', title: 'Water'},
    {value: 'ff', title: 'FF Efforts'},
  ],

  onOffUnknown:  [
    {value: 'on', title: 'On'},
    {value: 'off', title: 'Off'},
    {value: 'unknown', title: 'Unknown'},
  ],

  okDestroyed:  [
    {value: 'ok', title: 'Ok'},
    {value: 'destroyed', title: 'Destroyed'},
    {value: 'unknown', title: 'Unknown'},
  ],

  okCleanedDestroyed:  [
    {value: 'ok', title: 'Ok'},
    {value: 'cleanable', title: 'Cleanable'},
    {value: 'destroyed', title: 'Destroyed'},
    {value: 'unknown', title: 'Unknown'},
  ],

  bedSizes:  [
    {value: 'twin', title: 'Twin'},
    {value: 'double', title: 'Double'},
    {value: 'queen', title: 'Queen'},
    {value: 'king', title: 'King'},
    {value: 'other', title: 'Other'},
  ],

  incidentTypes:  [
    {value: 'fire', title: 'Fire'},
    {value: 'flood', title: 'Flood'},
    {value: 'police', title: 'Police Action'},
  ],

  verifiedBy:  [
    {value: 'fire', title: 'Fire'},
    {value: 'police', title: 'Police'},
    {value: 'other', title: 'Other'},
  ],

  vehicles:  [
    {value: 'responder', title: 'Bay Responder'},
    {value: 'erv', title: 'ERV'},
    {value: 'cov', title: 'Chapter Vehicle'},
    {value: 'pov', title: 'Personal Vehicle'}
  ],

  summaryAssistanceGiven:  [
    {value: 'housing', title: 'Housing'},
    {value: 'food', title: 'Food'},
    {value: 'clothing', title: 'Clothing'},
    {value: 'transportation', title: 'Transportation'},
    {value: 'comfortkits', title: 'Comfort Kits'},
    {value: 'shelter', title: 'Shelter Opened'},
    {value: 'canteen', title: 'Canteen Responders'},
    {value: 'other', title: 'Other'},
  ],
})