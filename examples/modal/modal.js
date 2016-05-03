(function() {
  var Modal = (function() {

    var open = function() {
      document.querySelector('div.modal').className = 'modal modal-show';

      return new Promise(function (resolve, reject) {
        document.querySelector('#submitModalBtn')
          .addEventListener('click', function() {
            document.querySelector('div.modal').className = 'modal';
            resolve("Submitted modal!!!");
          }, false);

        document.querySelector('#cancelModalBtn')
          .addEventListener('click', function() {
            document.querySelector('div.modal').className = 'modal';
            reject("Cancelled modal!!!");
          }, false);
      });
    };

    return {
      open: open
    };
  })();

  document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('#showModalBtn')
      .addEventListener('click', function() {
        Modal.open().then(function(result) {
          console.log(result);
        }, function(result) {
          console.log(result);
        });
      }, false);
  }, false);
})();
