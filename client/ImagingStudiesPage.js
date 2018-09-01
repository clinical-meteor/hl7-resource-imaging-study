import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import ProcedureDetail from './ImagingStudyDetail';
import ImagingStudiesTable from './ImagingStudiesTable';

import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

export class ImagingStudiesPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('imagingStudiesPageTabIndex'),
      imagingStudiesSearchFilter: Session.get('imagingStudiesSearchFilter'),
      currentProcedure: Session.get('selectedProcedure')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('imagingStudiesPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedProcedure', false);
    Session.set('imagingStudiesUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In ImagingStudiesPage render');
    return (
      <div id='imagingStudiessPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='ImagingStudies' />
            <CardText>
              <Tabs id="imagingStudiessPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newProcedureTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <ProcedureDetail id='newProcedure' />
               </Tab>
               <Tab className="imagingStudiesListTab" label='ImagingStudies' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <ImagingStudiesTable />
               </Tab>
               <Tab className="imagingStudiesDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <ProcedureDetail 
                  id='imagingStudiesDetails'
                  showDatePicker={true} 
                 />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(ImagingStudiesPage.prototype, ReactMeteorData);

export default ImagingStudiesPage;