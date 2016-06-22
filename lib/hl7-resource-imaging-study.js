
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
  },
  "started" : {
    optional: true,
    type: Date
  }, // When the study was started
  "patient" : {
    optional: true,
    type: PatientSchema
  }, // R!  Who the images are of
  "uid" : {
    optional: true,
    type: String
  }, // R!  Formal identifier for the study
  "accession" : {
    optional: true,
    type: IdentifierSchema
  }, // Related workflow identifier ("Accession Number")
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema]
  }, // Other identifiers for the study
  "order" : {
    optional: true,
    type: [ DiagnosticOrderSchema ]
  }, // Order(s) that caused this study to be performed
  "modalityList" : {
    optional: true,
    type: [ CodingSchema ]
  }, // All series modality if actual acquisition modalities
  "referrer" : {
    optional: true,
    type: PractitionerSchema
  }, // Referring physician (0008,0090)
  "availability" : {
    optional: true,
    type: String
  }, // ONLINE | OFFLINE | NEARLINE | UNAVAILABLE (0008,0056)
  "url" : {
    optional: true,
    type: String
  }, // Retrieve URI
  "numberOfSeries" : {
    optional: true,
    type: Number
  }, // R!  Number of Study Related Series
  "numberOfInstances" : {
    optional: true,
    type: Number
  }, // R!  Number of Study Related Instances
  "procedure" : {
    optional: true,
    type: [ ProcedureSchema ]
  }, // Type of procedure performed
  "interpreter" : {
    optional: true,
    type: [ PractitionerSchema ]
  }, // Who interpreted images
  "description" : {
    optional: true,
    type: String
  }, // Institution-generated description

  "series.$.number" : {
    optional: true,
    type: Number
  }, // Numeric identifier of this series
  "series.$.modality" : {
    optional: true,
    type: CodingSchema
  }, // R!  The modality of the instances in the series
  "series.$.uid" : {
    optional: true,
    type: String
  }, // R!  Formal identifier for this series
  "series.$.description" : {
    optional: true,
    type: String
  }, // A description of the series
  "series.$.numberOfInstances" : {
    optional: true,
    type: Number
  }, // R!  Number of Series Related Instances
  "series.$.availability" : {
    optional: true,
    type: String
  }, // ONLINE | OFFLINE | NEARLINE | UNAVAILABLE
  "series.$.url" : {
    optional: true,
    type: String
  }, // Location of the referenced instance(s)
  "series.$.bodySite" : {
    optional: true,
    type: CodingSchema
  }, // Body part examined
  "series.$.laterality" : {
    optional: true,
    type: CodingSchema
  }, // Body part laterality
  "series.$.started" : {
    optional: true,
    type: Date
  }, // When the series started
  "series.$.instance.$.number" : {
    optional: true,
    type: Number
  }, // The number of this instance in the series
  "series.$.instance.$.uid" : {
    optional: true,
    type: String
  }, // R!  Formal identifier for this instance
  "series.$.instance.$.sopClass" : {
    optional: true,
    type: String
  }, // R!  DICOM class type
  "series.$.instance.$.type" : {
    optional: true,
    type: String
  }, // Type of instance (image etc.)
  "series.$.instance.$.title" : {
    optional: true,
    type: String
  }, // Description of instance
  "series.$.instance.$.content" : {
    type: [ AttachmentSchema ]
  } // Content of the instance







});
ImagingStudies.attachSchema(ImagingStudySchema);
