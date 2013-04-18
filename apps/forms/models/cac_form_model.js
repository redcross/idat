// ==========================================================================
// Project:   Forms.CacForm
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Forms.CACForm = SC.Record.extend(
/** @scope Forms.CacForm.prototype */ {
  allView: 'all_forms',
  primaryKey: '_id',

  cardNumber: SC.Record.attr(String),
  total: SC.Record.attr(Number),
  accessCode: SC.Record.attr(String),

  activatedBy: SC.Record.attr(String),
  activatedAt: SC.Record.attr(SC.DateTime),

  clientSignature: SC.Record.toOne("Forms.Signature", {nested: true}),
  authorizedSignature: SC.Record.toOne("Forms.Signature", {nested: true}),
  supervisorSignature: SC.Record.toOne("Forms.Signature", {nested: true}),

  authorizedName: function() {
    return this.getPath('authorizedSignature.name');
  }.property('authorizedSignature').cacheable(),

  supervisorName: function() {
    return this.getPath('supervisorSignature.name');
  }.property('supervisorSignature').cacheable(),

  isIssuing: function() {
    return this.getPath('lineItems.length') > 0;
  }.property("lineItems.[]"),

  //lineItems: [],
  lineItems: SC.Record.toMany("Forms.CACLineItem", {nested: true}),

  locked: SC.Record.attr(Boolean, { defaultValue: false }),

  numItems: function() {
    return this.getPath("lineItems.length");
  }.property("lineItems.[]"),

  family: function() {
    return this.get('parentRecord');
  }.property('parentRecord'),

  lineItemTotalChanged: function() {
    // TODO:  If the form is signed, don't change this
    if (!(this.get('status') & SC.Record.READY)) {
      console.log("status not ready, not updating total");
      return;
    }
    var total = 0
    this.get('lineItems').forEach(function(li) {
      total += li.get('totalPrice');
    });
    this.set('total', total);
  },

  /*total: function() {
    //var amounts = this.get('lineItems').getEach('totalPrice');
    var total = 0
    this.get('lineItems').forEach(function(li) {
      total += li.get('totalPrice');
      if (li.get('isHotel'))
        total += li.get('contingencyPrice');
    });
    //amounts.forEach(function(el) {total += el});
    return total;
  }.property("*lineItems.[]").cacheable(),*/

  numBlankLines: function() {
    var lines = 10,
        lineItems = this.get('lineItems');

    lineItems.forEach(function(li) {
      if (li.get('isHotel')) {
        lines -= 5;
      } else {
        lines--;
      }
    });

    return lines;
  }.property("*lineItems.[]").cacheable(),

  blankLines: function() {
    var arr = [];
    for(var i = 0; i < this.get('numBlankLines'); i++) {
      arr.pushObject({});
    }
    return arr;
  }.property("numBlankLines").cacheable(),

  _lockedObserver: function() {
    this.get('lineItems').forEach(function(li) {
      li.notifyPropertyChange('allowedToEdit');
    });
  }.observes('locked'),

  identificationString: function() {
    var str = this.getPath('parentRecord.identifiedBy');
    var val = Forms.lookups.identificationTypes.find(function(el) {return el.value ===str});
    if (val) {
      return "%@ %@".fmt(val.title, this.getPath('parentRecord.identificationDetails'))
    } else {
      return 'Unknown'
    }
  }.property('parentRecord'),

  prettyCardString: function() {
    var str = this.get('cleanCardNumber');
    if (str.length == 16) return [str.slice(0,4),str.slice(4,8),str.slice(8,12),str.slice(12,16)].join('-');
    else return this.get('cardNumber');
  }.property('cleanCardNumber').cacheable(),

  cleanCardNumber: function() {
    var str = this.get('cardNumber') || "";
    return str.replace(/[^0-9]/g, '');
  }.property('cardNumber').cacheable(),

  cardLast4: function() {
    var str = this.get('cleanCardNumber');
    if (str.length == 16) return str.slice(12, 16);
    return "XXXX";
  }.property('cleanCardNumber').cacheable(),

  familyUnitNumber: function() { return this.getPath('family.unitNumber'); }.property("family.unitNumber"),
  familyStreetDescription: function() { return this.getPath('family.streetDescription'); }.property("family.streetDescription"),
  familyHohName: function() { return this.getPath('family.hohName'); }.property("family.hohName"),
  hotelName: function() { return this.getPath('hotel.name'); }.property('hotel.name'),

  detailsFields: 'cardNumber accessCode clientSignature authorizedSignature activatedBy'.w(),

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

  detailsComplete: function() {
    return this.getMissingFields(this.get('detailsFields'));
  }.property(),

  isComplete: function() {
    if (this.getPath("lineItems.length") == 0) return true;
    return this.get('detailsComplete') == 'Complete';
  }.property("lineItems", "detailsComplete"),

  isHotel: function() {
    return this === this.getPath('parentRecord.hotelCacForm');
  }.property('parentRecord'),

  formType: function() {
    return this.get('isHotel') ? 'Hotel' : 'Regular';
  }.property('isHotel'),

  needsActivation: function() {
    var activated = this.get('activatedBy');
    return this.get('locked') && (SC.none(activated) || activated === '');
  }.property('locked', 'activatedBy'),

  contentsDescription: function() {
    return this.get('lineItems').map(function(li) {
      return "$%@ for %@".fmt(li.get('totalPrice'), li.get('description'));
    }).join(", ")
  }.property('lineItems'),

}) ;

SC.mixin(Forms.CACForm, {
  isNestedRecord: YES, // datasource won't commit/create this
});

