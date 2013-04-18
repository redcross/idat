Forms.familySummaryPage = SC.Page.design({
  summary: Forms.FormView.design({
    layout: {top: 20},
    childViews: "collectVitals collectDetails collectResidents collectDA completeCACs clientSignature printRegistration print".w(),

    collectVitals: SC.FormView.row("Collect Vitals:", SC.LabelView.extend({
      layout: {height: 30, width: 200},
      valueBinding: "Forms.family.vitalsComplete"
    })),
    collectDetails: SC.FormView.row('Collect Details:', SC.LabelView.extend({
      layout: {height: 30, width: 200},
      valueBinding: "Forms.family.detailsComplete"
    })),
    collectResidents: SC.FormView.row('Collect Residents:', SC.LabelView.extend({
      layout: {height: 30, width: 200},
      valueBinding: SC.Binding.oneWay('Forms.family.content').transform(function(fam) {
        if (SC.none(fam)) return "";
        return "%@ Residents Entered (%@ on vitals survey)".fmt(fam.getPath('residents.length'), fam.get('numPeople'))
      }),
    })),
    collectDA: SC.FormView.row('Collect DA:', SC.LabelView.extend({
      layout: {height: 90, width: 200},
      valueBinding: "Forms.daResidence.detailsComplete",
    })),
    
    completeCACs: SC.FormView.row('Complete CACs:', SC.LabelView.extend({
      layout: {height: 60, width: 300},
      valueBinding: "Forms.family.cacComplete",
    })),
    clientSignature: SC.FormView.row('Client Signature:', Forms.SignatureRowView.design({
      valueBinding: "Forms.family.clientSignature",
      layout: {width: 150, height: 24},
      paneName: "clientSignaturePage.clientSignaturePane",

      signaturePaneDidComplete: function(sigObject) {
        this.set('value', SC.clone(sigObject));
        if (Forms.family.getPath('regularCacForm.isIssuing')) {
          Forms.family.setPath('regularCacForm.clientSignature', SC.clone(sigObject));
        }
        if (Forms.family.getPath('hotelCacForm.isIssuing')) {
          Forms.family.setPath('hotelCacForm.clientSignature', SC.clone(sigObject));
        }
        Forms.family.set('didSignRelease', YES);
        Forms.family.set('didSignCACTerms', YES);
        Forms.store.commitRecords();
      },
    })),

    printRegistration: SC.FormView.row("Print Registration", SC.ButtonView.design({
      layout: {width: 100, height: 30},
      controlSize: SC.HUGE_CONTROL_SIZE,
      title: "Print",
      action: "printRegistration",
      target: "Forms.printController"
    })),
    printDA: SC.FormView.row('Complete DA:', SC.ButtonView.design({
      layout: {width: 100, height: 30},
      controlSize: SC.HUGE_CONTROL_SIZE,
      title: "Print DA",
      action: "printDA",
      target: "Forms.printController"
    })),
    print: SC.FormView.row('Print Paperwork:', SC.ButtonView.design({
      layout: {width: 180, height: 30},
      controlSize: SC.HUGE_CONTROL_SIZE,
      title: "Print Paperwork",
      action: "printAll",
      target: "Forms.family"
    })),
  })
})