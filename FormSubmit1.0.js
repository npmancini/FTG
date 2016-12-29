// Variable to hold request
var request;

// Bind to the submit event of our form
$("#foo").submit(function(event){

// Abort any pending request
if (request) {
request.abort();
}
// setup some local variables
var $form = $(this);

// Let's select and cache all the fields
var $inputs = $form.find("input, select, button, textarea");

// Serialize the data in the form
var serializedData = $form.serialize();

// Let's disable the inputs for the duration of the Ajax request.
// Note: we disable elements AFTER the form data has been serialized.
// Disabled form elements will not be serialized.
$inputs.prop("disabled", true);

// Fire off the request to /form.php
request = $.ajax({
url: "https://script.google.com/macros/s/AKfycbzz2ofHceRVnRQhWcsMms5l4kaRjCB1Nytg17lSjY5YYhbwRS0/exec",
type: "post",
data: serializedData
});

// Callback handler that will be called on success
request.done(function (response, textStatus, jqXHR){
// Log a message to the console
console.log("Hooray, it worked!");
console.log(response);
console.log(textStatus);
console.log(jqXHR);
});

// Callback handler that will be called on failure
request.fail(function (jqXHR, textStatus, errorThrown){
// Log the error to the console
console.error(
"The following error occurred: "+
textStatus, errorThrown
);
});

// Callback handler that will be called regardless
// if the request failed or succeeded
request.always(function () {
// Reenable the inputs
$inputs.prop("disabled", false);
// Your form redirect URL
var redirectURL = “http://www.anacondareporting.com/p/success.html”;

// Fixes an issue with IE8 and lower
if ( navigator.userAgent.match(/MSIE\s(?!9.0)/) ) {
var referLink = document.createElement( "a" );
referLink.href = redirectURL;
document.body.appendChild( referLink );
referLink.click();

// Standard redirect for all other browsers
} else {
window.location.assign( redirectURL );
}
});

// Prevent default posting of form
event.preventDefault();
});
