//Step 1:
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3lMDcH2BZtnyvwn5k2PZJN0o6u6OGj3o",
    authDomain: "reservation-site-e483e.firebaseapp.com",
    databaseURL: "https://reservation-site-e483e.firebaseio.com",
    projectId: "reservation-site-e483e",
    storageBucket: "reservation-site-e483e.appspot.com",
    messagingSenderId: "1026813792788"
  };
  firebase.initializeApp(config);


var database = firebase.database();

//Step 2: Create an empty Object Literal
reservationData ={

}

//Step 3: User Data

$('.reservation-day li').on('click', function(e){
  e.preventDefault(); 
  reservationData.day = $(this).text();
});

//Step 4:  Update the name property

$('.reservation-form').on('submit', function(e){
  e.preventDefault(); 
  reservationData.name = $('.reservation-name').val();
  console.log("completed step 4");
  // create a section for reservations data in your db
    var reservationDayData = database.ref('reservation-day');
    reservationDayData.push(reservationData);
});

function getReservations(){

  database.ref('reservations').on(function(results) {


    var allReservations = results.val();

   $('.reservations').empty();
    for (var reservation in allReservations) {

      // Create an object literal + HandleBars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      var source = $("#reservation-template").html();
      var template = Handlebars.compile(source);
      var reservationListItem = template(context);
      $('.reservations').append(reservationListItem);

    }

  });
}
// When page loads, get reservations
getReservations();

