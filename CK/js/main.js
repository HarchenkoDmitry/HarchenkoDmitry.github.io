"use strict";window.onload=function(){function e(){l.children[1].firstElementChild.offsetHeight;document.body.offsetWidth<930&&(l.classList.contains("page-header--close")?document.body.style="transform: translateX(180px)":document.body.style="transform: translateX(0);",l.classList.toggle("page-header--close"),i.classList.toggle("burger-button__active"))}function t(){for(var e=0;e<=u.length-1;e++){if(u[e].checked&&e<u.length-1){u[e+1].checked=!0;break}e>=u.length-1&&(u[0].checked=!0)}}function o(){h++,h>v||h<=0?(L.style="transform: translateX(0)",h=1):(b=-100/v*(h-1),L.style="transform: translateX("+b+"%);")}function n(){h--,h>=v||h<=0?(b=-100/v*(v-1),L.style="transform: translateX("+b+"%) ",h=v):(b=-100/v*(h-1),L.style="transform: translateX("+b+"%);")}function r(e){b=-100/v*(e-1),L.style="transform: translateX("+b+"%);"}function s(){w.classList.toggle("question--close"),k.classList.contains("question__form--none")?k.classList.toggle("question__form--none"):setTimeout(function(){k.classList.toggle("question__form--none")},500),setTimeout(function(){k.classList.toggle("question__form--close")},100),c[0].classList.toggle("emersion-button--active")}function a(){setTimeout(function(){N.classList.remove("price-list--active"),W.style="width: calc(95% - "+$+"px); transform: translateX("+-$/2+"px); height: calc(100% - 60px)",N.firstElementChild.style="opacity: 1"},500),W.style="width: 80%; transform: translateX(0px); height: 0",N.firstElementChild.style="opacity: 0",document.body.style="overflow: auto; transition: 0s",document.documentElement.style="overflow: auto"}var l=document.querySelector(".page-header"),i=document.querySelector(".burger-button");i.onclick=function(){e()},l.onclick=function(t){"A"!=t.target.tagName&&"LI"!=t.target.tagName||e()};var c=document.querySelectorAll(".emersion-button");if(document.body.offsetWidth>=930){var u=document.querySelectorAll(".js-control-input");setInterval(t,5e3)}var m=document.querySelector(".gallery__button--prev"),d=document.querySelector(".gallery__button--next"),p=document.querySelectorAll(".gallery__wrap-main-photos img"),f=document.querySelector(".gallery__prev-photo"),_=p[0].offsetHeight;f.style="height:"+_+"px",d.onmousedown=function(){d.classList.add("gallery__button--active"),document.onmouseup=function(){d.classList.remove("gallery__button--active")}},m.onmousedown=function(){m.classList.add("gallery__button--active"),document.onmouseup=function(){m.classList.remove("gallery__button--active")}};for(var v=p.length,y=0;y<=v-1;y++){var g=p[y],q=g.cloneNode(!1);f.appendChild(q)}var h=1,b=0,L=(document.querySelector(".gallery__wrap-main-photos img"),document.querySelector(".gallery__wrap-main-photos"));d.onclick=function(){o()},m.onclick=function(){n()};var S=document.querySelector(".gallery__prev-photo");S.onclick=function(e){h=1;for(var t=e.target.previousElementSibling;null!=t;)t=t.previousElementSibling,h+=1;r(h)};var w=document.querySelector(".question"),k=document.querySelector(".question__form");c[0].onclick=s;var E=document.querySelector(".question__button-submit"),X=document.querySelectorAll(".question__form-input")[0],x=document.querySelectorAll(".question__form-input")[1],z=document.querySelector(".quesrion__form-textarea"),T=/^[-a-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,A=document.querySelector(".question__response");E.onclick=function(e){e.preventDefault();var t=new FormData,o=!0;if(""==X.value)return X.parentElement.classList.add("question__input-wrap--error"),void(o=!1);if(""==x.value)return x.parentElement.classList.add("question__input-wrap--error"),void(o=!1);if(""==z.value)return z.parentElement.classList.add("question__input-wrap--error"),void(o=!1);if(0==T.test(x.value))return x.parentElement.classList.add("question__input-wrap--error-email"),void(o=!1);if(o){t.append("name",X.value),t.append("email",x.value),t.append("question",z.value);var n=new XMLHttpRequest;n.open("POST","send.php",!0),n.onload=function(e){200==this.status&&console.log(this.response)},n.send(t),X.value=x.value=z.value="",s(),A.classList.add("question__response--active"),setTimeout("document.querySelector('.question__response--active').classList.remove('question__response--active')",3e3)}},X.onblur=function(){""!=X.value&&X.parentElement.classList.remove("question__input-wrap--error")},x.onchange=function(){""!=x.value&&x.parentElement.classList.remove("question__input-wrap--error")},z.onchange=function(){""!=z.value&&z.parentElement.classList.remove("question__input-wrap--error")},x.onblur=function(){0!=T.test(x.value)&&x.parentElement.classList.remove("question__input-wrap--error-email")};var C=document.querySelector(".service-and-price"),N=document.querySelector(".price-list"),W=document.querySelector(".price-list__wrap"),H=document.querySelector(".price-list__close"),$=S.offsetWidth-S.clientWidth;C.onclick=function(e){"BUTTON"==e.target.tagName&&(N.classList.add("price-list--active"),document.body.style="overflow: hidden; margin-right :"+$+"px; transition: 0s",document.documentElement.style="overflow-y: hidden;")},document.onclick=function(e){e.target==W.parentElement&&a()},H.onclick=function(){a()},document.onkeydown=function(e){27==e.keyCode&&a()}};