if(Package['clinical:autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  Your app has the 'clinical-autopublish' package installed.");
  console.log("Any protected health information (PHI) stored in this app should be audited."); 
  console.log("Please consider writing secure publish/subscribe functions and uninstalling.");  
  console.log("");  
  console.log("meteor remove clinical:autopublish");  
  console.log("");  
}
if(Package['autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  DO NOT STORE PROTECTED HEALTH INFORMATION IN THIS APP. ");  
  console.log("Your application has the 'autopublish' package installed.  Please uninstall.");
  console.log("");  
  console.log("meteor remove autopublish");  
  console.log("meteor add clinical:autopublish");  
  console.log("");  
}






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





ImagingStudySchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "ImagingStudy"
  },
  "started" : {
    optional: true,
    type: Date
  },
  "patient" : {
    optional: true,
    type: ReferenceSchema
  },
  "uid" : {
    optional: true,
    type: String
  },
  "accession" : {
    optional: true,
    type: IdentifierSchema
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema]
  },
  "order" : {
    optional: true,
    type: [ ReferenceSchema ]
  },
  "modalityList" : {
    optional: true,
    type: [ CodingSchema ]
  },
  "referrer" : {
    optional: true,
    type: ReferenceSchema
  },
  "availability" : {
    optional: true,
    type: String
  },
  "url" : {
    optional: true,
    type: String
  },
  "numberOfSeries" : {
    optional: true,
    type: Number
  },
  "numberOfInstances" : {
    optional: true,
    type: Number
  },
  "procedure" : {
    optional: true,
    type: [ ReferenceSchema ]
  },
  "interpreter" : {
    optional: true,
    type: [ ReferenceSchema ]
  },
  "description" : {
    optional: true,
    type: String
  },

  "series.$.number" : {
    optional: true,
    type: Number
  },
  "series.$.modality" : {
    optional: true,
    type: CodingSchema
  },
  "series.$.uid" : {
    optional: true,
    type: String
  },
  "series.$.description" : {
    optional: true,
    type: String
  },
  "series.$.numberOfInstances" : {
    optional: true,
    type: Number
  },
  "series.$.availability" : {
    optional: true,
    type: String
  },
  "series.$.url" : {
    optional: true,
    type: String
  },
  "series.$.bodySite" : {
    optional: true,
    type: CodingSchema
  },
  "series.$.laterality" : {
    optional: true,
    type: CodingSchema
  },
  "series.$.started" : {
    optional: true,
    type: Date
  },
  "series.$.instance.$.number" : {
    optional: true,
    type: Number
  },
  "series.$.instance.$.uid" : {
    optional: true,
    type: String
  },
  "series.$.instance.$.sopClass" : {
    optional: true,
    type: String
  },
  "series.$.instance.$.type" : {
    optional: true,
    type: String
  },
  "series.$.instance.$.title" : {
    optional: true,
    type: String
  },
  "series.$.instance.$.content" : {
    type: [ AttachmentSchema ]
  }







});
ImagingStudies.attachSchema(ImagingStudySchema);
