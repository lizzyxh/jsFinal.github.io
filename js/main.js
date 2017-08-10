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
  if(!isFormValid()){
    $(document).ready(function(){
      if($(".reservation-name").val() === ''){
        $(".reservation-name").addClass('error'); 
        $('.reservation-name').after('<p class="error-message">This field is required.</p>');
    }else{
        $('.error-message').remove(); 
        $('.error').remove(); 
     }
    if(!reservationData.day){
      $(".dropdown-toggle").addClass('error');
      $('.dropdown-toggle').after('<p class="error-message">This field is required.</p>'); 
    }else{
      $('.error-message').remove();   
      $('.error').remove();  
      console.log("Is Form Valid? "+isFormValid());
    }
  });
    return;
  }
  reservationData.name = $('.reservation-name').val();
  console.log("completed step 4");
  // create a section for reservations data in your db
    var reservationDayData = database.ref('reservation-day');
    reservationDayData.push(reservationData);

function isFormValid() {
  // if (something || somethingElse) {
  //   return false;
  // } else {
  //   return true;
  // }
  // If there is no string value in the Reservation Name Field, respond false.
  // If there is a string value, respond true.
  if($(".reservation-name").val() === '' || !reservationData.day) {
    var valid = false;
  }else{
    var valid = true;
  }
  //return true or false
  return valid;
  }
});

function getReservations(){

  // use reference to database to listen for changes in reservations data
  database.ref('reservation-day').on('value', function(results){
   var allReservations = results.val();
  // remove all list reservations from DOM before appending list reservations
   $('.reservation-list').empty();
   // iterate (loop) through all reservations coming from database call
   for(var reservation in allReservations){
     // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);

      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);

      // Append newly created reservation to reservations list.
      $('.reservation-list').append(reservationListItem);
      console.log("reservations printed");
   }
  });  
}  
// When page loads, get reservations from database
getReservations();

//To remove a reservation, please click the reservation row.
function cancelRes(){
  $('.reservation-list').on('click', 'tr', function(e){
      $(this).remove();
      console.log('reservation removed from list');
      //Remove from Firebase database
       var dataPiece = database.ref('reservation-day');
     dataPiece.$remove(this);
  });
}

cancelRes();

//Step7 Define the callback used by the Google Maps API to initialize the app's map.
var styleMap = [
      {
        stylers:[ { hue: 'green'}, {saturation: -25} ]
      },
      {
        featureType: "road",
        elementType: 'geometry',
        stylers:[ { lightness: '100'},{ visibility: 'simplified'} ]
      },{
        featureType: "water",
        elementType: 'geometry',
        stylers:[ { color: "#CCFFFF"},{ visibility: 'simplified'} ]
      },{
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#DDDDDD" }]
      },{
        featureType: "landscape",
        elementType: 'lables',
        stylers:[ { visibility: 'off'} ]
      }
];

function initMap(){
   var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 13,
    scrollwheel: false,
    styles: styleMap
  });
   var coffeeCup = {
        url: "images/coffeeCup-01.png",
        anchor: new google.maps.Point(25,75),
        scaledSize: new google.maps.Size(150,100)
        }; 
  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    icon: coffeeCup,
    title: 'Monks Café'
  });
}

function openStatus(){
  var today = new Date();
  var hours = today.getHours();
  //12 hour system. Doesn't translate the AM/PM.
  //hours = ((hours + 11) % 12 + 1);
  console.log("Now: "+ hours+" hundred hours");
  
  if(hours > 7 && hours < 23){
    $('#open').show();
    $('#closed').hide();
    //$('#open').removeClass("openStatus").addClass("open");
    console.log('Open');
  }else{
    $('#open').hide();
    $('#closed').show();
    //$('#closed').removeClass("openStatus").addClass("closed");
    console.log('Closed');
  }
  
  console.log('Hours Printed');
}

$(document).ready(function(){
  openStatus();
});




