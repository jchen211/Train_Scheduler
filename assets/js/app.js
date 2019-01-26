var config = {
    apiKey: "AIzaSyAzEAChGpz6tp9c5I_c_an1NaajunE6cog",
    authDomain: "work-1-c8100.firebaseapp.com",
    databaseURL: "https://work-1-c8100.firebaseio.com",
    projectId: "work-1-c8100",
    storageBucket: "work-1-c8100.appspot.com",
    messagingSenderId: "59521064535"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$("#addTrainBtn").on("click", function(e) {
    e.preventDefault();
  
    var tName = $("#trainName").val().trim();
    var dest = $("#destination").val().trim();
    var frstTime = moment($("#frstTrain").val().trim(), "HH:mm").format("X");
    var freq = $("#frequency").val().trim();
  
    var newTrain = {
      name: tName,
      destination: dest,
      frstTrainTime: frstTime,
      frequency: freq
    };
  
    database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frstTrainTime);
  console.log(newTrain.frequency);

  $("#trainName").val("");
  $("#destination").val("");
  $("#frstTrain").val("");
  $("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var fTrainTime = childSnapshot.val().frstTrainTime;
    var trainFreq = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDest);
    console.log(fTrainTime);
    console.log(trainFreq);
  
    var nxtArrival = moment.unix(fTrainTime, "HH:mm").format("HH:mm");

    var minAway = moment(fTrainTime, "X").diff(moment(), "minutes");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(nxtArrival),
      $("<td>").text(minAway),
    );
  
    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);
  });
  
  