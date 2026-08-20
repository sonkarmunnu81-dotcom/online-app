const questions=[
["Interest","Which activity do you enjoy most?","Build a small app or explore technology","Organize a budget or business idea","Help people learn or solve personal problems","Draw, design or create visuals"],
["Interest","Which school area interests you most?","Mathematics and computers","Commerce and economics","Biology and health","Languages, arts or social studies"],
["Interest","What project would you choose?","A website or robotics project","A business plan","A community health project","A creative media project"],
["Interest","Which work setting sounds appealing?","Technology lab/office","Business/finance environment","Hospital/community setting","Studio/classroom/cultural setting"],
["Interest","What kind of problem do you like?","Logical and technical","Money and planning","People and wellbeing","Communication and creativity"],
["Skills","How comfortable are you with numbers?","Very comfortable","Comfortable","I need practice","Prefer non-numerical tasks"],
["Skills","How would you rate communication?","Good","Very good","Developing","I prefer written/visual communication"],
["Skills","How do you approach a difficult task?","Break it into logical steps","Plan resources and priorities","Ask others and collaborate","Experiment with creative alternatives"],
["Skills","How strong is teamwork for you?","Good","Excellent","Developing","I work best independently"],
["Skills","How comfortable are you learning software?","Very comfortable","Comfortable","Developing","I prefer hands-on tools"],
["Skills","Which skill would you like to develop?","Coding","Finance/business","Teaching/care","Design/communication"],
["Skills","How do you handle responsibility?","Systematically","By planning and tracking","By supporting people","By taking initiative"],
["Aptitude","If 5 books cost ₹500, what is the cost of 1 book?","₹100","₹50","₹125","₹250"],
["Aptitude","What comes next: 2, 4, 8, 16, ?","32","24","30","20"],
["Aptitude","If all engineers are problem solvers and Ravi is an engineer, Ravi is a...","problem solver","doctor","teacher","lawyer"],
["Aptitude","15% of 200 is:","30","20","25","35"],
["Aptitude","Which word is closest to 'assist'?","Help","Avoid","Delay","Compete"],
["Aptitude","A train travels 60 km in 1 hour. At the same rate, 3 hours gives:","180 km","120 km","150 km","240 km"],
["Aptitude","Find the odd one out:","Apple","Mango","Carrot","Banana"],
["Aptitude","If today is Monday, 3 days later is:","Thursday","Wednesday","Friday","Sunday"]
];
const catMap=["Computer / IT","Commerce & Finance","Healthcare","Arts & Humanities"];
let idx=0;
function renderQuestion(){const q=document.querySelector("#questionArea");if(!q)return;const x=questions[idx];q.innerHTML=`<div class="question active"><span class="tag">${x[0]} Assessment</span><h2>${idx+1}. ${x[1]}</h2>${x.slice(2).map((o,i)=>`<label class="option"><input type="radio" name="q" value="${i}"> ${o}</label>`).join("")}</div>`;document.querySelector("#progressText").textContent=`Question ${idx+1} of ${questions.length}`;document.querySelector("#bar").style.width=`${((idx+1)/questions.length)*100}%`;document.querySelector("#prev").disabled=idx===0;document.querySelector("#next").classList.toggle("hidden",idx===questions.length-1);document.querySelector("#submitAssessment").classList.toggle("hidden",idx!==questions.length-1)}
function answers(){return JSON.parse(localStorage.getItem("assessmentAnswers")||"[]")}
function storeAnswer(){const selected=document.querySelector('input[name="q"]:checked');if(!selected){alert("Please select an answer.");return false}let a=answers();a[idx]=Number(selected.value);localStorage.setItem("assessmentAnswers",JSON.stringify(a));return true}
function score(){let a=answers();if(a.length<questions.length)return null;let correct={13:0,14:0,15:0,16:0,17:0,18:0};let aptitude=0;[0,1,2,3,4,5].forEach(i=>{if([0,0,2,0,0,0][i]===a[i]){}});
[12,13,14,15,16,17].forEach(i=>{const corrects={12:0,13:0,14:0,15:0,16:0,17:0};if(a[i]===corrects[i])aptitude++});
let interest=a.slice(0,5).filter(v=>v===0).length*20;let skills=a.slice(5,12).filter(v=>v===0||v===1).length/7*100;let overall=Math.round((interest+skills+aptitude/6*100)/3);let counts=[0,0,0,0];a.slice(0,12).forEach(v=>counts[v%4]++);let top=counts.indexOf(Math.max(...counts));return {interest:Math.round(interest),skills:Math.round(skills),aptitude:Math.round(aptitude/6*100),overall,career:catMap[top]}}
function showResult(){const s=score();const box=document.querySelector("#result");box.classList.remove("hidden");box.innerHTML=`<h2>Your Assessment Result</h2><div class="grid-4"><div class="card"><strong>${s.overall}%</strong><p>Overall Score</p></div><div class="card"><strong>${s.interest}%</strong><p>Interest</p></div><div class="card"><strong>${s.skills}%</strong><p>Skills</p></div><div class="card"><strong>${s.aptitude}%</strong><p>Aptitude</p></div></div><h3>Career Match: ${s.career}</h3><p class="muted">Use this result as a guidance aid, not as a final career decision.</p>`;localStorage.setItem("assessmentResult",JSON.stringify(s))}
document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector("#questionArea"))return;renderQuestion();document.querySelector("#next").onclick=()=>{if(storeAnswer()){idx++;renderQuestion()}};document.querySelector("#prev").onclick=()=>{if(idx>0){idx--;renderQuestion()}};document.querySelector("#submitAssessment").onclick=()=>{if(storeAnswer())showResult()};document.querySelector("#retake")?.addEventListener("click",()=>{localStorage.removeItem("assessmentAnswers");location.reload()})});
