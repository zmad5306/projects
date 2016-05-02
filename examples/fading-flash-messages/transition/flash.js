var FlashMessages = (function() {
  //function to add a new message
  //takes message text and type (info, error, warn or success)
  function showMessage(msg, type) {
    //create new element for message
    var msgEl = document.createElement('div');

    //add classes to element
    msgEl.className += 'message ';
    msgEl.className += type;

    //create message text and add it to element
    var msgNd = document.createTextNode(msg);
    msgEl.appendChild(msgNd);

    //attach listeners to remove element after transition has ended
    msgEl.addEventListener('transitionend', function(event) {
      event.target.parentNode.removeChild(event.target);
    });

    msgEl.addEventListener('webkitTransitionend', function(event) {
      event.target.parentNode.removeChild(event.target);
    });

    msgEl.addEventListener('mozTransitionend', function(event) {
      event.target.parentNode.removeChild(event.target);
    });

    //find messages element and add message to it
    document.querySelector('div.messages').appendChild(msgEl);

    //fire transition after 4s
    setTimeout(function() {
      msgEl.className = msgEl.className += ' hide';
    }, 3000);
  };

  //return API
  return {
    showMessage: showMessage
  }
})();

//document ready
document.addEventListener("DOMContentLoaded", function(event) {

  //handle button clicks, add a new message of the given type on click

  document.querySelector('#showInfoBtn')
    .addEventListener('click', function() {
      FlashMessages.showMessage('This is an info message', 'info');
    });

  document.querySelector('#showErrorBtn')
    .addEventListener('click', function() {
      FlashMessages.showMessage('This is an error message', 'error');
    });

  document.querySelector('#showWarnBtn')
    .addEventListener('click', function() {
      FlashMessages.showMessage('This is a warning message', 'warn');
    });

  document.querySelector('#showSuccessBtn')
    .addEventListener('click', function() {
      FlashMessages.showMessage('This is a success message', 'success');
    });

});
