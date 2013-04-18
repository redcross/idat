// ==========================================================================
// Project:   Forms.incidentDetails
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Forms.incidentDetailTree = SC.Object.create({

  treeItemIsExpanded: YES,
  treeItemChildren: [
    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "Incident",
      treeItemChildren: [
        SC.Object.create({ name: "Summary", show: "summary" }),
        SC.Object.create({ name: "Details", show: "details", 
          iconBinding: SC.Binding.oneWay('Forms.incident.detailsValidatorIsError').transform(function(val) {
            return val ? '' : sc_static('checkmark@2x.png');
          })}),
        SC.Object.create({ name: "Report", show: "report", 
          iconBinding: SC.Binding.oneWay('Forms.incident.reportValidatorIsError').transform(function(val) {
            return val ? '' : sc_static('checkmark@2x.png');
          }) }),
        SC.Object.create({ name: "Team", show: "team" }),
      ]
    }),

    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "Clients",
      treeItemChildren: [
        SC.Object.create({ name: "Registrations", show: "registrations" }),
        //SC.Object.create({ name: "Needing Attention", show: "needsAttention" }),
        SC.Object.create({ name: "Demographics", show: "demographics" }),
      ]
    }),

    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "Hotels",
      treeItemChildren: [
        SC.Object.create({ name: "Hotel List", show: "hotels" }),
        SC.Object.create({ name: "Assignments", show: "hotelAssignments" }),
      ]
    }),

    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "CAC",
      treeItemChildren: [
        SC.Object.create({ name: "Issuance List", show: "cacIssuance" }),
        SC.Object.create({ name: "Activation", show: "cacActivation" }),
      ]
    })
  ]
})

Forms.incidentDetails = SC.TreeController.create(
/** @scope Forms.incidentDetails.prototype */ {
  doHideMasterPicker: function() {
    var md = Forms.getPath('incidentDetailPage.mainPane.masterDetail');
    if (md) md.hideMasterPicker();
    Forms.store.commitRecords();
  }.observes("selection"),

  treeItemIsGrouped: YES,

}) ;

Forms.incidentDetailSelection = SC.ObjectController.create({
  contentBinding: SC.Binding.single("Forms.incidentDetails.selection"),
  isEditable: NO,

  selectionObserver: function() {
    if (SC.browser.isMobile) {
      var name = this.get('show'),
          view = Forms.incidentDetailPage.get(name);
      console.log(name, view);
      if (view) {
        Forms.incidentDetailPage.getPath('mobilePane.navigation').push(view);
      }
      this.set('content', null);
    }
  }.observes('content')
})
