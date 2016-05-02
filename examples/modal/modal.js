var Modal = (function() {
  var promise;
  var resolve;
  var reject;
  var showModal = function() {
    promise = new Promise(function(rs, rj) {
      resolve = rs;
      reject = rj;
    });
    document.querySelector('div.modalMask').className = 'modalMask modalMaskOn';
    return promise;
  };
  var submitModal = function() {
    if (promise) {
      resolve('SUBMITTED!!!!');
    }
    document.querySelector('div.modalMask').className = 'modalMask modalMaskOff';
  };
  var cancelModal = function() {
    if (promise) {
      reject(new Error('CANCELLED!!!!'));
    }
    document.querySelector('div.modalMask').className = 'modalMask modalMaskOff';
  };

  return {
    showModal: showModal,
    submitModal: submitModal,
    cancelModal: cancelModal
  };
})();

(function() {
  document.addEventListener("DOMContentLoaded", function(event) {

    document.querySelector('#showModalBtn')
      .addEventListener('click', function() {
        Modal.showModal().then(function(data) {
          console.log('Success callback: ' + data);
        }, function(error) {
          console.log('Failure callback: ' + error);
        });
      });

    document.querySelector('#submitModalBtn')
      .addEventListener('click', function() {
        Modal.submitModal();
      });

    document.querySelector('#cancelModalBtn')
      .addEventListener('click', function() {
        Modal.cancelModal();
      });

  });
})();
