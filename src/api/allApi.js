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
