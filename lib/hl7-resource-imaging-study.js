import SimpleSchema from 'simpl-schema';

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
    type:  Array
    },
  "identifier.$" : {
    optional: true,
    type:  IdentifierSchema 
    },
  "availability" : {
    optional: true,
    type: Code
  },
  "modalityList" : {
    optional: true,
    type: Array
  },
  "modalityList.$" : {
    optional: true,
    type: CodingSchema 
  },
  "patient" : {
    optional: true,
    type: ReferenceSchema
  },
  "context" : {
    optional: true,
    type: ReferenceSchema
  },
  "started" : {
    optional: true,
    type: Date
  },
  "basedOn" : {
    optional: true,
    type: Array
  },
  "basedOn.$" : {
    optional: true,
    type: ReferenceSchema 
  },
  "referrer" : {
    optional: true,
    type: ReferenceSchema
  },
  "interpreter" : {
    optional: true,
    type: Array
  },
  "interpreter.$" : {
    optional: true,
    type: ReferenceSchema 
  },
  "endpoint" : {
    optional: true,
    type: Array
  },
  "endpoint.$" : {
    optional: true,
    type: ReferenceSchema 
  },
  "numberOfSeries" : {
    optional: true,
    type: Number
  },
  "numberOfInstances" : {
    optional: true,
    type: Number
  },
  "procedureReference" : {
    optional: true,
    type: Array
  },
  "procedureReference.$" : {
    optional: true,
    type: ReferenceSchema 
  },
  "procedureCode" : {
    optional: true,
    type: Array
  },
  "procedureCode.$" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "reason" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "description" : {
    optional: true,
    type: String
  },


  "series" : {
    optional: true,
    type:  Array
    },
  "series.$" : {
    optional: true,
    type:  Object 
    },

  "series.$.uid" : {
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
    type: String,
    allowedValues: ['ONLINE', 'OFFLINE', 'NEARLINE', 'UNAVAILBLE']
  },
  "series.$.endpoint" : {
    optional: true,
    type: Array
  },
  "series.$.endpoint.$" : {
    optional: true,
    type: ReferenceSchema 
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
  "series.$.performer" : {
    optional: true,
    type: Array
  },
  "series.$.performer.$" : {
    optional: true,
    type: ReferenceSchema 
  },
  

  "series.$.instance" : {
    optional: true,
    type:  Array
    },
  "series.$.instance.$" : {
    optional: true,
    type:  Object 
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
  "series.$.instance.$.title" : {
    optional: true,
    type: String
  }
});

BaseSchema.extend(ImagingStudySchema);
DomainResourceSchema.extend(ImagingStudySchema);
ImagingStudies.attachSchema(ImagingStudySchema);

export default { ImagingStudy, ImagingStudies, ImagingStudySchema };