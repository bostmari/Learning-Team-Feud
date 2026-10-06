(() => {
const C=window.FEUD_CONFIG||{}, $=id=>document.getElementById(id);

if(!window.supabase){
  alert("Supabase library failed to load.");
  return;
}

if(!C.SUPABASE_URL || C.SUPABASE_URL.includes("PASTE_")){
  $("homeMsg").textContent="Setup needed: add your Supabase URL and anon key to config.js.";
}

const sb=window.supabase.createClient(
  C.SUPABASE_URL,
  C.SUPABASE_ANON_KEY
);

let state={
  role:null,
  game:null,
  player:null,
  channel:null,
  timer:null,
  scoring:false,
  used:new Set()
};

const questions=[

/* 😂 WORKPLACE CHAOS */

{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something people do when they realize their manager is walking toward them.",
answers:[
["Suddenly look busy",34,["look busy","pretend busy","act busy","working"]],
["Start working faster",23,["work faster","speed up"]],
["Hide their phone",17,["hide phone","put phone away","phone away"]],
["Smile or say hello",11,["smile","hello","say hi"]],
["Stop talking",9,["stop talking","quiet"]],
["Walk the other way",6,["walk away","avoid"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something coworkers complain about at work.",
answers:[
["Management",28,["management","manager","managers","boss"]],
["Schedule",22,["schedule","hours","shift"]],
["Pay",18,["pay","money","wages"]],
["Workload",14,["workload","too much work","work"]],
["Other coworkers",10,["coworkers","people","associates"]],
["Temperature",8,["temperature","hot","cold","heat"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something people do five minutes before their shift ends.",
answers:[
["Watch the clock",30,["watch clock","clock","check time","time"]],
["Clean up",22,["clean","clean up"]],
["Finish their task",18,["finish","finish work","task"]],
["Talk to coworkers",12,["talk","chat","coworkers"]],
["Pack their things",10,["pack","get stuff","gather things"]],
["Head toward the exit",8,["exit","door","leave"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something that makes a work shift feel extra long.",
answers:[
["Nothing to do",27,["nothing to do","slow","bored","boring"]],
["Being tired",23,["tired","sleepy"]],
["Too much work",18,["too much work","busy","workload"]],
["Bad mood",12,["bad mood","mad","annoyed"]],
["Watching the clock",11,["clock","watch time"]],
["Bad coworkers",9,["coworkers","people","drama"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something someone might forget to bring to work.",
answers:[
["Badge",30,["badge","id","work badge"]],
["Lunch",24,["lunch","food"]],
["Phone",16,["phone","cell phone"]],
["Water bottle",12,["water","water bottle"]],
["Keys",10,["keys","car keys"]],
["Charger",8,["charger","phone charger"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something people secretly do when a meeting could have been an email.",
answers:[
["Check their phone",28,["phone","check phone","text"]],
["Zone out",24,["zone out","daydream","stop listening"]],
["Complain later",17,["complain","talk about it"]],
["Multitask",13,["multitask","work"]],
["Watch the clock",10,["clock","time"]],
["Pretend to listen",8,["pretend","fake listening"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name a reason someone might be late to work.",
answers:[
["Traffic",30,["traffic"]],
["Overslept",25,["overslept","sleep","slept in"]],
["Car trouble",17,["car","car trouble","flat tire"]],
["Kids",12,["kids","children","child"]],
["Weather",9,["weather","snow","rain"]],
["Forgot something",7,["forgot","forget"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something you might hear someone say in the break room.",
answers:[
["I'm tired",27,["tired","im tired"]],
["What's for lunch?",22,["lunch","food","eat"]],
["I'm ready to go home",20,["go home","leave","ready to leave"]],
["What time is it?",12,["time","what time"]],
["It's cold in here",10,["cold","hot","temperature"]],
["Did you hear what happened?",9,["hear what happened","gossip","drama"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something that disappears mysteriously at work.",
answers:[
["Pens",25,["pen","pens"]],
["Food",22,["food","lunch","snacks"]],
["Chargers",17,["charger","chargers"]],
["Supplies",15,["supplies","equipment"]],
["Water bottles",11,["water bottle","bottle"]],
["People when work starts",10,["people","coworkers","workers"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something people do when the boss asks for volunteers.",
answers:[
["Avoid eye contact",32,["avoid eye contact","look away","eye contact"]],
["Stay quiet",24,["quiet","say nothing"]],
["Look busy",18,["look busy","pretend busy"]],
["Volunteer",11,["volunteer","raise hand"]],
["Look at someone else",9,["look at someone","look around"]],
["Walk away",6,["walk away","leave"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something that can ruin a good day at work.",
answers:[
["Bad news",25,["bad news","news"]],
["Extra work",22,["extra work","more work"]],
["Drama",19,["drama","argument"]],
["Equipment problems",14,["equipment","computer","system"]],
["Being yelled at",11,["yelled at","manager","boss"]],
["Schedule change",9,["schedule","schedule change"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something coworkers borrow and forget to return.",
answers:[
["Pen",31,["pen","pens"]],
["Charger",22,["charger"]],
["Money",15,["money","cash"]],
["Food",13,["food","snack"]],
["Tools",11,["tools","tool"]],
["Jacket",8,["jacket","coat"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something people check constantly while at work.",
answers:[
["Time",31,["time","clock","watch"]],
["Phone",26,["phone","cell phone"]],
["Messages",17,["messages","text","slack"]],
["Schedule",11,["schedule"]],
["Email",9,["email","emails"]],
["Break time",6,["break","break time"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something people look forward to during a workday.",
answers:[
["Going home",29,["home","going home","leave"]],
["Lunch",24,["lunch","food"]],
["Break",22,["break","break time"]],
["Payday",12,["payday","pay"]],
["Seeing coworkers",8,["coworkers","friends"]],
["Meeting ending",5,["meeting ending","meeting over"]]
]
},
{
cat:"😂 Workplace Chaos",
type:"feud",
q:"Name something that causes workplace drama.",
answers:[
["Gossip",29,["gossip","rumors"]],
["Relationships",20,["relationships","dating"]],
["Scheduling",17,["schedule","scheduling"]],
["Favoritism",14,["favoritism","favorites"]],
["Miscommunication",12,["communication","miscommunication"]],
["Food",8,["food","lunch"]]
]
},

/* 🍕 FOOD FIGHT */

{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a food people could eat every week and never get tired of.",
answers:[
["Pizza",30,["pizza"]],
["Tacos",22,["taco","tacos"]],
["Pasta",17,["pasta","spaghetti","noodles"]],
["Chicken",12,["chicken"]],
["Burgers",10,["burger","burgers"]],
["Fries or potatoes",9,["fries","potatoes","potato"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a food people love to order for a party.",
answers:[
["Pizza",36,["pizza"]],
["Wings",22,["wings","chicken wings"]],
["Tacos",14,["tacos","taco"]],
["Subs",11,["subs","sandwiches"]],
["Chips",9,["chips"]],
["Dessert",8,["dessert","cake","cookies"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name something people put on a hamburger.",
answers:[
["Cheese",29,["cheese"]],
["Ketchup",23,["ketchup"]],
["Lettuce",16,["lettuce"]],
["Pickles",13,["pickle","pickles"]],
["Onion",11,["onion","onions"]],
["Mustard",8,["mustard"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a food that's messy to eat.",
answers:[
["Tacos",25,["taco","tacos"]],
["Spaghetti",21,["spaghetti","pasta"]],
["Wings",19,["wings","chicken wings"]],
["Ribs",14,["ribs"]],
["Sloppy joes",12,["sloppy joe","sloppy joes"]],
["Ice cream",9,["ice cream"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name something people dip in ranch.",
answers:[
["Wings",26,["wings","chicken"]],
["Pizza",22,["pizza"]],
["Fries",18,["fries"]],
["Vegetables",14,["vegetables","veggies","carrots"]],
["Chicken nuggets",12,["nuggets","chicken nuggets"]],
["Mozzarella sticks",8,["mozzarella","cheese sticks"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a popular midnight snack.",
answers:[
["Chips",25,["chips"]],
["Pizza",22,["pizza"]],
["Ice cream",18,["ice cream"]],
["Cookies",14,["cookies","cookie"]],
["Cereal",12,["cereal"]],
["Leftovers",9,["leftovers"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name something you would find at a cookout.",
answers:[
["Burgers",27,["burgers","hamburgers"]],
["Hot dogs",23,["hot dogs","hotdog"]],
["Chips",17,["chips"]],
["Potato salad",13,["potato salad"]],
["Chicken",11,["chicken"]],
["Corn",9,["corn"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a food people argue about putting pineapple on.",
answers:[
["Pizza",100,["pizza"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a breakfast food people love.",
answers:[
["Eggs",25,["eggs","egg"]],
["Bacon",22,["bacon"]],
["Pancakes",19,["pancakes","pancake"]],
["Waffles",15,["waffles","waffle"]],
["Cereal",11,["cereal"]],
["French toast",8,["french toast"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a food you probably eat with your hands.",
answers:[
["Pizza",27,["pizza"]],
["Burger",22,["burger","hamburger"]],
["Fries",18,["fries"]],
["Tacos",14,["tacos","taco"]],
["Wings",11,["wings"]],
["Sandwich",8,["sandwich","sub"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name something people put on french fries.",
answers:[
["Ketchup",42,["ketchup"]],
["Salt",20,["salt"]],
["Cheese",15,["cheese"]],
["Ranch",10,["ranch"]],
["Vinegar",7,["vinegar"]],
["Hot sauce",6,["hot sauce"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a food that smells amazing while it's cooking.",
answers:[
["Bacon",26,["bacon"]],
["Pizza",21,["pizza"]],
["Steak",18,["steak"]],
["Cookies",14,["cookies"]],
["Chicken",12,["chicken"]],
["Garlic bread",9,["garlic bread"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name something you might order at a Mexican restaurant.",
answers:[
["Tacos",28,["tacos","taco"]],
["Burrito",22,["burrito"]],
["Quesadilla",17,["quesadilla"]],
["Nachos",14,["nachos"]],
["Fajitas",11,["fajitas"]],
["Enchiladas",8,["enchiladas"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a dessert people have at birthday parties.",
answers:[
["Cake",48,["cake","birthday cake"]],
["Ice cream",23,["ice cream"]],
["Cupcakes",13,["cupcake","cupcakes"]],
["Cookies",8,["cookie","cookies"]],
["Brownies",5,["brownie","brownies"]],
["Pie",3,["pie"]]
]
},
{
cat:"🍕 Food Fight",
type:"feud",
q:"Name a food you would hate to drop on your clothes.",
answers:[
["Spaghetti",27,["spaghetti","pasta"]],
["Pizza",20,["pizza"]],
["Tacos",17,["taco","tacos"]],
["Soup",14,["soup"]],
["Ice cream",12,["ice cream"]],
["Chili",10,["chili"]]
]
},

/* 📺 POP CULTURE */

{
cat:"📺 Pop Culture",
type:"trivia",
q:"In Friends, what is the name of Ross's sister?",
correct:["monica","monica geller"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What family lives in Springfield in the animated show The Simpsons?",
correct:["the simpsons","simpsons","simpson family"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What is the name of the coffee shop in Friends?",
correct:["central perk"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What color is SpongeBob SquarePants?",
correct:["yellow"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What superhero is also known as Bruce Wayne?",
correct:["batman"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What superhero is also known as Clark Kent?",
correct:["superman"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What is the name of Mickey Mouse's girlfriend?",
correct:["minnie","minnie mouse"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"Which movie features a snowman named Olaf?",
correct:["frozen"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What is the name of the cowboy in Toy Story?",
correct:["woody","sheriff woody"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What is the name of the space ranger in Toy Story?",
correct:["buzz","buzz lightyear"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What fictional city does Batman protect?",
correct:["gotham","gotham city"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What is the name of the princess in The Princess and the Frog?",
correct:["tiana","princess tiana"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What TV family includes Homer, Marge, Bart, Lisa and Maggie?",
correct:["the simpsons","simpsons"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"What character lives in a pineapple under the sea?",
correct:["spongebob","spongebob squarepants"]
},
{
cat:"📺 Pop Culture",
type:"trivia",
q:"Which superhero uses a shield with a star on it?",
correct:["captain america"]
},
/* 🏠 REAL LIFE */

{
cat:"🏠 Real Life",
type:"feud",
q:"Name something that can instantly ruin your morning.",
answers:[
["Oversleeping",27,["oversleep","overslept","sleep in","woke up late"]],
["Car trouble",22,["car trouble","car wont start","flat tire","dead battery"]],
["Traffic",18,["traffic","traffic jam"]],
["No coffee",13,["no coffee","coffee"]],
["Bad weather",11,["weather","rain","snow","storm"]],
["Losing something",9,["lost","lose","cant find"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people forget when leaving the house.",
answers:[
["Phone",28,["phone","cell phone"]],
["Keys",25,["keys","car keys"]],
["Wallet",20,["wallet","money"]],
["Lunch",11,["lunch","food"]],
["Charger",9,["charger"]],
["Sunglasses",7,["sunglasses","glasses"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name a chore people put off as long as possible.",
answers:[
["Laundry",27,["laundry","wash clothes"]],
["Dishes",24,["dishes","dishwashing"]],
["Cleaning bathroom",18,["bathroom","clean bathroom","toilet"]],
["Vacuuming",13,["vacuum","vacuuming"]],
["Taking out trash",10,["trash","garbage"]],
["Mopping",8,["mop","mopping"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people do right before going to bed.",
answers:[
["Check phone",29,["phone","check phone","scroll"]],
["Brush teeth",25,["brush teeth","teeth"]],
["Use bathroom",17,["bathroom","toilet"]],
["Watch TV",13,["tv","watch tv"]],
["Set alarm",9,["alarm","set alarm"]],
["Get a drink",7,["drink","water"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people lose around the house.",
answers:[
["Keys",27,["keys"]],
["Phone",24,["phone"]],
["Remote",22,["remote","tv remote"]],
["Socks",11,["socks","sock"]],
["Glasses",9,["glasses"]],
["Charger",7,["charger"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something that makes people late in the morning.",
answers:[
["Oversleeping",29,["oversleep","overslept","sleep"]],
["Kids",22,["kids","children"]],
["Traffic",18,["traffic"]],
["Getting dressed",12,["clothes","getting dressed","dressed"]],
["Can't find something",11,["cant find","lost","looking"]],
["Car trouble",8,["car","car trouble"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people do while watching TV.",
answers:[
["Eat",27,["eat","snack","food"]],
["Use phone",26,["phone","scroll","text"]],
["Fall asleep",17,["sleep","fall asleep"]],
["Talk",12,["talk","conversation"]],
["Fold laundry",10,["laundry","fold clothes"]],
["Drink",8,["drink"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people hate running out of at home.",
answers:[
["Toilet paper",31,["toilet paper","tp"]],
["Food",23,["food","groceries"]],
["Milk",14,["milk"]],
["Soap",12,["soap"]],
["Coffee",11,["coffee"]],
["Paper towels",9,["paper towels"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people check before leaving home.",
answers:[
["Phone",24,["phone"]],
["Keys",22,["keys"]],
["Wallet",19,["wallet"]],
["Doors locked",15,["door","doors","locked","lock"]],
["Weather",11,["weather"]],
["Stove",9,["stove","oven"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something that piles up quickly at home.",
answers:[
["Laundry",29,["laundry","clothes"]],
["Dishes",25,["dishes"]],
["Trash",18,["trash","garbage"]],
["Mail",11,["mail"]],
["Toys",9,["toys"]],
["Shoes",8,["shoes"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people clean before company comes over.",
answers:[
["Bathroom",26,["bathroom","toilet"]],
["Living room",23,["living room"]],
["Kitchen",20,["kitchen"]],
["Floors",13,["floor","floors","vacuum"]],
["Dishes",10,["dishes"]],
["Bedroom",8,["bedroom"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people keep in their junk drawer.",
answers:[
["Batteries",23,["batteries","battery"]],
["Pens",21,["pens","pen"]],
["Tape",17,["tape"]],
["Scissors",15,["scissors"]],
["Chargers",13,["charger","chargers"]],
["Random keys",11,["keys","key"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people do when they can't sleep.",
answers:[
["Use phone",29,["phone","scroll"]],
["Watch TV",22,["tv","watch tv"]],
["Get something to eat",16,["eat","food","snack"]],
["Read",14,["read","book"]],
["Toss and turn",11,["toss","turn","toss and turn"]],
["Get up",8,["get up","walk around"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something you might find under a couch cushion.",
answers:[
["Money",28,["money","coins","change"]],
["Food crumbs",23,["food","crumbs"]],
["Remote",18,["remote"]],
["Toys",13,["toys","toy"]],
["Phone",10,["phone"]],
["Keys",8,["keys"]]
]
},
{
cat:"🏠 Real Life",
type:"feud",
q:"Name something people forget to charge.",
answers:[
["Phone",44,["phone","cell phone"]],
["Headphones",19,["headphones","earbuds","airpods"]],
["Watch",13,["watch","smartwatch"]],
["Tablet",10,["tablet","ipad"]],
["Laptop",8,["laptop","computer"]],
["Portable charger",6,["power bank","portable charger"]]
]
},

/* 😈 SPICY-ISH */

{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name a reason you might leave someone on read.",
answers:[
["Don't know what to say",29,["dont know what to say","no response","what to say"]],
["Annoyed or mad",23,["mad","annoyed","angry","pissed"]],
["Busy",18,["busy","working","at work"]],
["Forgot to reply",14,["forgot","forget"]],
["Not interested",10,["not interested","dont like them"]],
["Being petty",6,["petty","being petty"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something that makes someone instantly less attractive.",
answers:[
["Bad hygiene",27,["hygiene","smell","dirty","stink"]],
["Being rude",23,["rude","mean","disrespectful"]],
["Bad attitude",18,["attitude","bad attitude"]],
["Lying",13,["lie","lying","liar"]],
["Arrogance",11,["arrogant","cocky","ego"]],
["Bad teeth",8,["teeth","bad teeth"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name a red flag on a first date.",
answers:[
["Rude to staff",26,["rude","staff","server"]],
["Talks about ex",23,["ex","talk about ex"]],
["Always on phone",18,["phone","texting"]],
["Lies",14,["lie","lies","lying"]],
["Too controlling",11,["controlling","control"]],
["Shows up very late",8,["late","shows up late"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something people stalk on social media after meeting someone.",
answers:[
["Photos",29,["photos","pictures","pics"]],
["Relationship status",22,["relationship","relationship status"]],
["Exes",18,["ex","exes"]],
["Friends",13,["friends","friend list"]],
["Old posts",11,["posts","old posts"]],
["Job",7,["job","work"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something people lie about on dating apps.",
answers:[
["Age",26,["age"]],
["Height",23,["height","tall"]],
["Photos or appearance",19,["photos","pictures","looks","appearance"]],
["Job",13,["job","career"]],
["Relationship status",11,["relationship","single"]],
["Interests",8,["interests","hobbies"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something that might make you cancel a date.",
answers:[
["Not feeling well",26,["sick","not feeling well","ill"]],
["Too tired",21,["tired","sleepy"]],
["Bad weather",17,["weather","snow","rain"]],
["Changed your mind",15,["changed mind","dont want to go"]],
["Better plans",12,["better plans","other plans"]],
["Argument",9,["argument","fight","mad"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something someone might do after a breakup.",
answers:[
["Cry",27,["cry","crying"]],
["Delete photos",20,["delete photos","pictures"]],
["Block their ex",18,["block","blocked"]],
["Eat comfort food",14,["eat","food","ice cream"]],
["Go out with friends",12,["friends","go out"]],
["Change their look",9,["hair","look","appearance"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something couples argue about.",
answers:[
["Money",25,["money","finances"]],
["Housework",21,["chores","housework","cleaning"]],
["Kids",18,["kids","children"]],
["Jealousy",14,["jealous","jealousy"]],
["Phone use",12,["phone","phones"]],
["Where to eat",10,["food","restaurant","where to eat"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something people notice first about someone they find attractive.",
answers:[
["Smile",25,["smile","teeth"]],
["Eyes",22,["eyes"]],
["Face",19,["face"]],
["Body",15,["body","figure"]],
["Hair",11,["hair"]],
["Clothes",8,["clothes","outfit","style"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name a reason someone might ghost another person.",
answers:[
["Not interested",31,["not interested","dont like them"]],
["Met someone else",20,["someone else","another person"]],
["Too much drama",16,["drama"]],
["Got scared",13,["scared","nervous"]],
["Too busy",11,["busy"]],
["Forgot to respond",9,["forgot","forget"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something people check before going on a date.",
answers:[
["Outfit",26,["outfit","clothes"]],
["Hair",21,["hair"]],
["Teeth",17,["teeth","smile"]],
["Breath",15,["breath"]],
["Phone",12,["phone"]],
["Wallet",9,["wallet","money"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something that could make a text conversation awkward.",
answers:[
["Wrong person",25,["wrong person","wrong number"]],
["No reply",23,["no reply","ignored","left on read"]],
["Autocorrect",18,["autocorrect","typo"]],
["Talking about an ex",13,["ex"]],
["Too many emojis",11,["emoji","emojis"]],
["One-word replies",10,["one word","short reply"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something people do to impress a crush.",
answers:[
["Dress nice",26,["dress","clothes","outfit"]],
["Make them laugh",22,["laugh","funny","joke"]],
["Act confident",17,["confident","confidence"]],
["Buy something",14,["gift","buy","flowers"]],
["Show off",12,["show off","brag"]],
["Flirt",9,["flirt","flirting"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something you should probably not talk about on a first date.",
answers:[
["Exes",30,["ex","exes"]],
["Politics",20,["politics","political"]],
["Money",17,["money","salary"]],
["Marriage",13,["marriage","wedding"]],
["Family drama",11,["family","family drama"]],
["Work drama",9,["work","work drama"]]
]
},
{
cat:"😈 Spicy-ish",
type:"feud",
q:"Name something that can make someone jealous.",
answers:[
["Flirting",27,["flirt","flirting"]],
["Talking to an ex",22,["ex"]],
["Social media likes",17,["likes","social media"]],
["Going out without them",14,["going out","friends"]],
["Texting someone else",12,["texting","text"]],
["Complimenting someone",8,["compliment","complimenting"]]
]
},

/* 🧠 RANDOM AF */

{
cat:"🧠 Random AF",
type:"feud",
q:"Name something you would hate to realize you forgot after arriving at the airport.",
answers:[
["ID or passport",38,["id","passport","identification"]],
["Phone",20,["phone","cell phone"]],
["Wallet",16,["wallet","money","credit card"]],
["Luggage",12,["luggage","bag","suitcase"]],
["Ticket",8,["ticket","boarding pass"]],
["Charger",6,["charger"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something you would grab first if you had to leave your house quickly.",
answers:[
["Phone",28,["phone"]],
["Kids or family",24,["kids","children","family"]],
["Pets",18,["pets","dog","cat"]],
["Wallet",13,["wallet","money"]],
["Keys",10,["keys"]],
["Important documents",7,["documents","papers"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something people do when nobody is watching.",
answers:[
["Sing",23,["sing","singing"]],
["Dance",21,["dance","dancing"]],
["Talk to themselves",19,["talk to themselves","talk alone"]],
["Pick their nose",14,["pick nose","nose"]],
["Eat something",12,["eat","snack"]],
["Make weird faces",11,["faces","weird faces"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something that would be terrible to step on barefoot.",
answers:[
["LEGO",32,["lego","legos"]],
["Glass",24,["glass"]],
["Thumbtack",16,["thumbtack","tack"]],
["Dog poop",12,["poop","dog poop"]],
["Toy",9,["toy","toys"]],
["Bug",7,["bug","insect"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something people talk to even though it cannot answer.",
answers:[
["Pets",31,["pet","pets","dog","cat"]],
["TV",20,["tv","television"]],
["Car",16,["car"]],
["Phone",13,["phone"]],
["Plants",11,["plant","plants"]],
["Computer",9,["computer","laptop"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something weird people keep in their car.",
answers:[
["Old food",22,["food","old food"]],
["Random clothes",20,["clothes","clothing"]],
["Trash",19,["trash","garbage"]],
["Shoes",15,["shoes"]],
["Blanket",13,["blanket"]],
["Toys",11,["toys","toy"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something that would be strange to bring to a job interview.",
answers:[
["Pet",27,["pet","dog","cat"]],
["Food",21,["food","lunch"]],
["Pillow",16,["pillow"]],
["Friend",14,["friend"]],
["Toy",12,["toy"]],
["Blanket",10,["blanket"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something people smell before deciding if it's still good.",
answers:[
["Milk",26,["milk"]],
["Leftovers",22,["leftovers","food"]],
["Meat",18,["meat","chicken"]],
["Clothes",14,["clothes","shirt"]],
["Cheese",11,["cheese"]],
["Bread",9,["bread"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something you would not want falling from the sky.",
answers:[
["Rocks",25,["rocks","rock"]],
["Animals",22,["animals","animal"]],
["Cars",17,["cars","car"]],
["Fire",15,["fire"]],
["Trash",12,["trash","garbage"]],
["Ice",9,["ice","hail"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something people accidentally put through the washing machine.",
answers:[
["Money",29,["money","cash"]],
["Tissues",21,["tissue","tissues"]],
["Phone",17,["phone"]],
["Keys",13,["keys"]],
["Receipts",11,["receipt","receipts"]],
["Earbuds",9,["earbuds","airpods","headphones"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something you would hate to find in your bed.",
answers:[
["Bug",31,["bug","insect","spider"]],
["Food crumbs",20,["food","crumbs"]],
["Snake",17,["snake"]],
["Mouse",13,["mouse"]],
["Wet spot",11,["wet","water"]],
["Someone else",8,["person","someone"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something people yell at even though it cannot hear them.",
answers:[
["TV",27,["tv","television"]],
["Car",22,["car"]],
["Computer",18,["computer","laptop"]],
["Phone",14,["phone"]],
["Alarm clock",11,["alarm","alarm clock"]],
["Traffic light",8,["traffic light","light"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something you might find in someone's pocket.",
answers:[
["Phone",28,["phone"]],
["Money",24,["money","cash"]],
["Keys",18,["keys"]],
["Wallet",13,["wallet"]],
["Gum",10,["gum"]],
["Receipt",7,["receipt"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something people forget where they parked.",
answers:[
["Car",92,["car","vehicle"]],
["Shopping cart",8,["cart","shopping cart"]]
]
},
{
cat:"🧠 Random AF",
type:"feud",
q:"Name something you might do if you saw a mouse in your house.",
answers:[
["Scream",28,["scream","yell"]],
["Run",22,["run","leave"]],
["Try to catch it",18,["catch","trap"]],
["Call someone",14,["call","get help"]],
["Stand on furniture",10,["chair","couch","furniture"]],
["Get a pet",8,["cat","dog","pet"]]
]
},
/* 👀 BE FOR REAL */

{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people pretend they do more often than they actually do.",
answers:[
["Exercise",28,["exercise","work out","workout","gym"]],
["Clean",22,["clean","cleaning"]],
["Cook",17,["cook","cooking"]],
["Read",13,["read","reading"]],
["Save money",11,["save money","saving","save"]],
["Drink water",9,["water","drink water"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people say they understand when they really don't.",
answers:[
["Work instructions",25,["work","instructions","directions"]],
["Technology",21,["technology","tech","computer"]],
["Math",18,["math"]],
["Directions",15,["directions","where to go"]],
["A joke",12,["joke"]],
["What someone said",9,["conversation","what they said"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people check immediately after waking up.",
answers:[
["Phone",44,["phone","cell phone"]],
["Time",19,["time","clock"]],
["Messages",14,["messages","texts"]],
["Social media",10,["social media","facebook","instagram"]],
["Weather",8,["weather"]],
["Email",5,["email"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people buy even though they already have enough of it.",
answers:[
["Clothes",27,["clothes","clothing"]],
["Shoes",23,["shoes"]],
["Food",17,["food","groceries"]],
["Cups",13,["cups","tumblers"]],
["Makeup",11,["makeup"]],
["Decorations",9,["decorations","decor"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people say they will do tomorrow.",
answers:[
["Exercise",24,["exercise","workout","gym"]],
["Clean",23,["clean","cleaning"]],
["Laundry",18,["laundry"]],
["Start a diet",14,["diet","eat healthy"]],
["Homework",12,["homework","schoolwork"]],
["Make a phone call",9,["call","phone call"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people do when they are supposed to be cleaning.",
answers:[
["Use their phone",28,["phone","scroll"]],
["Watch TV",22,["tv","watch tv"]],
["Sit down",17,["sit","sit down"]],
["Eat",13,["eat","snack"]],
["Listen to music",11,["music"]],
["Find another task",9,["other task","something else"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people secretly judge other people for.",
answers:[
["Clothes",23,["clothes","outfit","style"]],
["Driving",20,["driving","drive"]],
["Parenting",17,["parenting","kids"]],
["Food choices",15,["food","eating"]],
["House cleanliness",13,["house","cleanliness","dirty"]],
["Social media posts",12,["social media","posts"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people exaggerate about.",
answers:[
["How busy they are",25,["busy","work"]],
["Money",21,["money","income"]],
["How much they exercise",18,["exercise","gym"]],
["Stories",15,["story","stories"]],
["Their skills",12,["skills","ability"]],
["How tired they are",9,["tired","sleep"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people do when they don't want to answer a question.",
answers:[
["Change the subject",28,["change subject","subject"]],
["Ignore it",23,["ignore","nothing"]],
["Laugh",17,["laugh"]],
["Say I don't know",14,["dont know","i dont know"]],
["Walk away",10,["walk away","leave"]],
["Ask another question",8,["question","ask back"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people say they don't care about but actually do.",
answers:[
["Other people's opinions",26,["opinions","what people think"]],
["Social media likes",21,["likes","social media"]],
["Money",18,["money"]],
["Appearance",15,["looks","appearance"]],
["Their ex",11,["ex"]],
["Winning",9,["winning","win"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people do when they hear gossip.",
answers:[
["Ask for details",27,["details","ask questions"]],
["Tell someone else",23,["tell someone","share"]],
["Act surprised",17,["surprised","shock"]],
["Say they don't care",13,["dont care"]],
["Listen quietly",11,["listen","quiet"]],
["Check social media",9,["social media","look online"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people forget to cancel after a free trial.",
answers:[
["Streaming service",32,["streaming","netflix","hulu"]],
["Music subscription",20,["music","spotify"]],
["App",18,["app","application"]],
["Gym membership",13,["gym","membership"]],
["Delivery service",10,["delivery","food delivery"]],
["Cloud storage",7,["storage","cloud"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people do when their phone battery reaches one percent.",
answers:[
["Find a charger",43,["charger","charge"]],
["Turn on battery saver",18,["battery saver","low power"]],
["Stop using phone",14,["stop using","put phone down"]],
["Lower brightness",11,["brightness","dim"]],
["Panic",8,["panic","freak out"]],
["Ask to borrow charger",6,["borrow charger","ask charger"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people spend too much money on.",
answers:[
["Food",28,["food","restaurants","takeout"]],
["Clothes",21,["clothes"]],
["Coffee",16,["coffee"]],
["Online shopping",14,["shopping","amazon","online"]],
["Entertainment",12,["entertainment","movies"]],
["Subscriptions",9,["subscriptions","apps"]]
]
},
{
cat:"👀 Be For Real",
type:"feud",
q:"Name something people do while saying they're listening.",
answers:[
["Look at phone",31,["phone","scroll"]],
["Say uh-huh",20,["uh huh","yeah"]],
["Nod",17,["nod","nodding"]],
["Think about something else",14,["thinking","daydream"]],
["Watch TV",10,["tv"]],
["Interrupt",8,["interrupt","talk"]]
]
},

/* 🕰️ THROWBACK */

{cat:"🕰️ Throwback",type:"trivia",q:"What virtual pet toy became a huge craze in the late 1990s?",correct:["tamagotchi","tamagotchis"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What company made the original Game Boy?",correct:["nintendo"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What yellow video game character eats dots while avoiding ghosts?",correct:["pac-man","pacman"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What handheld toy let you twist and pull commands like Bop It and Twist It?",correct:["bop it","bopit"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What was the name of the purple dinosaur from the children's TV show?",correct:["barney"]},
{cat:"🕰️ Throwback",type:"trivia",q:"Which video game character is famous for collecting golden rings?",correct:["sonic","sonic the hedgehog"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What toy consists of a plastic hoop spun around the waist?",correct:["hula hoop","hulahoop"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What classic puzzle has six colored sides made of smaller squares?",correct:["rubiks cube","rubik's cube","rubik cube"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What toy uses a string and two sticks to make a spool spin?",correct:["diabolo","chinese yo-yo","chinese yoyo"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What board game has players buying properties such as Boardwalk?",correct:["monopoly"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What game asks players to remove body parts without touching the metal sides?",correct:["operation"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What drawing toy uses two knobs to move a line around a gray screen?",correct:["etch a sketch","etch-a-sketch"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What toy is a spring that can walk down stairs?",correct:["slinky"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What colorful candy characters were featured in commercials saying they melt in your mouth, not in your hand?",correct:["m&ms","m&m","m&m's"]},
{cat:"🕰️ Throwback",type:"trivia",q:"What classic game has players asking whether a person has glasses, a hat, or other features?",correct:["guess who","guess who?"]},

/* 💸 MONEY MONEY */

{
cat:"💸 Money Money",
type:"feud",
q:"Name the first thing people say they would buy if they won the lottery.",
answers:[
["House",35,["house","home"]],
["Car",21,["car","vehicle"]],
["Vacation",16,["vacation","trip","travel"]],
["Pay off debt",13,["debt","bills","pay off"]],
["Help family",9,["family","help family"]],
["Quit their job",6,["quit","quit job"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people hate spending money on.",
answers:[
["Bills",31,["bills","utilities"]],
["Gas",21,["gas","gasoline"]],
["Taxes",17,["taxes","tax"]],
["Repairs",13,["repairs","repair"]],
["Insurance",10,["insurance"]],
["Parking",8,["parking"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people save money for.",
answers:[
["House",27,["house","home"]],
["Vacation",23,["vacation","trip"]],
["Car",19,["car"]],
["Retirement",13,["retirement"]],
["Emergency",10,["emergency","emergency fund"]],
["Christmas",8,["christmas","holidays"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people buy on payday.",
answers:[
["Food",27,["food","groceries","takeout"]],
["Clothes",20,["clothes"]],
["Gas",17,["gas"]],
["Bills",15,["bills"]],
["Something online",12,["online","amazon","shopping"]],
["Entertainment",9,["entertainment","movies"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something that costs more than people expect.",
answers:[
["Car repairs",24,["car repair","repairs"]],
["Groceries",22,["groceries","food"]],
["Home repairs",18,["home repair","house repair"]],
["Medical bills",14,["medical","doctor","hospital"]],
["Vacation",12,["vacation","travel"]],
["Eating out",10,["restaurant","eating out"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people regret buying.",
answers:[
["Clothes",23,["clothes"]],
["Car",19,["car"]],
["Online purchase",18,["online","amazon"]],
["Subscription",15,["subscription"]],
["Expensive gadget",13,["gadget","electronics"]],
["Furniture",12,["furniture"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people use to pay besides cash.",
answers:[
["Debit card",31,["debit","debit card"]],
["Credit card",27,["credit","credit card"]],
["Phone",17,["phone","apple pay","google pay"]],
["Check",11,["check","cheque"]],
["Gift card",8,["gift card"]],
["Payment app",6,["cash app","venmo","paypal"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people buy that loses value quickly.",
answers:[
["Car",43,["car","vehicle"]],
["Phone",18,["phone"]],
["Electronics",15,["electronics","technology"]],
["Clothes",10,["clothes"]],
["Furniture",8,["furniture"]],
["Appliances",6,["appliances"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name a reason someone might borrow money.",
answers:[
["Bills",27,["bills"]],
["Emergency",23,["emergency"]],
["Car repair",18,["car","car repair"]],
["Rent",14,["rent"]],
["Food",10,["food","groceries"]],
["Vacation",8,["vacation","trip"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people compare prices on before buying.",
answers:[
["Cars",24,["car","cars"]],
["Groceries",21,["groceries","food"]],
["Electronics",19,["electronics","tv","phone"]],
["Hotels",14,["hotel","hotels"]],
["Flights",12,["flight","flights","airfare"]],
["Furniture",10,["furniture"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people forget they're paying a monthly subscription for.",
answers:[
["Streaming",31,["streaming","netflix","hulu"]],
["Apps",22,["apps","app"]],
["Music",17,["music","spotify"]],
["Gym",13,["gym"]],
["Cloud storage",10,["storage","cloud"]],
["Gaming",7,["gaming","game"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people might sell when they need extra money.",
answers:[
["Clothes",24,["clothes"]],
["Electronics",22,["electronics","phone","tv"]],
["Furniture",17,["furniture"]],
["Car",15,["car"]],
["Jewelry",13,["jewelry"]],
["Collectibles",9,["collectibles","collection"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people spend money on every week.",
answers:[
["Groceries",29,["groceries","food"]],
["Gas",24,["gas"]],
["Eating out",18,["restaurant","takeout","eating out"]],
["Coffee",12,["coffee"]],
["Entertainment",9,["entertainment"]],
["Kids",8,["kids","children"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something people would do if they suddenly became rich.",
answers:[
["Quit job",28,["quit","quit job"]],
["Travel",24,["travel","vacation"]],
["Buy a house",19,["house","home"]],
["Help family",13,["family"]],
["Buy a car",10,["car"]],
["Invest",6,["invest","investment"]]
]
},
{
cat:"💸 Money Money",
type:"feud",
q:"Name something that can wreck a monthly budget.",
answers:[
["Car repair",25,["car","car repair"]],
["Medical bill",21,["medical","doctor"]],
["Unexpected bill",18,["bill","unexpected bill"]],
["Shopping",15,["shopping"]],
["Eating out",12,["food","restaurant"]],
["Emergency",9,["emergency"]]
]
},

/* ❤️ LOVE & DATING */

{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something that can ruin a first date immediately.",
answers:[
["Being rude",27,["rude","mean","disrespectful"]],
["Talking about an ex",22,["ex","talk about ex"]],
["Being on the phone",18,["phone","texting"]],
["Bad hygiene",14,["hygiene","smell","dirty"]],
["Showing up late",11,["late"]],
["No conversation",8,["no conversation","quiet","awkward"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name a popular place for a first date.",
answers:[
["Restaurant",31,["restaurant","dinner"]],
["Movies",23,["movies","movie theater"]],
["Coffee shop",17,["coffee","coffee shop"]],
["Bar",12,["bar","drinks"]],
["Park",10,["park"]],
["Bowling",7,["bowling"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something someone might bring on a date.",
answers:[
["Flowers",30,["flowers","flower"]],
["Money",22,["money","wallet"]],
["Phone",18,["phone"]],
["Gift",13,["gift","present"]],
["Gum or mints",10,["gum","mints","mint"]],
["Confidence",7,["confidence"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something couples do for date night.",
answers:[
["Dinner",31,["dinner","restaurant","eat"]],
["Movies",23,["movie","movies"]],
["Stay home",16,["stay home","home"]],
["Go for drinks",12,["drinks","bar"]],
["Bowling",10,["bowling"]],
["Concert",8,["concert","music"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something people want in a partner.",
answers:[
["Honesty",25,["honest","honesty"]],
["Sense of humor",22,["funny","humor"]],
["Loyalty",19,["loyal","loyalty"]],
["Kindness",15,["kind","kindness"]],
["Good communication",11,["communication"]],
["Attraction",8,["attraction","attractive"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something couples argue about on vacation.",
answers:[
["Money",24,["money"]],
["Directions",21,["directions","driving"]],
["Where to eat",18,["food","restaurant"]],
["Schedule",15,["schedule","plans"]],
["Packing",12,["packing","luggage"]],
["Photos",10,["photos","pictures"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something someone might do to apologize after an argument.",
answers:[
["Say sorry",33,["sorry","apologize"]],
["Buy flowers",19,["flowers"]],
["Buy food",16,["food","dinner"]],
["Give a gift",13,["gift"]],
["Send a text",11,["text","message"]],
["Give a hug",8,["hug"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something couples share.",
answers:[
["Bed",23,["bed"]],
["Money",21,["money","bank account"]],
["Food",18,["food"]],
["Secrets",15,["secrets"]],
["Streaming accounts",13,["streaming","netflix"]],
["Clothes",10,["clothes"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something people remember about their first date.",
answers:[
["Where they went",26,["place","where","restaurant"]],
["What they wore",21,["clothes","outfit"]],
["First kiss",18,["kiss","first kiss"]],
["Conversation",15,["conversation","talk"]],
["Food",11,["food","meal"]],
["How nervous they were",9,["nervous","nerves"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something someone might post after getting into a new relationship.",
answers:[
["Couple photo",33,["photo","picture","couple picture"]],
["Relationship status",20,["relationship status","status"]],
["Date night",16,["date","date night"]],
["Flowers or gift",12,["flowers","gift"]],
["Cute message",11,["message","caption"]],
["Nothing",8,["nothing"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something that makes a good anniversary gift.",
answers:[
["Jewelry",25,["jewelry","ring","necklace"]],
["Flowers",22,["flowers"]],
["Dinner",18,["dinner","restaurant"]],
["Trip",15,["trip","vacation"]],
["Personalized gift",12,["personalized","custom gift"]],
["Chocolate",8,["chocolate","candy"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something people do when they have a crush.",
answers:[
["Smile",24,["smile"]],
["Flirt",22,["flirt","flirting"]],
["Text them",19,["text","message"]],
["Talk about them",15,["talk","tell friends"]],
["Stalk social media",12,["social media","look online"]],
["Get nervous",8,["nervous"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something that might make someone swipe left.",
answers:[
["Bad photo",27,["photo","picture"]],
["No bio",20,["bio","no bio"]],
["Rude profile",17,["rude","profile"]],
["Smoking",14,["smoking","smoke"]],
["Too far away",12,["distance","far"]],
["Bad grammar",10,["grammar","spelling"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something couples take pictures of together.",
answers:[
["Vacation",24,["vacation","trip"]],
["Food",20,["food","dinner"]],
["Holidays",18,["holiday","christmas"]],
["Pets",15,["pets","dog","cat"]],
["Kids",13,["kids","children"]],
["Selfies",10,["selfie","selfies"]]
]
},
{
cat:"❤️ Love & Dating",
type:"feud",
q:"Name something that could make someone forget an anniversary.",
answers:[
["Busy at work",27,["work","busy"]],
["Bad memory",23,["forgot","memory"]],
["Stress",18,["stress","stressed"]],
["Wrong date",13,["date","wrong date"]],
["Travel",11,["travel","trip"]],
["Argument",8,["argument","fight"]]
]
},
/* 🏈 SPORTS */

{cat:"🏈 Sports",type:"trivia",q:"How many points is a touchdown worth before the extra-point attempt?",correct:["6","six","6 points","six points"]},
{cat:"🏈 Sports",type:"trivia",q:"How many players from one basketball team are on the court at one time?",correct:["5","five"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport uses a puck?",correct:["hockey","ice hockey"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport is played at Wimbledon?",correct:["tennis"]},
{cat:"🏈 Sports",type:"trivia",q:"How many bases are on a baseball field, including home plate?",correct:["4","four"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport uses the terms strike, spare, and gutter?",correct:["bowling"]},
{cat:"🏈 Sports",type:"trivia",q:"What color card sends a soccer player off the field?",correct:["red","red card"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport uses a quarterback?",correct:["football","american football"]},
{cat:"🏈 Sports",type:"trivia",q:"How many points is a free throw worth in basketball?",correct:["1","one","one point","1 point"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport is played in the NBA?",correct:["basketball"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport is played in the NFL?",correct:["football","american football"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport uses a bat, bases, and a home plate?",correct:["baseball","softball"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport uses a net, a ball, and six players per team on the court?",correct:["volleyball"]},
{cat:"🏈 Sports",type:"trivia",q:"In golf, what is one stroke under par called?",correct:["birdie","a birdie"]},
{cat:"🏈 Sports",type:"trivia",q:"What sport includes the balance beam and uneven bars?",correct:["gymnastics"]},

/* 🎁 MYSTERY */

{
cat:"🎁 Mystery",
type:"feud",
q:"Name something you would NOT want your coworkers to find in your car.",
answers:[
["Trash or mess",29,["trash","mess","messy","garbage"]],
["Underwear or clothes",20,["underwear","clothes","clothing"]],
["Old food",17,["old food","food","leftovers"]],
["Embarrassing item",13,["embarrassing","personal item"]],
["Shopping bags",11,["shopping bags","bags","packages"]],
["Something that smells",10,["smell","smells","stinky"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something you might find inside a mystery box.",
answers:[
["Candy",24,["candy","chocolate"]],
["Toy",22,["toy","toys"]],
["Money",18,["money","cash"]],
["Food",14,["food","snack"]],
["Gift card",12,["gift card"]],
["Something gross",10,["gross","slime","goo"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something that would make you nervous if you heard it in your house at night.",
answers:[
["Footsteps",28,["footsteps","steps","walking"]],
["Door opening",22,["door","door opening"]],
["Glass breaking",18,["glass","breaking glass"]],
["Someone talking",13,["talking","voice","voices"]],
["Knocking",11,["knock","knocking"]],
["Scratching",8,["scratch","scratching"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something people hide when guests come over.",
answers:[
["Mess",29,["mess","clutter"]],
["Laundry",22,["laundry","clothes"]],
["Bills",16,["bills","mail"]],
["Valuables",13,["valuables","money","jewelry"]],
["Personal items",11,["personal","personal items"]],
["Snacks",9,["snacks","food"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something you might find in an abandoned house.",
answers:[
["Dust",24,["dust","dusty"]],
["Spider webs",22,["spider webs","webs","cobwebs"]],
["Old furniture",19,["furniture","old furniture"]],
["Mice",14,["mice","mouse"]],
["Broken windows",12,["windows","broken windows"]],
["Ghost",9,["ghost","ghosts"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something that could be hiding under your bed.",
answers:[
["Shoes",25,["shoes"]],
["Dust",22,["dust"]],
["Clothes",18,["clothes"]],
["Toys",14,["toys","toy"]],
["Pet",12,["pet","cat","dog"]],
["Monster",9,["monster"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something you might find in an old attic.",
answers:[
["Boxes",26,["boxes","box"]],
["Old clothes",21,["clothes"]],
["Photos",18,["photos","pictures"]],
["Furniture",14,["furniture"]],
["Holiday decorations",12,["decorations","christmas"]],
["Spider webs",9,["webs","spider webs"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something people lock up to keep safe.",
answers:[
["Money",27,["money","cash"]],
["Jewelry",23,["jewelry"]],
["Documents",17,["documents","papers"]],
["Guns",13,["guns","gun"]],
["Medicine",11,["medicine","medication"]],
["Electronics",9,["electronics","computer"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something you might hear in a scary movie.",
answers:[
["Scream",30,["scream","screaming"]],
["Creepy music",23,["music","creepy music"]],
["Footsteps",17,["footsteps","steps"]],
["Door creak",13,["door","creak"]],
["Thunder",10,["thunder"]],
["Whispering",7,["whisper","whispering"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something people search for with a flashlight.",
answers:[
["Lost item",25,["lost item","something lost"]],
["Keys",20,["keys"]],
["Pet",17,["pet","dog","cat"]],
["Something under furniture",15,["under bed","under couch","furniture"]],
["Power outage supplies",13,["supplies","fuse"]],
["Bugs",10,["bug","bugs"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something that could make a strange noise in your house.",
answers:[
["Pipes",24,["pipes","pipe"]],
["Furnace",21,["furnace","heater"]],
["Refrigerator",18,["refrigerator","fridge"]],
["Pet",15,["pet","cat","dog"]],
["Wind",12,["wind"]],
["Floor",10,["floor","floorboards"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something people keep secret.",
answers:[
["Surprise party",24,["party","surprise party"]],
["Relationship",21,["relationship","dating"]],
["Money",18,["money"]],
["Gift",15,["gift","present"]],
["Password",12,["password"]],
["Crush",10,["crush"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something you might discover behind a locked door.",
answers:[
["Room",27,["room"]],
["Storage",22,["storage","boxes"]],
["Valuables",17,["valuables","money"]],
["Person",13,["person","someone"]],
["Pet",11,["pet","animal"]],
["Nothing",10,["nothing","empty"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something people are afraid to find in their basement.",
answers:[
["Spider",27,["spider","spiders"]],
["Mouse",22,["mouse","mice","rat"]],
["Snake",17,["snake"]],
["Water",14,["water","flood"]],
["Mold",11,["mold"]],
["Person",9,["person","someone"]]
]
},
{
cat:"🎁 Mystery",
type:"feud",
q:"Name something you might find inside an old suitcase.",
answers:[
["Clothes",30,["clothes","clothing"]],
["Photos",20,["photos","pictures"]],
["Money",17,["money","cash"]],
["Documents",13,["documents","papers"]],
["Souvenirs",11,["souvenirs","souvenir"]],
["Nothing",9,["nothing","empty"]]
]
},

/* 🎵 SONGS & ARTISTS */

{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer is known as the King of Pop?",correct:["michael jackson"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer released the album 21?",correct:["adele"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer is known for the song Single Ladies?",correct:["beyonce","beyoncé"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which artist is known as The Boss?",correct:["bruce springsteen"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer starred as Hannah Montana?",correct:["miley cyrus"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer is known as the Material Girl?",correct:["madonna"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer was the lead vocalist of Queen?",correct:["freddie mercury"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which artist recorded Purple Rain?",correct:["prince"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer is known for the hit Rolling in the Deep?",correct:["adele"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer released the album Thriller?",correct:["michael jackson"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer is known for the song Jolene?",correct:["dolly parton"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer is known for the song Umbrella?",correct:["rihanna"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer is known for the song Firework?",correct:["katy perry"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which singer is known for the song Since U Been Gone?",correct:["kelly clarkson"]},
{cat:"🎵 Songs & Artists",type:"trivia",q:"Which artist is known for the song Yeah! featuring Lil Jon and Ludacris?",correct:["usher"]},

/* 🎤 FINISH THE LYRICS */
/* These use traditional/public-domain songs so the full game can safely include the lyric lines. */

{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Twinkle, twinkle, little star, how I wonder what you ___",
correct:["are"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Row, row, row your boat, gently down the ___",
correct:["stream"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Mary had a little lamb, its fleece was white as ___",
correct:["snow"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: The wheels on the bus go round and ___",
correct:["round"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Old MacDonald had a farm, E-I-E-I-___",
correct:["o"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Jingle bells, jingle bells, jingle all the ___",
correct:["way"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Happy birthday to you, happy birthday to ___",
correct:["you"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: London Bridge is falling ___",
correct:["down"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Hickory dickory dock, the mouse ran up the ___",
correct:["clock"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Rock-a-bye baby, on the tree ___",
correct:["top"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Baa, baa, black sheep, have you any ___",
correct:["wool"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Rain, rain, go away, come again another ___",
correct:["day"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: This old man, he played one, he played knick-knack on my ___",
correct:["thumb"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Yankee Doodle went to town, riding on a ___",
correct:["pony"]
},
{
cat:"🎤 Finish the Lyrics",
type:"trivia",
q:"Finish the lyric: Take me out to the ball game, take me out with the ___",
correct:["crowd"]
},
/* 🎬 MOVIES & TV */

{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of the lion cub who becomes king in The Lion King?",correct:["simba"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of the snowman in Frozen?",correct:["olaf"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of Harry Potter's school?",correct:["hogwarts","hogwarts school of witchcraft and wizardry"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What color pill does Neo take in The Matrix?",correct:["red","red pill"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of Shrek's wife?",correct:["fiona","princess fiona"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What kind of fish is Nemo?",correct:["clownfish","clown fish"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of the kingdom in Frozen?",correct:["arendelle"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"Who is the main villain in The Lion King?",correct:["scar"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of Wednesday Addams' brother?",correct:["pugsley","pugsley addams"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of the green ogre who lives in a swamp?",correct:["shrek"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of the blue fish who helps Marlin find Nemo?",correct:["dory"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What superhero is Peter Parker?",correct:["spider-man","spiderman","spider man"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of the princess with extremely long magical hair in Tangled?",correct:["rapunzel"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What TV show follows employees working at the Dunder Mifflin paper company?",correct:["the office","office"]},
{cat:"🎬 Movies & TV",type:"trivia",q:"What is the name of the toy cowboy voiced by Tom Hanks in Toy Story?",correct:["woody","sheriff woody"]},

/* 🤔 WOULD YOU RATHER */

{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather have unlimited money or unlimited free time?",
answers:[
["Unlimited money",55,["money","unlimited money","rich"]],
["Unlimited free time",45,["free time","time","unlimited time"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather never cook again or never clean again?",
answers:[
["Never clean",56,["never clean","clean","cleaning"]],
["Never cook",44,["never cook","cook","cooking"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather be able to fly or become invisible?",
answers:[
["Fly",54,["fly","flying"]],
["Invisible",46,["invisible","invisibility"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather give up your phone for a month or TV for a month?",
answers:[
["Give up TV",67,["tv","television","give up tv"]],
["Give up phone",33,["phone","give up phone"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather always be 30 minutes early or 30 minutes late?",
answers:[
["30 minutes early",84,["early","30 minutes early","thirty minutes early"]],
["30 minutes late",16,["late","30 minutes late","thirty minutes late"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather have free groceries forever or free gas forever?",
answers:[
["Free groceries",58,["groceries","free groceries","food"]],
["Free gas",42,["gas","free gas","gasoline"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather live at the beach or in the mountains?",
answers:[
["Beach",61,["beach","ocean"]],
["Mountains",39,["mountains","mountain"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather have a personal chef or a personal house cleaner?",
answers:[
["House cleaner",53,["cleaner","house cleaner","maid"]],
["Personal chef",47,["chef","personal chef","cook"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather always have perfect Wi-Fi or always have a full phone battery?",
answers:[
["Perfect Wi-Fi",52,["wifi","wi-fi","perfect wifi","internet"]],
["Full battery",48,["battery","full battery","phone battery"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather work four long days or five shorter days each week?",
answers:[
["Four long days",71,["four days","4 days","four long days","4 long days"]],
["Five shorter days",29,["five days","5 days","five shorter days","5 shorter days"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather lose your keys or lose your phone?",
answers:[
["Lose keys",73,["keys","lose keys"]],
["Lose phone",27,["phone","lose phone"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather have summer all year or winter all year?",
answers:[
["Summer",72,["summer"]],
["Winter",28,["winter"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather get free concert tickets forever or free movie tickets forever?",
answers:[
["Concert tickets",56,["concert","concerts","concert tickets"]],
["Movie tickets",44,["movie","movies","movie tickets"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather know what people are thinking or know what will happen tomorrow?",
answers:[
["Know the future",58,["future","tomorrow","what will happen"]],
["Read minds",42,["minds","read minds","thinking","thoughts"]]
]
},
{
cat:"🤔 Would You Rather",
type:"feud",
q:"Would you rather have no traffic ever again or never wait in a line again?",
answers:[
["No traffic",57,["traffic","no traffic"]],
["No lines",43,["lines","line","no lines","never wait"]]
]
},

/* 🧩 RIDDLES & BRAIN TEASERS */

{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has hands and a face but cannot hold anything or smile?",correct:["clock","a clock"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What gets wetter the more it dries?",correct:["towel","a towel"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has keys but cannot open locks?",correct:["piano","a piano","keyboard"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has one eye but cannot see?",correct:["needle","a needle"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has many teeth but cannot bite?",correct:["comb","a comb"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What goes up but never comes back down?",correct:["age","your age"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has a neck but no head?",correct:["bottle","a bottle"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What can travel around the world while staying in one corner?",correct:["stamp","a stamp"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has words but never speaks?",correct:["book","a book"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has four wheels and flies?",correct:["garbage truck","a garbage truck","trash truck"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What can you catch but not throw?",correct:["cold","a cold"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has a thumb and four fingers but is not alive?",correct:["glove","a glove"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"The more you take away from me, the bigger I get. What am I?",correct:["hole","a hole"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What has legs but does not walk?",correct:["table","a table"]},
{cat:"🧩 Riddles & Brain Teasers",type:"trivia",q:"What comes down but never goes up?",correct:["rain"]},

/* 🌎 GENERAL TRIVIA */

{cat:"🌎 General Trivia",type:"trivia",q:"What is the largest planet in our solar system?",correct:["jupiter"]},
{cat:"🌎 General Trivia",type:"trivia",q:"How many days are in a leap year?",correct:["366","three hundred sixty six","three hundred and sixty six"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What is the capital of France?",correct:["paris"]},
{cat:"🌎 General Trivia",type:"trivia",q:"How many continents are there?",correct:["7","seven"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What planet is known as the Red Planet?",correct:["mars"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What is the largest ocean on Earth?",correct:["pacific","pacific ocean","the pacific ocean"]},
{cat:"🌎 General Trivia",type:"trivia",q:"How many sides does a hexagon have?",correct:["6","six"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What animal is known as the king of the jungle?",correct:["lion","a lion"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What gas do humans need to breathe to survive?",correct:["oxygen"]},
{cat:"🌎 General Trivia",type:"trivia",q:"How many hours are in one day?",correct:["24","twenty four","twenty-four"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What is frozen water called?",correct:["ice"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What is the fastest land animal?",correct:["cheetah","a cheetah"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What is the largest mammal in the world?",correct:["blue whale","a blue whale"]},
{cat:"🌎 General Trivia",type:"trivia",q:"How many minutes are in one hour?",correct:["60","sixty"]},
{cat:"🌎 General Trivia",type:"trivia",q:"What planet do we live on?",correct:["earth","planet earth"]},
];

/* =========================
   GAME HELPERS
========================= */

const bank=questions;

const norm=s=>(s||"")
  .toLowerCase()
  .trim()
  .replace(/[^\w\s']/g,"")
  .replace(/\s+/g," ");

const esc=s=>{
  const d=document.createElement("div");
  d.textContent=s||"";
  return d.innerHTML;
};

function mult(r){
  return r>=5?3:r>=3?2:1;
}

function code(){
  return String(Math.floor(1000+Math.random()*9000));
}

function getTimerSeconds(){
  const el=$("timerSelect");
  const n=Number(el?.value||35);
  return [15,20,25,30,35].includes(n)?n:35;
}

function getCategories(){
  return [...new Set(bank.map(q=>q.cat))];
}

function usedKey(){
  return "feud-used-all-games";
}

function loadUsed(){
  try{
    state.used=new Set(
      JSON.parse(localStorage.getItem(usedKey())||"[]")
    );
  }catch{
    state.used=new Set();
  }
}

function saveUsed(){
  try{
    localStorage.setItem(
      usedKey(),
      JSON.stringify([...state.used])
    );
  }catch{}
}

function clearUsed(){
    loadUsed();
}

function pickUnused(category){
  const choices=[];

  bank.forEach((q,i)=>{
    if(q.cat===category && !state.used.has(i)){
      choices.push(i);
    }
  });

  if(!choices.length){
    bank.forEach((q,i)=>{
      if(q.cat===category){
        state.used.delete(i);
        choices.push(i);
      }
    });
  }

  const picked=
    choices[Math.floor(Math.random()*choices.length)];

  state.used.add(picked);
  saveUsed();

  return picked;
}

/* =========================
   CREATE / JOIN GAME
========================= */

async function createGame(){
  if(C.SUPABASE_URL.includes("PASTE_")) return;

  const host=$("hostName").value.trim();

  if(!host){
    $("homeMsg").textContent="Enter your host name.";
    return;
  }

  let room=code();

  const {data:g,error}=await sb
    .from("games")
    .insert({
      room_code:room,
      host_name:host,
      status:"lobby",
      round:1
    })
    .select()
    .single();

  if(error){
    $("homeMsg").textContent=error.message;
    return;
  }

  const {data:p,error:pe}=await sb
    .from("players")
    .insert({
      game_id:g.id,
      name:host,
      is_host:true,
      score:0
    })
    .select()
    .single();

  if(pe){
    $("homeMsg").textContent=pe.message;
    return;
  }

  state={
    ...state,
    role:"host",
    game:g,
    player:p,
    lastQuestion:null,
    scoring:false
  };

  clearUsed();
  enterLobby();
  subscribe();
}

async function joinGame(){
  if(C.SUPABASE_URL.includes("PASTE_")) return;

  const name=$("joinName").value.trim();
  const room=$("joinCode").value.trim();

  if(!name || room.length!==4){
    $("homeMsg").textContent=
      "Enter your name and 4-digit room code.";
    return;
  }

  const {data:g,error}=await sb
    .from("games")
    .select("*")
    .eq("room_code",room)
    .neq("status","finished")
    .maybeSingle();

  if(error || !g){
    $("homeMsg").textContent="Room not found.";
    return;
  }

  const {data:p,error:pe}=await sb
    .from("players")
    .insert({
      game_id:g.id,
      name,
      is_host:false,
      score:0
    })
    .select()
    .single();

  if(pe){
    $("homeMsg").textContent=pe.message;
    return;
  }

  state={
    ...state,
    role:"player",
    game:g,
    player:p,
    lastQuestion:null,
    scoring:false
  };

  enterLobby();
  subscribe();
}

/* =========================
   LOBBY
========================= */

function enterLobby(){
  $("home").classList.add("hidden");
  $("play").classList.add("hidden");
  $("lobby").classList.remove("hidden");

  $("roomCode").textContent=state.game.room_code;

  $("lobbyRole").textContent=
    state.role==="host"
      ?"🎤 Host: "+state.player.name
      :"👤 "+state.player.name;

  $("startGame").classList.toggle(
    "hidden",
    state.role!=="host"
  );

  $("hostSetup").classList.toggle(
    "hidden",
    state.role!=="host"
  );

  $("lobbyWait").classList.toggle(
    "hidden",
    state.role==="host"
  );

  refresh();
}

/* =========================
   REALTIME
========================= */

async function subscribe(){
  if(state.channel){
    await sb.removeChannel(state.channel);
  }

  state.channel=sb
    .channel("game-"+state.game.id)

    .on(
      "postgres_changes",
      {
        event:"*",
        schema:"public",
        table:"games",
        filter:"id=eq."+state.game.id
      },
      ()=>refresh()
    )

    .on(
      "postgres_changes",
      {
        event:"*",
        schema:"public",
        table:"players",
        filter:"game_id=eq."+state.game.id
      },
      ()=>refresh()
    )

    .on(
      "postgres_changes",
      {
        event:"*",
        schema:"public",
        table:"answers",
        filter:"game_id=eq."+state.game.id
      },
      ()=>refresh()
    )

    .subscribe(s=>{
      $("connectionStatus").textContent=
        s==="SUBSCRIBED"
          ?"🟢 Connected"
          :"Connecting…";
    });
}

/* =========================
   REFRESH GAME
========================= */

async function refresh(){
  if(!state.game) return;

  const {data:g}=await sb
    .from("games")
    .select("*")
    .eq("id",state.game.id)
    .single();

  if(!g) return;

  state.game=g;

  if(g.status==="finished"){
    goHome();
    return;
  }

  const {data:ps}=await sb
    .from("players")
    .select("*")
    .eq("game_id",g.id)
    .order("created_at");

  if(g.status==="lobby"){
    $("play").classList.add("hidden");
    $("lobby").classList.remove("hidden");
    renderLobby(ps||[]);
    return;
  }

  $("lobby").classList.add("hidden");
  $("play").classList.remove("hidden");

  $("playRoom").textContent="Room "+g.room_code;
  $("playHost").textContent="Hosted by "+g.host_name;
  $("roundNum").textContent=g.round;
  $("roundMult").textContent=mult(g.round)+"×";

  renderLeader(ps||[]);

  if(g.status==="choosing"){
    showChoosing();
    return;
  }

  if(
    g.status==="answering" ||
    g.status==="revealed"
  ){
    await showQuestion(ps||[]);
  }
}

/* =========================
   PLAYER LIST / LEADERBOARD
========================= */

function renderLobby(ps){
  $("lobbyPlayers").innerHTML=
    ps.map(p=>
      '<div class="player">'+
      '<span>'+
      (p.is_host?"🎤 ":"👤 ")+
      esc(p.name)+
      '</span>'+
      '<span>'+
      (p.is_host?"Host":"Ready")+
      '</span>'+
      '</div>'
    ).join("");

  $("startGame").disabled=ps.length<2;

  $("hostSetup").classList.toggle(
    "hidden",
    state.role!=="host"
  );
}

function renderLeader(ps){
  let a=[...ps].sort(
    (x,y)=>(y.score||0)-(x.score||0)
  );

  $("leaderboard").innerHTML=
    a.map((p,i)=>
      '<div class="leader">'+
      '<span>'+
      (i===0?"🥇 ":
       i===1?"🥈 ":
       i===2?"🥉 ":"")+
      esc(p.name)+
      '</span>'+
      '<strong>'+
      (p.score||0)+
      '</strong>'+
      '</div>'
    ).join("");
}

/* =========================
   CATEGORY SCREEN
========================= */

function showChoosing(){
  clearInterval(state.timer);

  $("questionPanel").classList.add("hidden");

  $("waitingQuestion").classList.toggle(
    "hidden",
    state.role==="host"
  );

  $("hostCategories").classList.toggle(
    "hidden",
    state.role!=="host"
  );

  $("hostControls").classList.add("hidden");

  if(state.role==="host"){
    const cats=getCategories();

    $("categoryGrid").innerHTML=
      cats.map((cat,i)=>
        '<button class="cat" data-cat="'+i+'">'+
        cat+
        '</button>'
      ).join("");

    document
      .querySelectorAll("[data-cat]")
      .forEach(b=>{
        b.onclick=()=>{
          const cat=cats[Number(b.dataset.cat)];
          startQuestion(cat);
        };
      });
  }
}

/* =========================
   START QUESTION
========================= */

async function startQuestion(category){
  if(state.role!=="host") return;

  const i=pickUnused(category);
  const seconds=getTimerSeconds();

  const deadline=
    new Date(
      Date.now()+(seconds*1000)
    ).toISOString();

  await sb
    .from("answers")
    .delete()
    .eq("game_id",state.game.id)
    .eq("round",state.game.round);

  const {error}=await sb
    .from("games")
    .update({
      status:"answering",
      question_index:i,
      deadline
    })
    .eq("id",state.game.id);

  if(error){
    alert("Could not start question: "+error.message);
    return;
  }

  await refresh();
}

/* =========================
   SHOW QUESTION
========================= */

async function showQuestion(ps){
  const g=state.game;
  const q=bank[g.question_index];

  if(!q) return;

  const questionKey=
    g.round+"-"+g.question_index;

  if(state.lastQuestion!==questionKey){
    $("answerInput").value="";
    $("answerMsg").textContent="";
    $("answerInput").disabled=false;
    $("lockAnswer").disabled=false;
    state.lastQuestion=questionKey;
  }

  $("hostCategories").classList.add("hidden");
  $("waitingQuestion").classList.add("hidden");
  $("questionPanel").classList.remove("hidden");

  $("questionCategory").textContent=q.cat;

  $("questionType").textContent=
    q.type==="feud"
      ?"SURVEY SAYS"
      :"TRIVIA";

  $("questionText").textContent=q.q;

  const {data:ans}=await sb
    .from("answers")
    .select("*")
    .eq("game_id",g.id)
    .eq("round",g.round);

  if(g.status==="answering"){

    $("revealPanel").classList.add("hidden");
    $("hostControls").classList.add("hidden");
    $("countdownWrap").classList.remove("hidden");

    if(state.role==="host"){

      $("hostLive").classList.remove("hidden");
      $("answerEntry").classList.add("hidden");

      $("submittedCount").textContent=
        (ans||[]).length+
        " of "+
        ps.filter(p=>!p.is_host).length;

    }else{

      $("hostLive").classList.add("hidden");

      const mine=(ans||[])
        .find(a=>a.player_id===state.player.id);

      $("answerEntry").classList.remove("hidden");

      $("answerInput").disabled=!!mine;
      $("lockAnswer").disabled=!!mine;

      $("answerMsg").textContent=
        mine
          ?"🔒 Answer locked. Waiting for time…"
          :"";
    }

    runTimer(g.deadline);

  }else{

    clearInterval(state.timer);

    $("countdownWrap").classList.add("hidden");
    $("answerEntry").classList.add("hidden");
    $("hostLive").classList.add("hidden");

    await renderReveal(
      ps,
      ans||[],
      q
    );
  }
}

/* =========================
   TIMER
========================= */

function runTimer(deadline){
  clearInterval(state.timer);

  const tick=async()=>{
    const left=Math.max(
      0,
      Math.ceil(
        (new Date(deadline)-Date.now())/1000
      )
    );

    $("timer").textContent=left;

    if(left<=0){
      clearInterval(state.timer);

      if(state.role==="host"){
        await scoreAndReveal();
      }
    }
  };

  tick();

  state.timer=setInterval(
    tick,
    250
  );
}

/* =========================
   SUBMIT ANSWER
========================= */

async function submitAnswer(){
  if(state.role==="host") return;

  const txt=$("answerInput").value.trim();

  if(!txt) return;

  $("lockAnswer").disabled=true;

  const {error}=await sb
    .from("answers")
    .insert({
      game_id:state.game.id,
      round:state.game.round,
      player_id:state.player.id,
      answer_text:txt
    });

  if(error){
    $("answerMsg").textContent=error.message;
    $("lockAnswer").disabled=false;
    return;
  }

  $("answerInput").disabled=true;

  $("answerMsg").textContent=
    "🔒 Answer locked. Nobody can see it yet.";
}

/* =========================
   ANSWER MATCHING
========================= */

function matchAnswer(text,q){
  const n=norm(text);

  if(q.type==="trivia"){
    return q.correct.some(
      x=>norm(x)===n
    ) ? 25 : 0;
  }

  let best=0;

  for(const row of q.answers){
    for(const alias of row[2]){
      const a=norm(alias);

      if(
        n===a ||
        n.includes(a) ||
        a.includes(n)
      ){
        best=Math.max(
          best,
          row[1]
        );
      }
    }
  }

  return best;
}

/* =========================
   SCORE ROUND
========================= */

async function scoreAndReveal(){
  if(
    state.role!=="host" ||
    state.scoring ||
    state.game.status!=="answering"
  ){
    return;
  }

  state.scoring=true;

  try{

    const g=state.game;
    const q=bank[g.question_index];

    const {data:ans}=await sb
      .from("answers")
      .select("*")
      .eq("game_id",g.id)
      .eq("round",g.round);

    for(const a of (ans||[])){

      if(a.scored) continue;

      const base=
        matchAnswer(
          a.answer_text,
          q
        );

      const pts=
        base*mult(g.round);

      await sb
        .from("answers")
        .update({
          matched_points:pts,
          scored:true
        })
        .eq("id",a.id);
    }

    /*
      Recalculate every player's score
      from all scored answers.
      This prevents scores from drifting
      out of sync.
    */

    const {data:allAnswers}=await sb
      .from("answers")
      .select("player_id,matched_points,scored")
      .eq("game_id",g.id)
      .eq("scored",true);

    const totals={};

    for(const a of (allAnswers||[])){
      totals[a.player_id]=
        (totals[a.player_id]||0)+
        Number(a.matched_points||0);
    }

    const {data:players}=await sb
      .from("players")
      .select("*")
      .eq("game_id",g.id);

    for(const p of (players||[])){

      if(p.is_host) continue;

      await sb
        .from("players")
        .update({
          score:totals[p.id]||0
        })
        .eq("id",p.id);
    }

    await sb
      .from("games")
      .update({
        status:"revealed"
      })
      .eq("id",g.id)
      .eq("status","answering");

    await refresh();

  }finally{
    state.scoring=false;
  }
}

/* =========================
   REVEAL ANSWERS
========================= */

async function renderReveal(ps,ans,q){

  $("revealPanel").classList.remove("hidden");

  const names=
    Object.fromEntries(
      ps.map(p=>[p.id,p.name])
    );

  $("revealedAnswers").innerHTML=
    ans.length
      ? ans.map(a=>
          '<div class="reveal-row '+
          (a.matched_points>0
            ?"correct"
            :"wrong")+
          '">'+
          '<span><strong>'+
          esc(names[a.player_id]||"Player")+
          '</strong> — '+
          esc(a.answer_text)+
          '</span>'+
          '<strong>'+
          (a.matched_points>0
            ?"+"+a.matched_points
            :"0")+
          '</strong>'+
          '</div>'
        ).join("")
      :'<p class="muted">No answers were submitted.</p>';

  if(q.type==="feud"){

    $("feudBoard").innerHTML=
      '<div class="board">'+
      '<h3>Survey Board</h3>'+
      q.answers.map((x,i)=>
        '<div class="board-row">'+
        '<span>'+
        (i+1)+'. '+
        esc(x[0])+
        '</span>'+
        '<strong>'+
        x[1]+
        '</strong>'+
        '</div>'
      ).join("")+
      '</div>';

  }else{

    $("feudBoard").innerHTML=
      '<div class="board">'+
      '<h3>Correct Answer</h3>'+
      '<div class="board-row">'+
      '<span>'+
      esc(q.correct[0])+
      '</span>'+
      '<strong>25 base points</strong>'+
      '</div>'+
      '</div>';
  }

  $("hostControls").classList.toggle(
    "hidden",
    state.role!=="host"
  );
}

/* =========================
   NEXT ROUND
========================= */

async function nextRound(){
  if(state.role!=="host") return;

  state.lastQuestion=null;

  const {error}=await sb
    .from("games")
    .update({
      round:state.game.round+1,
      status:"choosing",
      question_index:null,
      deadline:null
    })
    .eq("id",state.game.id);

  if(error){
    alert(
      "Could not start next round: "+
      error.message
    );
    return;
  }

  await refresh();
}

/* =========================
   NEW GAME
========================= */

async function newGame(){
  if(state.role!=="host") return;

  const ok=confirm(
    "Start a new game with the same players? Scores will reset to 0."
  );

  if(!ok) return;

  clearInterval(state.timer);

  await sb
    .from("answers")
    .delete()
    .eq("game_id",state.game.id);

  const {data:players}=await sb
    .from("players")
    .select("*")
    .eq("game_id",state.game.id);

  for(const p of (players||[])){
    await sb
      .from("players")
      .update({score:0})
      .eq("id",p.id);
  }

  clearUsed();
  state.lastQuestion=null;

  const {error}=await sb
    .from("games")
    .update({
      round:1,
      status:"lobby",
      question_index:null,
      deadline:null
    })
    .eq("id",state.game.id);

  if(error){
    alert(
      "Could not reset game: "+
      error.message
    );
    return;
  }

  await refresh();
}

/* =========================
   END GAME
========================= */

async function endGame(){
  if(state.role!=="host") return;

  const ok=confirm(
    "End this game and send everyone back to the home screen?"
  );

  if(!ok) return;

  clearInterval(state.timer);

  const {error}=await sb
    .from("games")
    .update({
      status:"finished"
    })
    .eq("id",state.game.id);

  if(error){
    alert(
      "Could not end game: "+
      error.message
    );
    return;
  }

  goHome();
}

/* =========================
   RETURN HOME
========================= */

async function goHome(){

  clearInterval(state.timer);

  if(state.channel){
    try{
      await sb.removeChannel(
        state.channel
      );
    }catch{}
  }

  state={
    role:null,
    game:null,
    player:null,
    channel:null,
    timer:null,
    scoring:false,
    used:new Set(),
    lastQuestion:null
  };

  $("lobby").classList.add("hidden");
  $("play").classList.add("hidden");
  $("home").classList.remove("hidden");

  $("homeMsg").textContent="";
  $("joinCode").value="";
}

/* =========================
   BUTTONS
========================= */

$("createGame").onclick=createGame;

$("joinGame").onclick=joinGame;

$("startGame").onclick=async()=>{

  if(state.role!=="host") return;

  loadUsed();

  const {error}=await sb
    .from("games")
    .update({
      status:"choosing"
    })
    .eq("id",state.game.id);

  if(error){
    alert(
      "Could not start game: "+
      error.message
    );
    return;
  }

  await refresh();
};

$("lockAnswer").onclick=submitAnswer;

$("answerInput").addEventListener(
  "keydown",
  e=>{
    if(e.key==="Enter"){
      submitAnswer();
    }
  }
);
$("showAnswersNow").onclick=scoreAndReveal;
$("nextRound").onclick=nextRound;
$("newGame").onclick=newGame;
$("endGame").onclick=endGame;

})();
