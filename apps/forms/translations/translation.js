Forms.translations = SC.Object.create({

});

Forms.Translation = SC.Object.extend({
  fallbackLanguage: "english",

  unknownProperty: function(key, value) {
    var fallback = Forms.translations.get(this.get('fallbackLanguage'));
    if (fallback && fallback !== this) {
      return "(FB) " + fallback.get(key);
    } else {
      return key;
    }
  },
});