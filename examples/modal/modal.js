var Modal = (function() {
  var showModal = function() {
    document.querySelector('div.modalMask').className = 'modalMask modalMaskOn';
  };
  var submitModal = function() {
    document.querySelector('div.modalMask').className = 'modalMask modalMaskOff';
  };
  var cancelModal = function() {
    document.querySelector('div.modalMask').className = 'modalMask modalMaskOff';
  };

  return {
    showModal: showModal,
    submitModal: submitModal,
    cancelModal: cancelModal
  };
})();

document.addEventListener("DOMContentLoaded", function(event) {

  document.querySelector('#showModalBtn')
    .addEventListener('click', function() {
      Modal.showModal();
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
