Forms.IncidentTeamMember = SC.Record.extend({
  name: SC.Record.attr(String),
  assignment: SC.Record.attr(String),
  roles: SC.Record.attr(Array),
});

SC.mixin(Forms.IncidentTeamMember, {
  isNestedRecord: YES, // datasource won't commit/create this
});