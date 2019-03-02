(function() {

  $(document).ready(function(){
    $('.owl-carousel').owlCarousel({
      items: 1,
      video: true,
      mouseDrag: false,
      responsive: {
        0: {
          nav: false
        },
        900: {
          nav: true
        }
      }
    });
  });


  var btnMap = document.querySelectorAll(".contacts__map");
  var containerMap = document.querySelector(".modal");

  var overlay = document.querySelector(".overlay");


  function modalShow(container, dataSrc) {
    var frame = container.querySelector('iframe');
    frame.setAttribute("src", dataSrc);
    container.classList.add("modal--show");
    overlay.classList.add("overlay--active");
  };

  function modalClose(container) {
    var frame = container.querySelector('iframe');
    frame.setAttribute("src", '');
    container.classList.remove("modal--show");
    overlay.classList.remove("overlay--active");
  };


  for (var i = 0; i < btnMap.length; i++) {
    btnMap[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      window.history.pushState(1, '', "#popup");
      var dataSrc = this.getAttribute("href");
      modalShow(containerMap, dataSrc);
    }, false)
  };


  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      history.back();
      var modal = document.querySelectorAll(".modal--show");
      if (modal) {
        for (var i = 0; i < modal.length; i++) {
          modalClose(modal[i]);
        }
      }
    }
  });

  overlay.addEventListener("click", function (evt) {
    var modal = document.querySelectorAll(".modal--show");
    for (var i = 0; i < modal.length; i++) {
      modalClose(modal[i]);
    }
  });

  window.onpopstate = function(event) {
    var modal = document.querySelectorAll(".modal--show");
      if (modal) {
        for (var i = 0; i < modal.length; i++) {
          modalClose(modal[i]);
        }
      }
    };


})();