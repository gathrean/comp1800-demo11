function read_display_Quote() {
  //console.log("inside the function")

  //get into the right collection
  db.collection("quotes")
    .doc("tuesday")
    .onSnapshot(function (tuesdayDoc) {
      //console.log(tuesdayDoc.data());
      document.getElementById("quote-goes-here").innerHTML =
        tuesdayDoc.data().quote;
    });
}
read_display_Quote();

function insertName() {
  // to check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // let me to know who is the user that logged in to get the UID
      currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
      currentUser.get().then((userDoc) => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
        // document.getElementByID("name-goes-here").innetText=user_Name;
      });
    }

 })
}
insertName();

function writeHikes() {
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("hikes");

  hikesRef.add({
    code: "BBY01",
    name: "Burnaby Lake Park Trail", //replace with your own city?
    city: "Burnaby",
    province: "BC",
    level: "easy",
    length: "10",
    details: "Elmo goes here regularly",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  hikesRef.add({
    code: "AM01",
    name: "Buntzen Lake Trail Trail", //replace with your own city?
    city: "Anmore",
    province: "BC",
    level: "moderate",
    length: "10.5",
    details: "Elmo goes here regularly",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  hikesRef.add({
    code: "NV01",
    name: "Mount Seymoure Trail", //replace with your own city?
    city: "North Vancouver",
    province: "BC",
    level: "hard",
    length: "8.2",
    details: "Elmo goes here regularly",
    last_updated: firebase.firestore.Timestamp.fromDate(
      new Date("March 10, 2022")
    ),
  });
}

function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");
    
    db.collection("hikes").get()
        .then(allHikes => {
            allHikes.forEach(doc => {
                var hikeName = doc.data().name; //gets the name field
                var hikeID = doc.data().code; //gets the unique ID field
                var hikeLength = doc.data().length; //gets the length field
                let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                testHikeCard.querySelector('.card-title').innerHTML = hikeName;     //equiv getElementByClassName
                testHikeCard.querySelector('.card-length').innerHTML = hikeLength;  //equiv getElementByClassName
                testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);//equiv getElementByTagName
                testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;   //equiv getElementByTagName
                hikeCardGroup.appendChild(testHikeCard);
            })

        })
}
populateCardsDynamically();

function setHikeData(id){
    localStorage.setItem ('hikeID', id);
}