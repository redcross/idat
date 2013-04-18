// ==========================================================================
// Project:   Forms.FamilyDetail
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
sc_require('views/text_field');

Forms.TabObject = SC.Object.extend({
  complete: NO,
  completeIcon: sc_static('checkmark@2x.png'),
  incompleteIcon: sc_static('red-x@2x.png'),

  icon: function() {
    return this.get('complete') ? this.get('completeIcon') : this.get('incompleteIcon')
  }.property('complete')
});

Forms.FamilyDetail = SC.View.extend(
/** @scope Forms.FamilyDetail.prototype */ {

  childViews: "tabView".w(),

  tabView: SC.TabView.design({
    layout: { top: 10 },
    itemTitleKey: 'title',
    itemValueKey: 'value',
    itemIconKey: 'icon',
    nowShowingBinding: "Forms.family.nowShowing",
    nowShowing: 'Forms.familyDetailPage.vitals',
    tabViews: "vitals details".w(),
    items: [
      Forms.TabObject.create({title: "Summary", value: "Forms.familySummaryPage.summary", icon: null}),
      Forms.TabObject.create({title: "Vitals", value: "Forms.familyDetailPage.vitals", completeBinding: "Forms.family.isVitalsComplete"}),
      Forms.TabObject.create({title: "Details", value: "Forms.familyDetailPage.details", completeBinding: "Forms.family.isDetailsComplete"}),
      Forms.TabObject.create({title: "Residents", value: "Forms.familyDetailPage.residents", completeBinding: "Forms.family.isResidentsComplete"}),
      Forms.TabObject.create({title: "DA", value: "Forms.daPage.daMaster", completeBinding: "Forms.daResidence.isComplete"}),
      Forms.TabObject.create({title: "CAC Assistance", value: "Forms.cacPage.cacView", icon: null}),
      Forms.TabObject.create({title: "CAC Issue", value: "Forms.cacPage.cacIssue", completeBinding: "Forms.family.isCacComplete"})
      ],
    //items: ['vitals', 'details'],
    tabLocation: SC.TOP_LOCATION,
    controlSize: SC.LARGE_CONTROL_SIZE,

    isVisibleBinding: "Forms.family.hasContent",

    _nowShowingObserver: function() {
      Forms.statechart.sendAction('save');
    }.observes('nowShowing'),
  }),

});
