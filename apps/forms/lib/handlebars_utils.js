Handlebars.registerHelper('lookup', function(lookupName, propertyName, context) {
  var lookup = Forms.lookups.get(lookupName),
      val,
      ret,
      key = (context && context.hash && context.hash.key) || 'title';

  if (context) {
    val = context.contexts[0].getPath(propertyName);
  } else {
    context = propertyName;
    val = context.contexts[0];
  }

  if (val == 'other') val = context.contexts[0].getPath(propertyName + "Other");

  ret = lookup.find(function(el) {return el.value === val});
  return (ret && ret[key]) || val;
});

Handlebars.registerHelper('lookupeach', function(lookupName, propertyName, options) {
  var lookup = Forms.lookups.get(lookupName);
  var fn = options.fn, inverse = options.inverse;
  var ret = "", context;

  if(context = this.get(propertyName)) {
    context.forEach(function(el) {
      if (el == 'other') {
        el = options.hash.other || el;
      }
      var name = lookup.find(function(item) {return item.value === el}) || el;
      ret = ret + fn(name);
    });
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('staticeach', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

  if(context = this.get(context)) {
    context.forEach(function(el) {
      ret = ret + fn(el);
    });
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('ifnblank', function(context, options) {
  context = this.getPath(context);
  //console.log('ifnblank', context);
  if(!context || Handlebars.Utils.isEmpty(context) || context === '') {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('dateFormat', function(context, block) {
  var f = (block && block.hash && block.hash.format) || "%m/%d/%Y";
  context = SC.getPath(this, context);
  if (SC.none(context) || !context.toFormattedString) return '';
  return context.toFormattedString(f);
});