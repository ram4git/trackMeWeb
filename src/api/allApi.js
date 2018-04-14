import * as firebase from 'firebase';
import FireBaseTools from './firebase-tools'


export function getStoreCases() {
  const dbRef = firebase.database().ref().child('roles/store/openCases');
  return dbRef.once('value');
}


export function createJobCard(data) {
  const dbRef = firebase.database().ref().child('jobCards');
  const updates = {};
  updates[`${data.id}`] = data;
  return dbRef.update(updates);
}

export function getAllActiveJobCards() {
  const dbRef = firebase.database().ref().child('jobCards');
  return dbRef.once('value');
}

export function getJobCardDetail(id) {
  const dbRef = firebase.database().ref().child('jobCards/'+id);
  return dbRef.once('value');
}

export function addLorry(data) {
  const dbRef = firebase.database().ref().child('lorries');
  const updates = {};
  const vehicleNumber = data.vehicleNumber;
  delete data['vehicleNumber'];
  updates[vehicleNumber] = data;
  return dbRef.update(updates);
}

export function getAllLorryDetails() {
  const dbRef = firebase.database().ref().child('lorries');
  return dbRef.once('value');
}

export function getLorryDetail(id) {
  const dbRef = firebase.database().ref().child('lorries/'+id);
  return dbRef.once('value');
}


export function saveIndent(data) {
  const dbRef = firebase.database().ref();const updates={};
  updates['indents/'+data.indentID] = data;

  const jobCardIndentsRef = firebase.database().ref().child('jobCards/'+data.jobCardID + '/indents');
  jobCardIndentsRef.transaction(function(indents){
                     indents=indents||[];
                     indents.push(data);
                     return indents;
                 });
  return dbRef.update(updates);
}
