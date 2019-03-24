window.onload = function() {




  // header
  var btnNav = document.querySelector(".page-header__nav-btn");
  var navList = document.querySelector(".page-header__list");

  var listItem = document.querySelectorAll(".page-header__link");
  var btnInnerNav = document.querySelectorAll(".page-header__inner-btn");


  btnNav.addEventListener("click", function() {
    btnNav.classList.toggle("active");
    navList.classList.toggle("active");


    // close inner nav
    if (!btnNav.classList.contains("active")) {
      for (var i = 0; i < btnInnerNav.length; i++) {
        if (btnInnerNav[i].nextElementSibling) {
          btnInnerNav[i].nextElementSibling.style.height = btnInnerNav[i].nextElementSibling.scrollHeight + "px";
          setTimeout(function(elem) {
            elem.nextElementSibling.style.height = 0;
          }, 0, btnInnerNav[i]);
          btnInnerNav[i].nextElementSibling.classList.remove("active");
        }
      }
      for (var i = 0; i < listItem.length; i++) {
        if (listItem[i].nextElementSibling) {
          listItem[i].nextElementSibling.style.height = listItem[i].nextElementSibling.scrollHeight + "px";
          setTimeout(function(elem) {
            elem.nextElementSibling.style.height = 0;
          }, 0, listItem[i]);
          listItem[i].nextElementSibling.classList.remove("active");
        }
      }
    }

  });


  for (var i = 0; i < listItem.length; i++) {
    listItem[i].style.transitionDelay = i * 0.05 + "s";
  }


  // открывает подразделы навигации
  function opening(elem) {
    for (var i = 0; i < elem.length; i++) {

      elem[i].addEventListener("click", function(evt) {

        if (this.nextElementSibling) {

          var el = this;

          if (el.nextElementSibling.classList.contains("active")) {
            el.nextElementSibling.style.height = el.nextElementSibling.scrollHeight + "px";
            setTimeout(function() {
              el.nextElementSibling.style.height = 0;
            }, 0);
          } else {
            el.nextElementSibling.style.height = el.nextElementSibling.scrollHeight + "px";
            setTimeout(function() {
              el.nextElementSibling.style.height = "auto";
            }, 400);
          }
          
          evt.preventDefault();
          this.nextElementSibling.classList.toggle("active");
        }

      });
    }
  }

   opening(listItem);
   opening(btnInnerNav);

  

}