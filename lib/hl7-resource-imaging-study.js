
// create the object using our BaseModel
ImagingStudy = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
ImagingStudy.prototype._collection = ImagingStudies;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
ImagingStudies = new Mongo.Collection('ImagingStudies');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
ImagingStudies._transform = function (document) {
  return new ImagingStudy(document);
};


if (Meteor.isClient){
  Meteor.subscribe("ImagingStudies");
}

if (Meteor.isServer){
  Meteor.publish("ImagingStudies", function (argument){
    if (this.userId) {
      return ImagingStudies.find();
    } else {
      return [];
    }
  });
}


ImagingStudySchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "ImagingStudy"
  }
});
ImagingStudies.attachSchema(ImagingStudySchema);
