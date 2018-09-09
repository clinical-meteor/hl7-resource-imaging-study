import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/clinical:alert';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import { get } from 'lodash';
import PropTypes from 'prop-types';

let defaultImagingStudy = {
  'resourceType': 'ImagingStudy',
  'status': 'unknown',
  'identifier': [{
    'use': 'official',
    'value': ''
  }],
  'code': {
    'text': ''
  }
};



Session.setDefault('imagingStudyUpsert', false);
Session.setDefault('selectedImagingStudy', false);


export default class ImagingStudyDetail extends React.Component {
  getMeteorData() {
    let data = {
      imagingStudyId: false,
      imagingStudy: defaultImagingStudy,
      showDatePicker: false
    };

    if(this.props.showDatePicker){
      data.showDatePicker = this.props.showDatePicker
    }

    if (Session.get('imagingStudyUpsert')) {
      data.imagingStudy = Session.get('imagingStudyUpsert');
    } else {
      // if (Session.get('selectedImagingStudy')) {
      //   data.imagingStudyId = Session.get('selectedImagingStudy');
        console.log("selectedImagingStudy", Session.get('selectedImagingStudy'));

        let selectedImagingStudy = ImagingStudies.findOne({_id: Session.get('selectedImagingStudy')});
        console.log("selectedImagingStudy", selectedImagingStudy);

        if (selectedImagingStudy) {
          data.imagingStudy = selectedImagingStudy;
        }
      // } else {
      //   data.imagingStudy = defaultImagingStudy;
      // }
    }

    if (Session.get('selectedImagingStudy')) {
      data.imagingStudyId = Session.get('selectedImagingStudy');
    }      

    return data;
  }

  renderDatePicker(showDatePicker, datePickerValue){
    if (showDatePicker) {
      return (
        <DatePicker 
          name='performedDateTime'
          hintText="Performed Date/Time" 
          container="inline" 
          mode="landscape"
          value={ datePickerValue ? datePickerValue : ''}    
          onChange={ this.changeState.bind(this, 'performedDateTime')}      
          />
      );
    }
  }

  render() {
    return (
      <div id={this.props.id} className="imagingStudyDetail">
        <CardText>
        <TextField
            id='identifierInput'
            ref='identifier'
            name='identifier'
            floatingLabelText='Identifier'
            value={ get(this, 'data.imagingStudy.identifier[0].value') ? get(this, 'data.imagingStudy.identifier[0].value') : ''}
            onChange={ this.changeState.bind(this, 'identifier')}
            fullWidth
            /><br/>
          <TextField
            id='codeInput'
            ref='code'
            name='code'
            floatingLabelText='Code'
            value={this.data.imagingStudy.code ? this.data.imagingStudy.code.text : ''}
            onChange={ this.changeState.bind(this, 'code')}
            fullWidth
            /><br/>
          <TextField
            id='statusInput'
            ref='status'
            name='status'
            floatingLabelText='Status'
            value={this.data.imagingStudy.status ? this.data.imagingStudy.status : ''}
            onChange={ this.changeState.bind(this, 'status')}
            fullWidth
            /><br/>


            <br/>
          { this.renderDatePicker(this.data.showDatePicker, get(this, 'data.imagingStudy.performedDateTime') ) }
          <br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.imagingStudyId) }
        </CardActions>
      </div>
    );
  }


  addToContinuityOfCareDoc(){
    console.log('addToContinuityOfCareDoc', Session.get('imagingStudyUpsert'));

    var imagingStudyUpsert = Session.get('imagingStudyUpsert');

    var newImagingStudy = {
      'resourceType': 'ImagingStudy',
      'status': imagingStudyUpsert.status,
      'identifier': imagingStudyUpsert.identifier,
      'code': {
        'text': imagingStudyUpsert.code.text
      },
      'performedDateTime': imagingStudyUpsert.performedDateTime  
    }

    console.log('Lets write this to the profile... ', newImagingStudy);

    Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {
      'profile.continuityOfCare.imagingStudys': newImagingStudy
    }}, function(error, result){
      if(error){
        console.log('error', error);
      }
      if(result){
        browserHistory.push('/continuity-of-care');
      }
    });
  }
  determineButtons(imagingStudyId){
    if (imagingStudyId) {
      return (
        <div>
          <RaisedButton id="saveImagingStudyButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteImagingStudyButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />

          <RaisedButton id="addImagingStudyToContinuityCareDoc" label="Add to CCD" primary={true} onClick={this.addToContinuityOfCareDoc.bind(this)} style={{float: 'right'}} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveImagingStudyButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let imagingStudyUpdate;

    if(process.env.NODE_ENV === "test") console.log("ImagingStudyDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new imagingStudy
    if (Session.get('imagingStudyUpsert')) {
      imagingStudyUpdate = Session.get('imagingStudyUpsert');
    } else {
      imagingStudyUpdate = defaultImagingStudy;
    }



    // if there's an existing imagingStudy, use them
    if (Session.get('selectedImagingStudy')) {
      imagingStudyUpdate = this.data.imagingStudy;
    }

    switch (field) {
      case "identifier":
        imagingStudyUpdate.identifier = [{
          use: 'official',
          value: value
        }];
        break;
      case "code":
        imagingStudyUpdate.code.text = value;
        break;
      case "status":
        imagingStudyUpdate.status = value;
        break;
      case "performedDateTime":
        imagingStudyUpdate.performedDateTime = value;
        break;

      default:
    }

    if(process.env.NODE_ENV === "test") console.log("imagingStudyUpdate", imagingStudyUpdate);
    Session.set('imagingStudyUpsert', imagingStudyUpdate);
  }

  handleSaveButton(){
    let imagingStudyUpdate = Session.get('imagingStudyUpsert', imagingStudyUpdate);

    if(process.env.NODE_ENV === "test") console.log("imagingStudyUpdate", imagingStudyUpdate);


    if (Session.get('selectedImagingStudy')) {
      if(process.env.NODE_ENV === "test") console.log("Updating imagingStudy...");
      delete imagingStudyUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      imagingStudyUpdate.resourceType = 'ImagingStudy';

      ImagingStudies.update(
        {_id: Session.get('selectedImagingStudy')}, {$set: imagingStudyUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "ImagingStudies", recordId: Session.get('selectedImagingStudy')});
            Session.set('imagingStudyPageTabIndex', 1);
            Session.set('selectedImagingStudy', false);
            Session.set('imagingStudyUpsert', false);
            Bert.alert('ImagingStudy updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new imagingStudy", imagingStudyUpdate);

      ImagingStudies.insert(imagingStudyUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "ImagingStudies", recordId: result});
          Session.set('imagingStudyPageTabIndex', 1);
          Session.set('selectedImagingStudy', false);
          Session.set('imagingStudyUpsert', false);
          Bert.alert('ImagingStudy added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('imagingStudyPageTabIndex', 1);
  }

  handleDeleteButton(){
    ImagingStudy.remove({_id: Session.get('selectedImagingStudy')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "ImagingStudies", recordId: Session.get('selectedImagingStudy')});
        Session.set('imagingStudyPageTabIndex', 1);
        Session.set('selectedImagingStudy', false);
        Session.set('imagingStudyUpsert', false);
        Bert.alert('ImagingStudy removed!', 'success');
      }
    });
  }
}


ImagingStudyDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(ImagingStudyDetail.prototype, ReactMeteorData);