Forms.ChooseIncidentState = SC.State.extend({
  enterState: function(ctx) {
    Forms.incidents.set('content', Forms.store.find(SC.Query.local(Forms.Incident, {
      view: 'all_incidents',
      orderBy: 'incidentDate DESC'
    })));
    Forms.chapters.set('content', Forms.store.find(SC.Query.local(Forms.Chapter, {
      view: 'document_by_type_incident',
      orderBy: 'incidentDate DESC',
      key: "Forms.Chapter_undefined"
    })));
    Forms.store.find(SC.Query.local(Forms.County, {
      view: 'document_by_type_incident',
      orderBy: 'incidentDate DESC',
      key: "Forms.County_undefined"
    }));
    Forms.priceList.set('content', Forms.store.find(SC.Query.local(Forms.CACPriceListItem, {
      view: 'all_price_list_items',
      orderBy: function(a, b) {
        function makeArr(el) {
          return [el.get('itemClass'), el.get('name')];
        }

        var dataA = makeArr(a), dataB = makeArr(b);
        for (var i = 0; i < dataA.length; i++) {
          if (dataA[i] > dataB[i]) return 1;
          if (dataA[i] < dataB[i]) return -1;
        }
        return 0;
      },
    })));

    Forms.incidents.set('selection', []);

    if (ctx && ctx.back) {
      delete window.localStorage["chosenIncident"]
    } else if (ctx && ctx.autopick && window.localStorage["chosenIncident"]) {
      var inc = Forms.store.find(Forms.Incident, window.localStorage["chosenIncident"]);
      inc = Forms.store.find(Forms.Incident, window.localStorage["chosenIncident"]); // have to call it twice for some reason
      if (inc) {
        this.didSelectIncident(inc);
        return;
      }
    }

    Forms.getPath('incidentsPage.mainPane').append();
  },

  exitState: function() {
    Forms.getPath('incidentsPage.mainPane').remove();
  },

  showIncident: function() {
    //console.log("showing incident");
    //this.gotoState('incidentView');
  },

  createNewIncident: function() {
    this.gotoState("createIncident");
  },

  confirmNewIncident: function() {
    SC.AlertPane.warn({
      message: "Creating a New Incident",
      description: "Are you sure you want to create a new incident?  Please ensure that no one else has created it or duplicates may result.",
      caption: "If the incident you're looking for is not here, ensure that you are online and your internet connection is working.",
      buttons: [
        { title: "Cancel"},
        { title: "Create Incident", target: this, action: "createNewIncident" }
      ]
    });
  },

  didSelectIncident: function(incident) {
    this.gotoState('incidentView', {content: incident});

  }
});