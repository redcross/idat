
/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.incidentActivationList = SC.ArrayController.create(
/** @scope Forms.incidentFamilies.prototype */ {

  //contentBinding: "Forms.families.content",


}) ;

Forms.incidentActivation = SC.ObjectController.create(
/** @scope Forms.incidentFamilies.prototype */ {

  contentBinding: SC.Binding.single("Forms.incidentActivationList.selection"),

  activatorName: "",

  contentObserver: function() {
    var formName = this.get('formName');
    if (!this.get('canActivateRegular') && formName == 'regularCacForm') {
      this.set('formName', 'hotelCacForm');
    } else if (!this.get('canActivateHotel') && formName == 'hotelCacForm') {
      this.set('formName', 'regularCacForm');
    }
  }.observes('content'),

  formName: 'hotelCacForm',
  form: function() {
    return this.get(this.get('formName'));
  }.property('hotelCacForm', 'regularCacForm', 'formName', 'content'),

  cardNumber: function() {
    return this.getPath('form.prettyCardString');
  }.property('form'),

  total: function() {
    return this.getPath('form.total');
  }.property('form'),

  accessCode: function() {
    return this.getPath('form.accessCode');
  }.property('form'),

  activatedBy: function() {
    return this.getPath('form.activatedBy');
  }.property('form'),

  address1: function() {
    return "%@ %@".fmt(this.get('streetNumber'), this.get('streetName'));
  }.property('streetName', 'streetNumber'),

  address2: function() {
    var unit = this.get('unitNumber');
    if (!unit) return '';
    return 'Apt. ' + unit;
  }.property('unitNumber'),

  cityState: function() {
    return "%@ %@".fmt(this.get('city'), this.get('state'));
  }.property('city', 'state'),

  incidentNumber: null, incidentNumberBinding: "Forms.incident.incidentNumber",
  incidentState: null, incidentStateBinding: "Forms.incident.state",
  countyCode: null, countyCodeBinding: "Forms.incident.countyCode",
  chapterCode: null, chapterCodeBinding: "Forms.incident.chapterCode",

  markActivated: function() {
    SC.AlertPane.warn({
      message: "Confirm Activation",
      description: "Has the CAC card ending in %@ been successfully activated by %@?".fmt(this.getPath('form.cardLast4'), this.get('activatorName')),
      buttons: [
        {title: "Confirm", target: "Forms.incidentActivation", action: "confirmActivate"},
        {title: "Cancel"}
      ]
    });
  },

  confirmActivate: function() {
    var form = this.get('form');
    form.set('activatedBy', this.get('activatorName'));
    form.set('activatedAt', SC.DateTime.create());
    this.contentObserver();
    Forms.store.commitRecords();
  },

  canActivateHotel: function() {
    return this.getPath('hotelCacForm.needsActivation');
  }.property('content', 'hotelCacForm', 'hotelCacForm.needsActivation'),

  canActivateRegular: function() {
    return this.getPath('regularCacForm.needsActivation');
  }.property('content', 'regularCacForm', 'regularCacForm.needsActivation'),

}) ;
