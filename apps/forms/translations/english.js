sc_require('translations/translation');

Forms.translations.english = Forms.Translation.create({
  InformationRelease: "Client Consent to Share Information",
  InformationReleaseLong: "Privacy: The American Red Cross respects the privacy of its clients.  We will honor your wishes when sharing information about your needs.  " +
                   "I authorize the American Red Cross to share my information with and receive information from the specific " +
                   "individuals/organizations (landlord, etc.) listed below:",
  InformationReleaseWhy: "We do this to coordinate benefits, and ensure that we do everything we can to assist you.  If you do not want us to share your information, please let your Red Cross caseworker know before signing this document.",

  Address: "Address",
  Phone: "Phone",
  Residents: "Residents",
  Name: "Name",
  Age: "Age",
  MF: "M/F", // gender
  RelationshipToHOH: "Relationship to HOH",
  AtScene: "At Scene?",

  YourAcceptance: "Your Acceptance",
  InformationCorrectDisclaimer: "The above information provided is correct and accurate, and I live at the above address.",
  AssistanceIsAGift: "All Red Cross assistance is a gift of the American People, and never needs to be repaid.",
  PleaseSign: "Please sign in the box below with your finger or the provided stylus:",

  // Info release agencies:
  sfhsa: "San Francisco Human Services Agency",
  tzuchi: "Tzu Chi Disaster Relief"

});