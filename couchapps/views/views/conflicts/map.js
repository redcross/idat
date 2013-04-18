function(doc) {
  if (doc._conflicts) emit(doc._rev, doc._conflicts);
}