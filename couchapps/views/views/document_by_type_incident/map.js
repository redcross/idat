function(doc) {
  emit(doc.recordType + "_" + doc.incident, doc);
}