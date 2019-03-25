window.onload = function() {




  // header

  var phoneBtn = document.querySelector(".page-header__phone-salons-btn");
  var phoneList = document.querySelector(".page-header__phone-salons");

  phoneBtn.addEventListener("click", function() {
    phoneList.classList.toggle("active");
  });

  var searchBtn = document.querySelector(".page-header__search button");
  var searchForm = document.querySelector(".page-header__search");

  searchBtn.addEventListener("click", function(evt) {
    if (document.documentElement.clientWidth <= 750) {
      evt.preventDefault();
      searchForm.classList.toggle("active");
      var inputSearch = searchForm.querySelector("input");
      if (inputSearch.value) {
        searchForm.submit();
      }
    }
  });




  function closePopup(elem, evt) {
    var tar = evt.target;
    var bool = false;
    while (tar != document.body) {
      if (tar == elem && elem.classList.contains("active")) {
        bool = true;
      }
      var tar = tar.parentElement;
    }
    if (!bool) {
      elem.classList.remove("active");
    }
  }


  document.body.addEventListener("click", function(evt) {
    closePopup(phoneList, evt);
    closePopup(searchForm, evt);
  });


  var btnNav = document.querySelector(".page-header__nav-btn");
  var navList = document.querySelector(".page-header__list");

  var listItem = document.querySelectorAll(".page-header__link");
  var btnInnerNav = document.querySelectorAll(".page-header__inner-btn");


  btnNav.addEventListener("click", function() {
    btnNav.classList.toggle("active");
    navList.classList.toggle("active");

    function closeSubMenu(elem) {
      if (elem) {
        elem.style.height = elem.scrollHeight + "px";
        elem.offsetWidth = elem.offsetWidth;
        elem.style.height = 0;
        elem.classList.remove("active");
      }
    }

    // close inner nav
    if (!btnNav.classList.contains("active")) {
      for (var i = 0; i < btnInnerNav.length; i++) {
        closeSubMenu(btnInnerNav[i].nextElementSibling);
      }
      for (var i = 0; i < listItem.length; i++) {
        closeSubMenu(listItem[i].nextElementSibling);
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
            el.offsetWidth = el.offsetWidth; 
            el.nextElementSibling.style.height = 0;
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