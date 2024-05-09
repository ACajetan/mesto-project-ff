(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"ad667f8c-30a6-4d3b-a11f-5b1eb985f91a","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e,t,n,o,r){var a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=a.querySelector(".card__delete-button"),i=a.querySelector(".card__like-button"),u=a.querySelector(".card__image"),l=a.querySelector(".card__title"),s=a.querySelector(".card__like-number");return u.src=e.link,u.alt=e.name,l.textContent=e.name,a.id=e._id,e.likes.forEach((function(e){e._id===r&&i.classList.add("card__like-button_is-active")})),e.likes?s.textContent=e.likes.length:s.textContent=0,e.owner._id===r?c.addEventListener("click",(function(){t(a)})):c.style.display="none",u.addEventListener("click",(function(){o(e)})),i.addEventListener("click",(function(t){n(t,e,s)})),a}function o(n,o,r){var a;n.target.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(o._id).then((function(e){n.target.classList.toggle("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log("Ошибка: ",e)})):(a=o._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(a),{method:"PUT",headers:e.headers}).then(t)).then((function(e){n.target.classList.toggle("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log("Ошибка: ",e)}))}function r(n){var o;(o=n.id,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then(t)).then((function(){n.remove()})).catch((function(e){console.log("Ошибка: ",e)}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i),document.addEventListener("click",u)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),document.removeEventListener("click",u)}function i(e){"Escape"!==e.key&&27!==e.keycode||c(document.querySelector(".popup_is-opened"))}function u(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&c(document.querySelector(".popup_is-opened"))}var l=/^[a-zA-Zа-яА-ЯёЁ\s-]*$/;function s(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n}function d(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function p(e,t,n){!function(e){return e.some((function(e){return"text"===e.type?!e.validity.valid||!l.test(e.value):!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){d(e,r,t),p(n,o,t)}))}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var v,y=document.querySelector(".places__list"),m=document.querySelector(".page"),h=m.querySelector(".popup_type_edit"),b=h.querySelector(".popup__input_type_name"),S=h.querySelector(".popup__input_type_description"),g=m.querySelector(".popup_type_edit-avatar"),q=m.querySelector(".popup_type_new-card"),k=m.querySelector(".popup_type_image"),E=m.querySelector(".popup_type_avatar"),L=k.querySelector(".popup__image"),C=k.querySelector(".popup__caption"),x=document.querySelector(".popup__input_type_card-name"),A=document.querySelector(".popup__input_type_url"),U=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),T=document.querySelector(".profile__image"),j=document.querySelector(".profile__edit-button"),O=document.querySelector(".profile__add-button"),B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error"};function D(e){L.src=e.link,L.alt=e.name,C.textContent=e.name,a(k)}function P(e,t){t.submitter.textContent=e?"Сохранение...":"Сохранить"}h.addEventListener("submit",(function(n){n.preventDefault(),P(!0,n);var o,r,a=b.value,i=S.value;(o=a,r=i,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})}).then(t)).then((function(){U.textContent=a,w.textContent=i,b.value="",S.value="",c(h)})).catch((function(e){console.log("Ошибка: ",e)})).finally((function(){P(!1,n)}))})),g.addEventListener("submit",(function(n){P(!0,n),n.preventDefault();var o,r=E.value;(o=r,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t)).then((function(){T.style["background-image"]="url(".concat(r,")"),c(g),E.value=""})).catch((function(e){console.log("Ошибка: ",e)})).finally((function(){P(!1,n)}))})),j.addEventListener("click",(function(){f(h,B),a(h),b.value=U.textContent,S.value=w.textContent})),O.addEventListener("click",(function(){f(q,B),a(q),x.value="",A.value=""})),T.addEventListener("click",(function(){f(g,B),a(g),E.value=""})),q.addEventListener("submit",(function(a){a.preventDefault(),P(!0,a);var i,u,l={name:x.value,link:A.value};(i=l.name,u=l.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:i,link:u})}).then(t)).then((function(e){return c(q),x.value="",A.value="",e})).then((function(e){var t=n(e,r,o,D,e.owner._id),a=y.firstChild;y.insertBefore(t,a)})).catch((function(e){console.log("Ошибка: ",e)})).finally((function(){P(!1,a)}))})),v=B,Array.from(document.querySelectorAll(v.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);p(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){"text"===t.type?t.validity.valid&&l.test(t.value)?d(e,t,n):t.validity.patternMismatch||!l.test(t.value)?s(e,t,"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",n):s(e,t,t.validationMessage,n):"url"===t.type&&(t.validity.valid?d(e,t,n):s(e,t,t.validationMessage,n))}(e,r,t),p(n,o,t)}))}))}(e,v)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then(t)]).then((function(e){var t,a,c,i=(c=2,function(e){if(Array.isArray(e))return e}(a=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=a.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw r}}return i}}(a,c)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(a,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=i[0],l=i[1];t=u,U.textContent=t.name,w.textContent=t.about,T.style.backgroundImage="url(".concat(t.avatar,")"),U.id=t._id,console.log(t._id),function(e,t){e.forEach((function(e){y.append(n(e,r,o,D,t))}))}(l,u._id)})).catch((function(e){console.log("Ошибка: ",e)}))})();