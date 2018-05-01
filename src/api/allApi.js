import * as firebase from 'firebase';
import FireBaseTools from './firebase-tools'

export function getStoreCases() {
  const dbRef = firebase.database().ref().child('roles/store/openCases');
  return dbRef.once('value');
}


export function createJobCard(data) {

  let payloadForLorries = {};
  payloadForLorries['jobCardID'] = data.id;
  payloadForLorries['createdDate'] = data.date;
 //add later if required


  const jobCardsForLorriesRef = firebase.database().ref().
                                  child(`lorries/${data.vehicleNumber}/jobCards`);

  jobCardsForLorriesRef.transaction(function(jobcards){
                     jobcards=jobcards||[];
                     jobcards.push(payloadForLorries);
                     return jobcards;
                 });
  const dbRef = firebase.database().ref().child('jobCards/');
  const updates = {};
  updates[`${data.id}`] = data;
  return dbRef.update(updates);

}

export function createPurchase(data) {
  const purchaseId = data.id;
  const dbRef = firebase.database().ref().child(`purchases/${purchaseId}`);
  const updates = {};
  delete data['id'];
  const items = []
  const purchaseItem = {}
  Object.keys(data).forEach((item) => {
    let itemVal = data[item];
    console.log(itemVal)

    purchaseItem.indentID = item;
    Object.keys(itemVal).forEach((key) => {
      let keyVal = itemVal[key];
      purchaseItem.mainHead = keyVal.mainHead;
      purchaseItem.partName = keyVal.partName;
      purchaseItem.partNumber = keyVal.partNumber;
      purchaseItem.quantity = keyVal.quantityRequired;
      items.push(purchaseItem)
    })

  })
  updates[`${purchaseItem.partNumber}`] = items;
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
  const dbRef = firebase.database().ref();
  const updates={};
  updates['indents/'+data.indentID] = data;

  const jobCardIndentsRef = dbRef.child('jobCards/'+data.jobCardID + '/indents');
  jobCardIndentsRef.transaction(function(indents){
                     indents=indents||[];
                     indents.push(data);
                     return indents;
                 });
  return dbRef.update(updates);
}




export function getIndent(id) {
  const dbRef = firebase.database().ref().child('indents/'+id);
  return dbRef.once('value');
}

export function getAllIndents() {
  const dbRef = firebase.database().ref().child('indents');
  return dbRef.once('value');
}


export function getPartCount(modelNumber, mainHead, partNumber) {
  const dbRef = firebase.database().ref().child('parts/'+ modelNumber + '/' + mainHead + '/' + partNumber);
  return dbRef.once('value');
}


export function updatePartCount(indentDetails) {
  let updates = {}; let items = indentDetails.items;const dbRef = firebase.database().ref();
  if(indentDetails.countUpdated) {
    items.map((item) => {
        updates[`${item.mainHead}/${item.partNumber}/reservations/${indentDetails.indentID}`] = null;
    })

    const reservationsRef = dbRef.child('parts/'+ indentDetails.modelNumber + '/' )

    return reservationsRef.update(updates);


  }else {
    const partsRef =  dbRef.child('parts/' + indentDetails.modelNumber + '/' );
    items.map((item) => {
        updates[`${item.mainHead}/${item.partNumber}/count`] = (Number(item.quantityStores) - Number(item.quantityApproved)).toString()
    })

    return partsRef.update(updates);

  }

}


export function updateIndent(indentDetails) {
  const historyRef = firebase.database().ref(`indents/${indentDetails.indentID}/history/`);
  const arrKey = historyRef.push().key;
  const updates = {};
  let historyPayload = {
    updatedTime : indentDetails.createdAt || '',
    items : indentDetails.items,
    updatedBy : window.localStorage.role
  };

const indentsRef = firebase.database().ref().child(`indents/${indentDetails.indentID}/currentOwner`);

indentsRef.set(indentDetails.currentOwner);

  updates[`indents/${indentDetails.indentID}/history/${arrKey}`] = historyPayload;
  const dbRef = firebase.database().ref();
  return dbRef.update(updates);
}


export function reserveParts(indentDetails){
  let updates = {}; let items = indentDetails.items;
  const dbRef = firebase.database().ref().child('parts/' + indentDetails.modelNumber + '/' );
  items.map((item) => {
      updates[`${item.mainHead}/${item.partNumber}/count`] = (Number(item.quantityStores) - Number(item.quantityApproved)).toString()
      updates[`${item.mainHead}/${item.partNumber}/reservations/${indentDetails.indentID}`] =  item.quantityApproved
  })
  return dbRef.update(updates);
}

export function loginUser(email, password) {
const firebaseAuth = firebase.auth();
return firebaseAuth.signInWithEmailAndPassword(email, password)

}

export function getRole(uid) {
  const dbRef = firebase.database().ref().child('idVsRole/' + uid);
  return dbRef.once('value');
}


export function getItemsForModelNumber(modelNumber) {
  const dbRef = firebase.database().ref().child('items/' + modelNumber);
  return dbRef.once('value');
}

export function uploadImage(file, indentId, role, partNumber) {
  const storageRef = firebase.storage().ref();
  const path = 'indents/'+indentId+'/'+role+'/'+partNumber+'.jpeg';
  const imgRef = storageRef.child(path);
  return  imgRef.putString(file, 'base64')
}


export function downloadImage(path) {
  const storageRef = firebase.storage().ref();
  return storageRef.child(path).getDownloadURL().then(function(url) {
  }).catch((e) => console.log(e))
  }
