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

export function createPurchase(purchaseID, itemsInPurchaseOrder) {
  const dbRef = firebase.database().ref();;
  const updates = {}; let iteratorCount = 0;
  let indentHistory = {};

  let complexObj = {};
  let clone = Object.assign({}, itemsInPurchaseOrder);
  delete clone['companyName'];
  delete clone['address'];


  Object.keys(clone).forEach((partId) => {
      let split = clone[partId].split;iteratorCount++;
      let splitCount = 0;
      Object.keys(split).forEach((indentID) => {
          const indentsRef = dbRef.child('indents/' + indentID + '/items');splitCount++;
          const historyRef = firebase.database().ref(`indents/${indentID}/history/`);
          const arrKey = historyRef.push().key;
          let bk = {};
           if(window.localStorage.keys)
            bk = JSON.parse(window.localStorage.keys);
          bk[indentID] = arrKey
          window.localStorage.keys = JSON.stringify(bk);
          indentsRef.once('value', function(data){
            let items = data.val();let r = {};
            if(window.localStorage.blabla)
             r =  JSON.parse(window.localStorage.blabla)
            r[indentID] = items;
            window.localStorage.blabla= JSON.stringify(r);
                items.map((item) => {
                  update(iteratorCount,splitCount, item, partId, purchaseID,indentID, complexObj, Object.keys(clone).length,
                     Object.keys(split).length)
                })
          })
      })
  })
  const purchasesRef = dbRef.child(`purchases/${purchaseID}`)
    itemsInPurchaseOrder['createdAt'] = new Date().toString();
    itemsInPurchaseOrder['currentOwner'] = 'SECURITY';
     return purchasesRef.update(itemsInPurchaseOrder);
}


function update(iteratorCount,splitCount, item, partId, purchaseID, indentID,complexObj, cloneLength, splitLength
        ) {

  console.log(iteratorCount,splitCount, item, partId, purchaseID, indentID);
  if(item.partNumber === partId) {

    console.log(JSON.parse(window.localStorage.blabla));
    let ob = JSON.parse(window.localStorage.blabla);
    Object.keys(ob).forEach((i) => {
      let bo = ob[i];
      bo.map((o)=>{
        if(o.partNumber === partId) {
          o.purchaseID = purchaseID;
          o.selectedForPurchase = true;
        }
      });
      ob[i] = bo;
    })


    window.localStorage.blabla = JSON.stringify(ob);
    let hist = complexObj[indentID];
    if(!hist){
      hist={};
      hist['updatedBy'] = 'PURCHASE';
      hist['updatedTime'] = new Date().toString();
      hist['items'] = [];
      hist['items'].push(item);
      complexObj[indentID] = hist;
    }else{
      hist['items'].push(item);
    }
    complexObj[indentID] = hist;
    if(iteratorCount === cloneLength && splitCount === splitLength){
      console.log(complexObj);
      let items = JSON.parse(window.localStorage.blabla);
      console.log(items);
      console.log('hi hi hi');
      Object.keys(items).map(id => {
        const dbRef = firebase.database().ref();;
          const indentsRef = dbRef.child('indents/' + id + '/items');
          let a = items[id]; let c = {}
          a.map((v, index) => {
              c[index] = v;
           });
           indentsRef.set(c);
      })
      //indentsRef.update(items);
      Object.keys(complexObj).map((indentID) => {
        const dbRef = firebase.database().ref();;
        let historyPayload = complexObj[indentID];
        const updates= {};let kys = JSON.parse(window.localStorage.keys);
        let arrKey = kys[indentID];
        updates[`indents/${indentID}/history/${arrKey}`] = historyPayload;
        dbRef.update(updates);
      })
    }
  }
}

export function getAllPurchases() {
  const dbRef = firebase.database().ref().child('purchases');
  return dbRef.once('value');
}

export function getPurchaseItem(id) {
  const dbRef = firebase.database().ref().child('purchases/'+id);
  return dbRef.once('value');
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

    const reservationsRef = dbRef.child('items/'+ indentDetails.modelNumber + '/' )

    return reservationsRef.update(updates);


  }else {
    const partsRef =  dbRef.child('items/' + indentDetails.modelNumber + '/' );
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

export function savePurchaseItems(purchaseDetails) {
  const historyRef = firebase.database().ref(`purchases/${purchaseDetails.purchaseID}/history/`);
  const arrKey = historyRef.push().key;
  const updates = {};
  let historyPayload = {
    updatedTime : purchaseDetails.createdAt || '',
    items : purchaseDetails.items,
    updatedBy : window.localStorage.role
  };

const purchasesRef = firebase.database().ref().child(`purchases/${purchaseDetails.purchaseID}/currentOwner`);
const purchasesStatusRef = firebase.database().ref().child(`purchases/${purchaseDetails.purchaseID}/status`);

purchasesRef.set(purchaseDetails.currentOwner);
purchasesStatusRef.set(purchaseDetails.status);

  updates[`purchases/${purchaseDetails.purchaseID}/history/${arrKey}`] = historyPayload;
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

export function uploadPurchaseImage(file, purchaseID, role, partNumber) {
  const storageRef = firebase.storage().ref();
  const path = 'purchases/'+purchaseID+'/'+partNumber+'/'+role+'/'+partNumber+'.jpeg';
  const imgRef = storageRef.child(path);
  return  imgRef.putString(file, 'base64')
}


export function downloadImage(path) {
  const storageRef = firebase.storage().ref();
  return storageRef.child(path).getDownloadURL().then(function(url) {
  }).catch((e) => console.log(e))
  }

  export function updateIndentStatus(indentID, sts) {
    const dbRef = firebase.database().ref().child('indents/' + indentID + '/status');
    dbRef.once('value', function(data) {
      console.log(data.val());
    })
    dbRef.transaction(function(status){
                       status = sts;
                       return status;
                     });
   }

   export function updateItemsQuantity(mainHead, partNumber, quantity) {

     const dbRef = firebase.database().ref().child('items/'+'M1312' + '/'+mainHead+'/'+partNumber+'/quantity');

     dbRef.transaction((count) => {
                      return Number(count) + Number(quantity);
                        });
   }
