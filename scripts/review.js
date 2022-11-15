let hikeID = localStorage.getItem("hikeID");

//get the name of the hike
db.collection("hikes")
  .where("code", "==", hikeID)
  .get()
  .then((hikeResult) => {
    size = hikeResult.size;
    Hikes = hikeResult.docs;

    if ((size = 1)) {
      let thisHike = Hikes[0].data();
      hikeName = thisHike.name;
      document.getElementById("HikeName").innerHTML = hikeName;
    } else {
      console.log("query has more than one result");
    }
  });

function writeReview() {
  console.log("in");
  let Title = document.getElementById("title").value;
  let Level = document.getElementById("level").value;
  let Season = document.getElementById("season").value;
  let Description = document.getElementById("description").value;
  let Flooded = document.querySelector('input[name="flooded"]:checked').value;
  let Scrambled = document.querySelector(
    'input[name="scrambled"]:checked'
  ).value;
  console.log(Title, Level, Season, Description, Flooded, Scrambled);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;
        db.collection("Reviews")
          .add({
            code: hikeID,
            userID: userID,
            title: Title,
            level: Level,
            season: Season,
            description: Description,
            flooded: Flooded,
            scrambled: Scrambled,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            window.location.href = "thanks.html"; //new line added
          });
      });
    } else {
      // No user is signed in.
    }
  });
}
