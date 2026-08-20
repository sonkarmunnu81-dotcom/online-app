document.addEventListener("DOMContentLoaded",()=>{
 const root=document.documentElement;
 const savedTheme=localStorage.getItem("theme"); if(savedTheme) root.dataset.theme=savedTheme;
 const menu=document.querySelector(".menu-btn"), links=document.querySelector(".nav-links");
 if(menu) menu.addEventListener("click",()=>links.classList.toggle("open"));
 const theme=document.querySelector("#themeToggle"); if(theme) theme.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("theme",root.dataset.theme)});
 const lang=document.querySelector("#langToggle"); if(lang) lang.addEventListener("click",()=>{document.querySelectorAll("[data-en]").forEach(el=>{el.textContent=el.dataset[el.dataset.lang==="hi"?"en":"hi"]});document.body.dataset.lang=document.body.dataset.lang==="hi"?"en":"hi";document.querySelectorAll("[data-en]").forEach(el=>el.dataset.lang=document.body.dataset.lang)});
 const top=document.querySelector(".backtop"); if(top){window.addEventListener("scroll",()=>top.style.display=scrollY>500?"block":"none");top.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}))}
 document.querySelectorAll("form[data-demo]").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const msg=form.querySelector(".form-msg");if(msg){msg.textContent="Submitted successfully for this demo.";msg.classList.remove("hidden")}form.reset()}));
});
function saveItem(type,id){let a=JSON.parse(localStorage.getItem("saved_"+type)||"[]");if(!a.includes(id))a.push(id);localStorage.setItem("saved_"+type,JSON.stringify(a));return true}
function isSaved(type,id){return JSON.parse(localStorage.getItem("saved_"+type)||"[]").includes(id)}
