Forms.ValidatingRecord = SC.Record.extend({
  validatorErrors: function() {
    var errors = {}, attribute, val, group, valid;

    for (var key in this) {
      if ((attribute = this[key]) && attribute.isRecordAttribute) {
        if (attribute.isRequired) {
          val = this.get(key);
          group = attribute.validatorGroup || '';
          errors[group] = errors[group] || {};

          if (SC.empty(val)) {
            errors[group][key] = 'is missing.';
          } else if (attribute.validator) {
            if (SC.typeOf(attribute.validator) === SC.T_FUNCTION && !attribute.validator(key, val)) {
              errors[group][key] = 'is invalid.';
            }
          }
        }
      }
    }

    return errors;
  }.property().cacheable(),

  unknownProperty: function(key, val) {
    var matches, errors, group, property;
    if (matches = key.match(/^(.*)ValidatorIsError$/)) {
      group = matches[1];
      property = (function(key){
        return function() {
           errors = this.get('validatorErrors');
           return !!(errors[key] && Object.keys(errors[key]).length > 0);
        }.property().cacheable()
      })(group);
      this[key] = property;
      return property.apply(this, [key, val]);
    } else if (matches = key.match(/^(.*)ValidatorGroupMessage$/)) {
      group = matches[1];
      property = (function(key){
        return function() {
           errors = this.get('validatorErrors');
           if (!errors[group] || Object.keys(errors[group]).length === 0) return "Complete";
           return "Missing " + Object.keys(errors[group]).map(function(k) {return k.titleize();}).join(", ");
        }.property().cacheable()
      })(group);
      this[key] = property;
      return property.apply(this, [key, val]);
    }

    //console.log(this.toString(), "got unknown property: ", key, val);

    return sc_super();
  }
})