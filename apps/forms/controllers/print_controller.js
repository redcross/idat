Forms.printController = SC.Object.create({
  debug: (SC.buildMode == 'debug'),

  header: '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' + 
      '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>' + 
      '<link rel="stylesheet" href="' + sc_static('print_css') + '">' +
      '</head>\n<body>\n',
  footer: '</body></html>',

  view: SC.TemplateView.create(),

  renderTemplate: function(content, templateName) {
    var view = this.get('view'),
        data,
        output,
        template = SC.TEMPLATES[templateName];

    view.set('value', content);

    data = { view: view, isRenderData: true };
    output = template(content, { data: data });
    output = output.replace("sc_static" + "('print_css')", sc_static("print_css"));
    output = output.replace("sc_static" + "('arcbalogo.jpg')", sc_static("arcbalogo.jpg"));
    output = output.replace("sc_static" + "('consent.svg')", sc_static("consent.svg"));
    output = output.replace("sc_static" + "('cactc.svg')", sc_static("cactc.svg"));
 
    return output;
  },

  print: function(pages) {
    var data,
        output,
        iframe,
        doc,
        body,
        debug = this.get('debug');

    //console.log(output);
    iframe = document.createElement('iframe'); 
    iframe.setAttribute('style'," z-index: 10; position: absolute; left: 0; right: 0; top: 0; bottom: 0; width: 100%; background-color: white; height: 100%;"); 
    body = document.getElementsByTagName('body')[0]; 
    body.appendChild(iframe); 
    doc = iframe.contentWindow.document;

    doc.open();
    doc.write(this.get('header'));
    pages.forEach(function(page) {
      doc.write(this.renderTemplate(page.content, page.templateName));
    }, this);
    doc.write(this.get('footer'));
    doc.close();

    setTimeout(function() {
      if (!debug) {
        iframe.contentWindow.print();
        //console.log("done printing");
        body.removeChild(iframe);
      }
    }, 500);
  },

  printRegistration: function() {
    this.print([{content: Forms.family.get('content'), templateName: 'printed_registration'}]);
  },

  printDA: function() {
    this.print([{content: Forms.family.get('daForm'), templateName: 'damage_assessment'}]);
  }
});