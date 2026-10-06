(() => {
const C=window.FEUD_CONFIG||{}, $=id=>document.getElementById(id);
if(!window.supabase){alert("Supabase library failed to load.");return}
if(!C.SUPABASE_URL || C.SUPABASE_URL.includes("PASTE_")) {
  $("homeMsg").textContent="Setup needed: add your Supabase URL and anon key to config.js.";
}
const sb=window.supabase.createClient(C.SUPABASE_URL,C.SUPABASE_ANON_KEY);
const bank=[
{cat:"😂 Workplace Chaos",type:"feud",q:"Name something people do when they realize their manager is walking toward them.",answers:[["Suddenly look busy",34,["look busy","pretend busy","act busy","working"]],["Start working faster",23,["work faster","speed up"]],["Hide their phone",17,["hide phone","put phone away","get off phone","phone away"]],["Smile or say hello",11,["smile","say hello","say hi","hi"]],["Stop talking",9,["stop talking","get quiet","quiet"]],["Walk the other way",6,["walk away","other way","avoid"]]]},
{cat:"🍕 Food Fight",type:"feud",q:"Name a food people could eat every week and never get tired of.",answers:[["Pizza",30,["pizza"]],["Tacos",22,["taco","tacos"]],["Pasta",17,["pasta","spaghetti","noodles"]],["Chicken",12,["chicken"]],["Burgers",10,["burger","burgers","hamburger"]],["Fries or potatoes",9,["fries","french fries","potato","potatoes"]]]},
{cat:"📺 Pop Culture",type:"trivia",q:"In Friends, what is the name of Ross's sister?",correct:["monica","monica geller"]},
{cat:"🏠 Real Life",type:"feud",q:"Name something that can instantly ruin your morning.",answers:[["Oversleeping",27,["oversleep","overslept","sleep in","woke up late"]],["Car trouble",22,["car trouble","car won't start","car wont start","flat tire","dead battery"]],["Traffic",18,["traffic","traffic jam"]],["No coffee",13,["no coffee","coffee"]],["Bad weather",11,["weather","rain","snow","storm"]],["Losing something",9,["lost","lose","can't find","cant find"]]]},
{cat:"😈 Spicy-ish",type:"feud",q:"Name a reason you might leave someone on read.",answers:[["Don't know what to say",29,["don't know what to say","dont know what to say","no response","what to say"]],["Annoyed or mad",23,["mad","annoyed","angry","pissed"]],["Busy",18,["busy","working","at work"]],["Forgot to reply",14,["forgot","forget"]],["Not interested",10,["not interested","don't like them","dont like them"]],["Being petty",6,["petty","being petty"]]]},
{cat:"🧠 Random AF",type:"feud",q:"Name something you would hate to realize you forgot after arriving at the airport.",answers:[["ID or passport",38,["id","passport","identification"]],["Phone",20,["phone","cell phone"]],["Wallet",16,["wallet","money","credit card"]],["Luggage",12,["luggage","bag","suitcase"]],["Ticket",8,["ticket","boarding pass"]],["Charger",6,["charger","phone charger"]]]},
{cat:"👀 Be For Real",type:"feud",q:"Name something people pretend they do more often than they actually do.",answers:[["Exercise",28,["exercise","work out","workout","gym"]],["Clean",22,["clean","cleaning"]],["Cook",17,["cook","cooking"]],["Read",13,["read","reading"]],["Save money",11,["save money","saving","save"]],["Drink water",9,["water","drink water"]]]},
{cat:"🕰️ Throwback",type:"trivia",q:"What virtual pet toy became a huge craze in the late 1990s?",correct:["tamagotchi","tamagotchis"]},
{cat:"💸 Money Money",type:"feud",q:"Name the first thing people say they would buy if they won the lottery.",answers:[["House",35,["house","home"]],["Car",21,["car","vehicle"]],["Vacation",16,["vacation","trip","travel"]],["Pay off debt",13,["debt","pay bills","bills","pay off"]],["Help family",9,["family","help family"]],["Quit their job",6,["quit","quit job","leave work"]]]},
{cat:"❤️ Love & Dating",type:"feud",q:"Name something that can ruin a first date immediately.",answers:[["Being rude",27,["rude","mean","disrespectful"]],["Talking about an ex",22,["ex","talk about ex"]],["Being on the phone",18,["phone","on phone","texting"]],["Bad hygiene",14,["hygiene","smell","stink","dirty"]],["Showing up late",11,["late","show up late"]],["No conversation",8,["no conversation","quiet","awkward"]]]},
{cat:"🏈 Sports",type:"trivia",q:"How many points is a touchdown worth before the extra-point attempt?",correct:["6","six","6 points","six points"]},
{cat:"🎁 Mystery",type:"feud",q:"Name something you would NOT want your coworkers to find in your car.",answers:[["Trash or mess",29,["trash","mess","messy","garbage"]],["Underwear or clothes",20,["underwear","clothes","clothing"]],["Old food",17,["old food","food","leftovers"]],["Embarrassing item",13,["embarrassing","toy","personal item"]],["Shopping bags",11,["shopping bags","bags","packages"]],["Something that smells",10,["smell","smells","stinky"]]]}
];
let state={role:null,game:null,player:null,channel:null,timer:null};
const norm=s=>(s||"").toLowerCase().trim().replace(/[^\w\s']/g,"").replace(/\s+/g," ");
const esc=s=>{const d=document.createElement("div");d.textContent=s||"";return d.innerHTML};
function mult(r){return r>=5?3:r>=3?2:1}
function code(){return String(Math.floor(1000+Math.random()*9000))}
async function createGame(){
 if(C.SUPABASE_URL.includes("PASTE_")) return;
 const host=$("hostName").value.trim(); if(!host){$("homeMsg").textContent="Enter your host name.";return}
 let room=code();
 const {data:g,error}=await sb.from("games").insert({room_code:room,host_name:host,status:"lobby",round:1}).select().single();
 if(error){$("homeMsg").textContent=error.message;return}
 const {data:p,error:pe}=await sb.from("players").insert({game_id:g.id,name:host,is_host:true,score:0}).select().single();
 if(pe){$("homeMsg").textContent=pe.message;return}
 state={...state,role:"host",game:g,player:p}; enterLobby(); subscribe();
}
async function joinGame(){
 if(C.SUPABASE_URL.includes("PASTE_")) return;
 const name=$("joinName").value.trim(), room=$("joinCode").value.trim();
 if(!name||room.length!==4){$("homeMsg").textContent="Enter your name and 4-digit room code.";return}
 const {data:g,error}=await sb.from("games").select("*").eq("room_code",room).neq("status","finished").maybeSingle();
 if(error||!g){$("homeMsg").textContent="Room not found.";return}
 const {data:p,error:pe}=await sb.from("players").insert({game_id:g.id,name,is_host:false,score:0}).select().single();
 if(pe){$("homeMsg").textContent=pe.message;return}
 state={...state,role:"player",game:g,player:p}; enterLobby(); subscribe();
}
function enterLobby(){
 $("home").classList.add("hidden");$("lobby").classList.remove("hidden");$("roomCode").textContent=state.game.room_code;
 $("lobbyRole").textContent=state.role==="host"?"🎤 Host: "+state.player.name:"👤 "+state.player.name;
 $("startGame").classList.toggle("hidden",state.role!=="host");$("lobbyWait").classList.toggle("hidden",state.role==="host"); refresh();
}
async function subscribe(){
 if(state.channel) await sb.removeChannel(state.channel);
 state.channel=sb.channel("game-"+state.game.id)
 .on("postgres_changes",{event:"*",schema:"public",table:"games",filter:"id=eq."+state.game.id},()=>refresh())
 .on("postgres_changes",{event:"*",schema:"public",table:"players",filter:"game_id=eq."+state.game.id},()=>refresh())
 .on("postgres_changes",{event:"*",schema:"public",table:"answers",filter:"game_id=eq."+state.game.id},()=>refresh())
 .subscribe(s=>$("connectionStatus").textContent=s==="SUBSCRIBED"?"🟢 Connected":"Connecting…");
}
async function refresh(){
 const {data:g}=await sb.from("games").select("*").eq("id",state.game.id).single(); if(!g)return; state.game=g;
 const {data:ps}=await sb.from("players").select("*").eq("game_id",g.id).order("created_at");
 if(g.status==="lobby"){renderLobby(ps||[]);return}
 $("lobby").classList.add("hidden");$("play").classList.remove("hidden");$("playRoom").textContent="Room "+g.room_code;$("playHost").textContent="Hosted by "+g.host_name;$("roundNum").textContent=g.round;$("roundMult").textContent=mult(g.round)+"×";renderLeader(ps||[]);
 if(g.status==="choosing"){showChoosing();return}
 if(g.status==="answering"||g.status==="revealed"){await showQuestion(ps||[]);return}
}
function renderLobby(ps){$("lobbyPlayers").innerHTML=ps.map(p=>'<div class="player"><span>'+(p.is_host?"🎤 ":"👤 ")+esc(p.name)+'</span><span>'+ (p.is_host?"Host":"Ready")+'</span></div>').join("");$("startGame").disabled=ps.length<2}
function renderLeader(ps){let a=[...ps].sort((x,y)=>y.score-x.score);$("leaderboard").innerHTML=a.map((p,i)=>'<div class="leader"><span>'+(i===0?"🥇 ":i===1?"🥈 ":i===2?"🥉 ":"")+esc(p.name)+'</span><strong>'+p.score+'</strong></div>').join("")}
function showChoosing(){
 $("questionPanel").classList.add("hidden");$("waitingQuestion").classList.toggle("hidden",state.role==="host");$("hostCategories").classList.toggle("hidden",state.role!=="host");
 if(state.role==="host"){ $("categoryGrid").innerHTML=bank.map((x,i)=>'<button class="cat" data-cat="'+i+'">'+x.cat+'</button>').join("");document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>startQuestion(Number(b.dataset.cat)))}
}
async function startQuestion(i){
 const q=bank[i], deadline=new Date(Date.now()+20000).toISOString();
 await sb.from("answers").delete().eq("game_id",state.game.id).eq("round",state.game.round);
 await sb.from("games").update({status:"answering",question_index:i,deadline}).eq("id",state.game.id);
}
async function showQuestion(ps){
 const g=state.game,q=bank[g.question_index];$("hostCategories").classList.add("hidden");$("waitingQuestion").classList.add("hidden");$("questionPanel").classList.remove("hidden");
 $("questionCategory").textContent=q.cat;$("questionType").textContent=q.type==="feud"?"SURVEY SAYS":"TRIVIA";$("questionText").textContent=q.q;
 const {data:ans}=await sb.from("answers").select("*").eq("game_id",g.id).eq("round",g.round);
 if(g.status==="answering"){
   $("revealPanel").classList.add("hidden");$("countdownWrap").classList.remove("hidden");
   if(state.role==="host"){$("hostLive").classList.remove("hidden");$("answerEntry").classList.add("hidden");$("submittedCount").textContent=(ans||[]).length+" of "+ps.filter(p=>!p.is_host).length}
   else{$("hostLive").classList.add("hidden");const mine=(ans||[]).find(a=>a.player_id===state.player.id);$("answerEntry").classList.remove("hidden");$("answerInput").disabled=!!mine;$("lockAnswer").disabled=!!mine;$("answerMsg").textContent=mine?"🔒 Answer locked. Waiting for time…":""}
   runTimer(g.deadline);
 } else {
   clearInterval(state.timer);$("countdownWrap").classList.add("hidden");$("answerEntry").classList.add("hidden");$("hostLive").classList.add("hidden");await renderReveal(ps,ans||[],q);
 }
}
function runTimer(deadline){
 clearInterval(state.timer);
 const tick=async()=>{let left=Math.max(0,Math.ceil((new Date(deadline)-Date.now())/1000));$("timer").textContent=left;if(left<=0){clearInterval(state.timer);if(state.role==="host")await scoreAndReveal()}};
 tick();state.timer=setInterval(tick,250);
}
async function submitAnswer(){
 const txt=$("answerInput").value.trim();if(!txt)return;$("lockAnswer").disabled=true;
 const {error}=await sb.from("answers").insert({game_id:state.game.id,round:state.game.round,player_id:state.player.id,answer_text:txt});
 if(error){$("answerMsg").textContent=error.message;$("lockAnswer").disabled=false;return}
 $("answerInput").disabled=true;$("answerMsg").textContent="🔒 Answer locked. Nobody can see it yet.";
}
function matchAnswer(text,q){
 const n=norm(text);
 if(q.type==="trivia")return q.correct.some(x=>norm(x)===n)?25:0;
 let best=0;for(const row of q.answers){for(const alias of row[2]){const a=norm(alias);if(n===a||n.includes(a)||a.includes(n)){best=Math.max(best,row[1])}}}return best;
}
async function scoreAndReveal(){
 const g=state.game,q=bank[g.question_index];const {data:ans}=await sb.from("answers").select("*").eq("game_id",g.id).eq("round",g.round);
 for(const a of (ans||[])){if(a.scored)continue;const base=matchAnswer(a.answer_text,q),pts=base*mult(g.round);await sb.from("answers").update({matched_points:pts,scored:true}).eq("id",a.id);if(pts>0){const {data:p}=await sb.from("players").select("score").eq("id",a.player_id).single();await sb.from("players").update({score:(p?.score||0)+pts}).eq("id",a.player_id)}}
 await sb.from("games").update({status:"revealed"}).eq("id",g.id);
}
async function renderReveal(ps,ans,q){
 $("revealPanel").classList.remove("hidden");const names=Object.fromEntries(ps.map(p=>[p.id,p.name]));
 $("revealedAnswers").innerHTML=ans.length?ans.map(a=>'<div class="reveal-row '+(a.matched_points>0?"correct":"wrong")+'"><span><strong>'+esc(names[a.player_id]||"Player")+'</strong> — '+esc(a.answer_text)+'</span><strong>'+(a.matched_points>0?"+"+a.matched_points:"0")+'</strong></div>').join(""):'<p class="muted">No answers were submitted.</p>';
 if(q.type==="feud")$("feudBoard").innerHTML='<div class="board"><h3>Survey Board</h3>'+q.answers.map((x,i)=>'<div class="board-row"><span>'+(i+1)+'. '+esc(x[0])+'</span><strong>'+x[1]+'</strong></div>').join("")+'</div>';else $("feudBoard").innerHTML='<div class="board"><h3>Correct Answer</h3><div class="board-row"><span>'+esc(q.correct[0])+'</span><strong>25 base points</strong></div></div>';
 $("nextRound").classList.toggle("hidden",state.role!=="host");
}
async function nextRound(){await sb.from("games").update({round:state.game.round+1,status:"choosing",question_index:null,deadline:null}).eq("id",state.game.id)}
$("createGame").onclick=createGame;$("joinGame").onclick=joinGame;$("startGame").onclick=async()=>{
  const {error}=await sb.from("games").update({status:"choosing"}).eq("id",state.game.id);
  if(error){
    alert("Could not start game: "+error.message);
    return;
  }
  await refresh();
};$("lockAnswer").onclick=submitAnswer;$("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")submitAnswer()});$("nextRound").onclick=nextRound;
})();
