const x=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}};x();function a(r,i,n,l){const e=document.createElement(i);return e.innerHTML=n,l&&Object.keys(l).forEach(t=>{e.setAttribute(t,l[t])}),r.appendChild(e)}function y(r){const i=new URL("photographer.html",window.location.href);i.search=`?id=${r}`,window.open(i,"_self")}function U(r){const{id:i,name:n,portrait:l,city:e,country:t,tagline:s,price:f}=r,d=`assets/photographers/${l}`;function g(){const o=document.createElement("article");return o.classList.add("photographer"),a(o,"img","",{class:"photographer_picture",src:d,alt:`photo repr\xE9sentant ${n}`}),a(o,"h2",`${n}`,{class:"photographer_name"}),a(o,"p",`${e}, ${t}`,{class:"photographer_location"}),a(o,"q",`${s}`,{class:"photographer_tagline"}),a(o,"p",`${f}\u20AC/jour`,{class:"photographer_price"}),o.querySelector("img").addEventListener("click",()=>y(i)),o}function u(){const o=document.createElement("div");o.classList.add("photographer_header"),o.setAttribute("role","heading"),o.setAttribute("aria-level","2");const c=a(o,"section","",{class:"photographer_details"});return a(c,"h1",`${n}`,{class:"photographer_name"}),a(c,"p",`${e}, ${t}`,{class:"photographer_location"}),a(c,"q",`${s}`,{class:"photographer_tagline"}),a(o,"button","Contactez-moi",{class:"photographer_contact",type:"button",role:"button","aria-label":"ouvrir le formulaire de contact"}),a(o,"img","",{class:"photographer_picture",src:d,alt:`photo repr\xE9sentant ${n}`}),o}function b(){function o(w,m){Object.keys(m).forEach(h=>{w.setAttribute(h,m[h])})}const c={id:"contact_modal",class:"contact_modal",role:"dialog","aria-hidden":"true","aria-modal":"false","aria-labelledby":"contact_modal_title",style:"display: none"},p=document.createElement("div");return o(p,c),p.innerHTML=`
            <div class="modal" role="document">
                <div class="modal_header" >
                    <h1 class="modal_title" id="contact_modal_title">Contactez-moi<span> ${n}</span></h1>
                    <button type="button" aria-label="fermer le formulaire de contact" class="modal_close" id="modal_close">
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"></path>
                        </svg>
                    </button>
                </div>
                <form id="modal_form" class="modal_form" name="modal_form" action="" method="POST">
                    <label for="firstname" id="firstname">Pr\xE9nom</label>
                    <input type="text" name="firstname" aria-labelledby="firstname">
                    <label for="lastname" id="lastname">Nom</label>
                    <input type="text" name="lastname" aria-labelledby="lastname">
                    <label for="email" id="email">Email</label>
                    <input type="email" name="email" aria-labelledby="email">
                    <label for="message" id="message">Votre message</label>
                    <textarea name="message" rows="4" aria-labelledby="message"></textarea>
                    <button class="modal_submit" type="submit" aria-label="envoyer le formulaire de contact">Envoyer</button>
                </form>
            </div>
        `,p}return{getUserCardDOM:g,getUserHeaderDOM:u,getUserModalDOM:b}}function _(r){if(!r.ok)throw Error(r.statusText);return r}const v=()=>fetch("data/photographers.json").then(_).then(r=>r.json()).catch(r=>console.log(r));export{a,v as g,U as p};
