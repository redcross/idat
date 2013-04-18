Forms.LocalizedTemplateView = SC.TemplateView.extend({
  value: null,
  language: null,
  template: SC.Handlebars.compile("{{localized}}"),
  classNames: ["localized-label"],

  localized: function() {
    var lang = Forms.translations.get(this.get('language'));
    if (lang) {
      return lang.get(this.get('value'));
    } else {
      return this.get('value');
    }
  }.property("language", "value"),
})