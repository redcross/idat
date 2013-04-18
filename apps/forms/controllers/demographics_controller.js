Forms.demographics = SC.Object.create({
  contentBinding: "Forms.families.arrangedObjects",

  update: function() {
    var fams, numFams = 0, numAdults = 0, numChildren = 0, numPeople = 0,
              famsNeedingHotel = 0, peopleNeedingHotel = 0, hotelBedsNeeded = 0, hotelRoomsNeeded = 0,
              famsNeedingAttention = 0, peopleNeedingAttention = 0;

    fams = this.get('content');
    fams.forEach(function(fam) {
      numFams++;
      numAdults += fam.get('numAdults');
      numChildren += fam.get('numChildren');
      numPeople += fam.get('numPeople');

      if (fam.get('needsHousing')) {
        famsNeedingHotel++;
        peopleNeedingHotel += fam.get('numPeople');
        hotelBedsNeeded += fam.get('numBeds');
        hotelRoomsNeeded += Math.ceil(fam.get('numBeds') / 2);
      }

      if (fam.get('needsAttention')) {
        famsNeedingAttention++;
        peopleNeedingAttention += fam.get('numPeople');
      }
    });

    this.set('numFamilies', numFams);
    this.set('numAdults', numAdults);
    this.set('numChildren', numChildren);
    this.set('numPeople', numPeople);

    this.set('famsNeedingHotel', famsNeedingHotel);
    this.set('peopleNeedingHotel', peopleNeedingHotel);
    this.set('hotelBedsNeeded', hotelBedsNeeded);
    this.set('hotelRoomsNeeded', hotelRoomsNeeded);

    this.set('famsNeedingAttention', famsNeedingAttention);
    this.set('peopleNeedingAttention', peopleNeedingAttention);
  }
})