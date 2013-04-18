// ==========================================================================
// Project:   Forms.ResidentsTemplate
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals Forms */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Forms.ResidentsTemplate = SC.TemplateCollectionView.extend(
/** @scope Forms.ResidentsTemplate.prototype */ {

  // TODO: Add your own code here.
  tagName: 'tbody',

  itemView: SC.TemplateView.extend({
    tagName: 'tr',
    templateName: 'resident_item'
  })


});
