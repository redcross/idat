// ==========================================================================
// Project:   Forms.Family
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Forms.Family = SC.Record.extend(
/** @scope Forms.Family.prototype */ {
  allView: 'all_families',
  primaryKey: '_id',
  isParentRecord: YES,

  description: function() {
    var str = "", tmp;

    if (tmp = this.get('unitNumber'))
      str += "%@ @ ".fmt(tmp);
    str += "%@ %@".fmt(this.get('streetNumber'), this.get('streetName'));
    if (tmp = this.get('headOfHousehold')) {
      str += " (%@)".fmt(tmp.get('lastName'));
    }

    if(str.trim() == '') return '<No Information>'

    return str;
  }.property('streetNumber', 'unitNumber', 'streetName', 'headOfHousehold').cacheable(),

  needsHousingDisplay: function() {
    if (!this.get('needsHousing'))
      return 0;
    return this.get('numBeds');
  }.property('needsHousing', 'numBeds').cacheable(),

  headOfHousehold: function() {
    var hoh = null;
    this.get('residents').forEach(function(member) {
      if (member.get('isHOH')) {
        hoh = member;
      }
    }, this);
    return hoh;
  }.property("residents.[]"),
  hohName: function() {
    var hoh = this.get('headOfHousehold');
    if (!SC.none(hoh)) {
      return "%@ %@".fmt(hoh.get('firstName'), hoh.get('lastName'));
    }
    return "";
  }.property("headOfHousehold"),

  numResidents: function() {
    return this.get('residents').get('length');
  }.property("residents.[]"),

  numPeopleString: function() {
    return "%@a / %@c".fmt(this.get('numAdults'), this.get('numChildren'));
  }.property("numChildren", "numAdults").cacheable(),

  streetDescription: function() {
    return "%@ %@".fmt(this.get('streetNumber'), this.get('streetName'));
  }.property("streetNumber", "streetName").cacheable(),

  listOfResidents: function() {
    return this.get('residents').getEach('fullName').join(", ");
  }.property('residents'),

  isIssuingCacs: function() {
    return this.getPath('hotelCacForm.isIssuing') || this.getPath('regularCacForm.isIssuing');
  }.property(),

  daComplete: function() {
    var da = this.get('daForm');
    if (!SC.none(da)) {
      return da.get('damageLevel') || "";
    }
    return "";
  }.property("*daForm.damageLevel").cacheable(),

  numPeople: function() {
    return this.get('numAdults') + this.get('numChildren');
  }.property('numAdults', 'numChildren').cacheable(),

  incident: SC.Record.toOne("Forms.Incident"),

  // TODO: Add your own code here.
  streetNumber: SC.Record.attr(String, {defaultValue: ""}),
  streetName: SC.Record.attr(String, {defaultValue: ""}),
  unitNumber: SC.Record.attr(String, {defaultValue: ""}),
  crossStreet: SC.Record.attr(String),
  city: SC.Record.attr(String),
  state: SC.Record.attr(String),
  zip: SC.Record.attr(String),

  email: SC.Record.attr(String),
  incomeAmount: SC.Record.attr(String),
  incomeSource: SC.Record.attr(String),
  rentAmount: SC.Record.attr(String),

  preferredPhone: SC.Record.attr(String),
  preferredPhoneType: SC.Record.attr(String),

  residents: SC.Record.toMany("Forms.FamilyMember", {nested: true}),
  numAdults: SC.Record.attr(Number),
  numChildren: SC.Record.attr(Number),
  numBeds: SC.Record.attr(Number),
  needsHousing: SC.Record.attr(Boolean),
  language: SC.Record.attr(String),

  notes: SC.Record.attr(String),
  casCaseNumber: SC.Record.attr(String),

  needsAttention: SC.Record.attr(Boolean),

  form1475Needs: SC.Record.attr(Array, {defaultValue: []}),
  form1475Notes: SC.Record.attr(String),

  identifiedBy: SC.Record.attr(String),
  identificationDetails: SC.Record.attr(String),

  hasPets: SC.Record.attr(Boolean),
  petDetails: SC.Record.attr(String),

  residenceType: SC.Record.attr(String),
  ownershipType: SC.Record.attr(String),
  insurance: SC.Record.attr(String),
  landlordName: SC.Record.attr(String),
  landlordPhone: SC.Record.attr(String),
  
  releaseAgencies: SC.Record.attr(Array, {defaultValue: []}),
  releaseAgencyOther: SC.Record.attr(String),
  releaseAgencyIsOther: function() {
    var arr =  this.get('releaseAgencies');
    return SC.isArray(arr) && arr.indexOf('other') >= 0;
  }.property('releaseAgencies'),

  assistanceGiven: SC.Record.attr(Array, {defaultValue: []}),
  assistanceGivenOther: SC.Record.attr(String),

  completedBy: SC.Record.attr(String),

  hotelCacForm: SC.Record.toOne("Forms.CACForm", {inverse: "family", nested: true}),
  regularCacForm: SC.Record.toOne("Forms.CACForm", {inverse: "family", nested: true}),
  //cacItems: SC.Record.toMany("Forms.CACLineItem", {inverse: "family"}),
  daForm: SC.Record.toOne("Forms.DAResidence", {nested: true}),
  clientSignature: SC.Record.toOne("Forms.Signature", {nested: true}),

  vitalsFields: 'streetNumber streetName preferredPhone preferredPhoneType language'.w(),
  detailsFields: 'identifiedBy identificationDetails residenceType ownershipType insurance city state zip assistanceGiven completedBy clientSignature'.w(),

  getMissingFields: function(fields) {
    var missingFields = [];
    fields.forEach(function(el) {
      var field = this.getPath(el);
      if (SC.none(field) || field == '') {
        missingFields.pushObject(el.titleize());
      }
    }, this);
    if (missingFields.get('length') > 0) {
      return 'Missing ' + missingFields.join(', ');
    } else {
      return "Complete"
    }
  },

  vitalsComplete: function() {
    return this.getMissingFields(this.get('vitalsFields'));
  }.property(),
  detailsComplete: function() {
    return this.getMissingFields(this.get('detailsFields'));
  }.property(),
  cacComplete: function() {
    return "Hotel: %@\nRegular: %@".fmt(this.getPath('hotelCacForm.detailsComplete'), this.getPath('regularCacForm.detailsComplete'))
  }.property(),

  isVitalsComplete: function() {
    return this.get('vitalsComplete') == "Complete";
  }.property('vitalsComplete'),
  isDetailsComplete: function() {
    return this.get('detailsComplete') == "Complete";
  }.property('vitalsComplete'),
  isResidentsComplete: function() {
    return this.getPath('residents.length') == (this.get('numChildren') + this.get('numAdults'));
  }.property('numChildren', 'numAdults', 'residents'),
  isCacComplete: function() {
    return this.getPath('hotelCacForm.isComplete') && this.getPath('regularCacForm.isComplete');
  }.property(),


  needsActivation: function() {
    return this.getPath('hotelCacForm.needsActivation') || this.getPath('regularCacForm.needsActivation');
  }.property('hotelCacForm.needsActivation', 'regularCacForm.needsActivation'),

  pagesToPrint: function() {
    var pages = [], agencies = this.get('releaseAgencies') || [], that = this, numCacCopies = 2, tc,
        cacCopyDescriptions = ["Casework Copy", "FSI Copy"];
    pages.pushObject({content: this, templateName: 'printed_registration'});

    if (this.getPath('daForm.shouldPrint')) {
      pages.pushObject({content: this.get('daForm'), templateName: 'damage_assessment'});
    }

    agencies.forEach(function(a) {
      pages.pushObject({content: SC.Object.create({agency: a, family: that}), templateName: 'consent'});
    });

    // Print two copies of CAC paperwork - one for casework, one for fsi

    if (!SC.none(this.getPath('regularCacForm.clientSignature'))) {
      for (var i = 0; i < numCacCopies; i++) {
        pages.pushObject({content: SC.Object.create({
          form: this.get('regularCacForm'), 
          copyDescription: cacCopyDescriptions[i]
        }), templateName: 'cac-1030'});
      }
      
      tc = {signature: this.getPath('regularCacForm.clientSignature')};
    }
    if (!SC.none(this.getPath('hotelCacForm.clientSignature'))) {
      for (var i = 0; i < numCacCopies; i++) {
        pages.pushObject({content: SC.Object.create({
          form: this.get('hotelCacForm'), 
          copyDescription: cacCopyDescriptions[i]
        }), templateName: 'cac-1030'});
      }

      if (SC.none(tc)) {
        tc = {signature: this.getPath('hotelCacForm.clientSignature')};
      }
    }

    if (tc) {
      pages.pushObject({content: SC.Object.create(tc), templateName: 'cac-tc'});
    }

    return pages;
  }.property(),

}) ;
