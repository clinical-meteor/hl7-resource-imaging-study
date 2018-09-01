

import ImagingStudiesPage from './client/ImagingStudiesPage';
import ImagingStudiesTable from './client/ImagingStudiesTable';

var DynamicRoutes = [{
  'name': 'ImagingStudiesPage',
  'path': '/imaging-studies',
  'component': ImagingStudiesPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'ImagingStudies',
  'to': '/imaging-studies',
  'href': '/imaging-studies'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  ImagingStudiesPage,
  ImagingStudiesTable
};


