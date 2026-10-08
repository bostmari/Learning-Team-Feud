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

const wildFacts=[
  {
    q:"Which planet has the shortest day in our solar system?",
    correct:["Jupiter"]
  },
  {
    q:"What is the only mammal capable of true sustained flight?",
    correct:["Bat","Bats"]
  },
  {
    q:"How many hearts does an octopus have?",
    correct:["3","Three"]
  },
  {
    q:"What is the largest organ of the human body?",
    correct:["Skin","The skin"]
  },
  {
    q:"Which blood type is known as the universal red-cell donor?",
    correct:["O negative","O-","O neg"]
  },
  {
    q:"What is the smallest country in the world by area?",
    correct:["Vatican City","Vatican"]
  },
  {
    q:"What is the largest desert on Earth?",
    correct:["Antarctica","Antarctic Desert","The Antarctic Desert"]
  },
  {
    q:"Which element has the chemical symbol W?",
    correct:["Tungsten"]
  },
  {
    q:"What is the hardest natural substance?",
    correct:["Diamond"]
  },
  {
    q:"What is the only continent located in all four hemispheres?",
    correct:["Africa"]
  },
  {
    q:"What is the capital of Australia?",
    correct:["Canberra"]
  },
  {
    q:"Which country has more pyramids than Egypt?",
    correct:["Sudan"]
  },
  {
    q:"What is the largest bone in the human body?",
    correct:["Femur","The femur"]
  },
  {
    q:"Which planet rotates on its side?",
    correct:["Uranus"]
  },
  {
    q:"What is the largest internal organ in the human body?",
    correct:["Liver","The liver"]
  },
  {
    q:"What gas makes up most of Earth's atmosphere?",
    correct:["Nitrogen"]
  },
  {
    q:"Which animal has fingerprints so similar to humans that they can be difficult to distinguish?",
    correct:["Koala","Koalas"]
  },
  {
    q:"What is the deepest ocean on Earth?",
    correct:["Pacific Ocean","Pacific","The Pacific Ocean"]
  },
  {
    q:"What is the smallest bone in the human body?",
    correct:["Stapes","Stirrup","Stirrup bone"]
  },
  {
    q:"Which planet is the hottest in our solar system?",
    correct:["Venus"]
  },
  {
    q:"What is the largest species of shark?",
    correct:["Whale shark","Whale sharks"]
  },
  {
    q:"Which country gifted the Statue of Liberty to the United States?",
    correct:["France"]
  },
  {
    q:"What is the largest species of penguin?",
    correct:["Emperor penguin","Emperor"]
  },
  {
    q:"How many bones are normally in an adult human body?",
    correct:["206","Two hundred six","Two hundred and six"]
  },
  {
    q:"What is the largest moon in our solar system?",
    correct:["Ganymede"]
  },
  {
    q:"Which metal is liquid at typical room temperature?",
    correct:["Mercury"]
  },
  {
    q:"What is the name of the boundary around a black hole beyond which light cannot escape?",
    correct:["Event horizon","The event horizon"]
  },
  {
    q:"Which organ produces insulin in the human body?",
    correct:["Pancreas","The pancreas"]
  },
  {
    q:"What is the largest artery in the human body?",
    correct:["Aorta","The aorta"]
  },
  {
    q:"Which sea has no land coastline?",
    correct:["Sargasso Sea","The Sargasso Sea"]
  }
];


  

// Extra regular-round categories added in the clean rebuild.
questions.push(
  {cat:"🤯 Wait... What?",type:"trivia",q:"If you pass the person in second place in a race, what place are you in?",correct:["second","2nd","2"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"How many months have 28 days?",correct:["12","twelve","all 12","all of them","all"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"A farmer has 17 sheep and all but 9 run away. How many are left?",correct:["9","nine"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"What gets wetter the more it dries?",correct:["towel","a towel"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"What has hands and a face but cannot hold anything or smile?",correct:["clock","a clock"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"What has a neck but no head?",correct:["bottle","a bottle"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"What has many keys but cannot open a single lock?",correct:["piano","a piano","keyboard","a keyboard"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"What can travel around the world while staying in one corner?",correct:["stamp","a stamp","postage stamp"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"What has one eye but cannot see?",correct:["needle","a needle"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"What goes up but never comes down?",correct:["age","your age"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"Before Mount Everest was discovered, what was the highest mountain on Earth?",correct:["mount everest","everest"]},
  {cat:"🤯 Wait... What?",type:"trivia",q:"If there are three apples and you take away two, how many apples do you have?",correct:["2","two"]},

  {cat:"🧠 Big Brain Energy",type:"trivia",q:"What is the only even prime number?",correct:["2","two"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"What is the chemical symbol for gold?",correct:["au"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"Which planet has the most prominent ring system?",correct:["saturn"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"What is the largest ocean on Earth?",correct:["pacific","pacific ocean","the pacific ocean"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"What is the square root of 144?",correct:["12","twelve"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"What is the capital of Canada?",correct:["ottawa"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"Which language has the most native speakers worldwide?",correct:["mandarin","mandarin chinese","chinese"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"What is the process by which plants convert light energy into chemical energy?",correct:["photosynthesis"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"How many sides does a dodecagon have?",correct:["12","twelve"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"Which element has atomic number 1?",correct:["hydrogen"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"What is the largest planet in our solar system?",correct:["jupiter"]},
  {cat:"🧠 Big Brain Energy",type:"trivia",q:"What part of a cell contains most of its genetic material?",correct:["nucleus","the nucleus"]},

  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something adulthood makes you weirdly excited to buy.",answers:[["Home appliances",25,["appliance","appliances","vacuum","washer"]],["Furniture",21,["furniture","couch","chair"]],["Groceries on sale",18,["sale","groceries","deal","coupon"]],["Cleaning supplies",14,["cleaning supplies","cleaner"]],["Bedding",12,["bedding","sheets","blankets"]],["Storage containers",10,["storage","containers","bins"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something that hurts more as an adult than you expected.",answers:[["Bills",27,["bills","money"]],["Back or knees",23,["back","knees","joints","body"]],["Losing sleep",17,["sleep","no sleep","tired"]],["Grocery prices",14,["groceries","food prices"]],["Car repairs",11,["car","repairs"]],["Getting out of bed",8,["bed","getting up"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something you say you will do on your day off but probably won't.",answers:[["Clean",28,["clean","cleaning"]],["Laundry",22,["laundry"]],["Exercise",17,["exercise","gym","work out"]],["Run errands",14,["errands","shopping"]],["Cook",11,["cook","meal prep"]],["Wake up early",8,["wake up early","get up early"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something you check before deciding whether you can afford to go out.",answers:[["Bank account",34,["bank","bank account","balance"]],["Upcoming bills",23,["bills","payments"]],["Payday",16,["payday","pay check","paycheck"]],["Gas tank",11,["gas","gas tank"]],["Credit card",9,["credit card","card"]],["Calendar",7,["calendar","schedule"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something adults keep saying they need to make an appointment for.",answers:[["Doctor",27,["doctor","physical"]],["Dentist",24,["dentist","dental"]],["Eye doctor",16,["eye doctor","eye exam","optometrist"]],["Hair",13,["hair","haircut","salon"]],["Car service",11,["car","oil change","mechanic"]],["Therapy",9,["therapy","therapist"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something you clean only because somebody is coming over.",answers:[["Bathroom",28,["bathroom","toilet"]],["Living room",23,["living room"]],["Kitchen",19,["kitchen"]],["Floors",13,["floors","floor","vacuum"]],["Dishes",10,["dishes"]],["Bedroom",7,["bedroom"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something you buy and immediately wonder why it costs that much.",answers:[["Groceries",28,["groceries","food"]],["Gas",22,["gas"]],["Medicine",16,["medicine","medication"]],["Furniture",13,["furniture"]],["Concert tickets",12,["tickets","concert"]],["Fast food",9,["fast food","takeout"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something that can turn a quick errand into an hour-long mission.",answers:[["Walmart or big store",25,["walmart","store","shopping"]],["Traffic",22,["traffic"]],["Running into someone",18,["someone","friend","talking"]],["Kids",15,["kids","children"]],["Long line",12,["line","checkout"]],["Forgetting the list",8,["list","forgot"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something you own way too many of but keep buying.",answers:[["Clothes",25,["clothes","shirts"]],["Shoes",21,["shoes"]],["Cups or tumblers",18,["cups","tumblers","mugs"]],["Blankets",14,["blankets"]],["Phone chargers",12,["chargers","charger"]],["Candles",10,["candles","candle"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something that makes you feel instantly older.",answers:[["Body aches",26,["aches","pain","back","knees"]],["Kids growing up",21,["kids","children"]],["Music from your childhood called old",18,["music","old music"]],["Going to bed early",14,["bed early","sleep"]],["Gray hair",12,["gray hair","grey hair"]],["Talking about prices",9,["prices","money"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something you do before guests arrive that fools nobody.",answers:[["Shove clutter somewhere",29,["hide clutter","closet","shove stuff"]],["Light a candle",20,["candle","air freshener"]],["Quick vacuum",17,["vacuum"]],["Hide dirty dishes",14,["dishes","hide dishes"]],["Fix couch pillows",11,["pillows","couch"]],["Close bedroom doors",9,["close doors","bedroom door"]]]},
  {cat:"😂 Adulting Is a Scam",type:"feud",q:"Name something you refuse to throw away because you might need it someday.",answers:[["Cords or chargers",27,["cords","chargers","cables"]],["Boxes",22,["boxes","box"]],["Containers",17,["containers","tupperware"]],["Old clothes",14,["clothes"]],["Random screws or hardware",11,["screws","hardware","parts"]],["Bags",9,["bags","plastic bags"]]]},

  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something you would absolutely judge a date for doing.",answers:[["Being rude to staff",27,["rude","staff","server"]],["Bad hygiene",22,["hygiene","smell","dirty"]],["Talking about an ex",18,["ex"]],["Being glued to their phone",14,["phone"]],["Lying",11,["lying","lie"]],["Chewing loudly",8,["chewing","eat loud"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something people investigate online before a first date.",answers:[["Social media",30,["social media","facebook","instagram"]],["Relationship status",21,["relationship","single"]],["Photos",18,["photos","pictures"]],["Job",13,["job","work"]],["Mutual friends",10,["friends","mutual friends"]],["Criminal record",8,["criminal","record","court"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name a tiny thing that can make you irrationally annoyed.",answers:[["Loud chewing",24,["chewing","eating loud"]],["Slow walkers",21,["slow walkers","walking slow"]],["People blocking an aisle",17,["aisle","blocking"]],["Unread notifications",14,["notifications","notification"]],["Someone leaving cabinets open",13,["cabinet","cabinets"]],["Wet socks",11,["wet socks","socks"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something people do when they want attention without asking for it.",answers:[["Post on social media",27,["post","social media"]],["Act upset",21,["upset","sad","mad"]],["Send a vague text",18,["vague text","text"]],["Get extra quiet",14,["quiet","silent"]],["Sigh loudly",11,["sigh","sighing"]],["Start drama",9,["drama"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something you might pretend not to see so you don't have to deal with it.",answers:[["A mess",26,["mess","dirty"]],["A text",22,["text","message"]],["A bill",18,["bill","bills"]],["Someone you know in public",14,["person","someone","coworker"]],["Low gas light",11,["gas","gas light"]],["Laundry",9,["laundry"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something people secretly compare with their friends.",answers:[["Money",24,["money","salary","income"]],["Relationships",21,["relationship","partner"]],["Kids",17,["kids","children"]],["House",15,["house","home"]],["Career",13,["career","job","work"]],["Looks",10,["looks","appearance","body"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something that makes you immediately suspicious in a group chat.",answers:[["Someone says we need to talk",26,["need to talk","talk"]],["Everybody suddenly gets quiet",21,["quiet","silent"]],["A deleted message",18,["deleted message","delete"]],["Someone adds a new person",14,["new person","added"]],["A screenshot",12,["screenshot"]],["Too many question marks",9,["question marks","???"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something you might lie about just to avoid plans.",answers:[["Being sick",28,["sick","ill"]],["Being tired",21,["tired","sleepy"]],["Already having plans",18,["plans","busy"]],["Kids need something",13,["kids","children"]],["Car trouble",11,["car","car trouble"]],["Having to work",9,["work","working"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something people do after saying 'I'm not mad.'",answers:[["Get quiet",27,["quiet","silent"]],["Give attitude",23,["attitude"]],["Walk away",17,["walk away","leave"]],["Send a long text",13,["text","message"]],["Slam something",11,["slam","door"]],["Bring it up later",9,["later","bring it up"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something that can start an argument in under ten seconds.",answers:[["Money",23,["money"]],["An ex",20,["ex"]],["Who was supposed to do a chore",18,["chore","chores","cleaning"]],["A tone of voice",16,["tone","attitude"]],["Driving",13,["driving","drive"]],["Where to eat",10,["food","restaurant","eat"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something you would not want your phone to accidentally display on a big screen.",answers:[["Text messages",27,["texts","messages"]],["Photos",23,["photos","pictures"]],["Search history",19,["search history","history"]],["Bank balance",12,["bank","balance"]],["Dating app",10,["dating app","tinder"]],["Notes",9,["notes"]]]},
  {cat:"🚩 Unhinged & Honest",type:"feud",q:"Name something you might do after sending a risky text.",answers:[["Stare at the phone",27,["stare","phone"]],["Regret it",22,["regret","panic"]],["Put phone down",17,["put phone down","walk away"]],["Check read receipt",14,["read receipt","read"]],["Text a friend",11,["friend","text friend"]],["Delete or unsend it",9,["delete","unsend"]]]},

  {cat:"🕵️ Common Sense?",type:"trivia",q:"If a doctor gives you three pills and tells you to take one every 30 minutes, how long until all three have been taken?",correct:["1 hour","one hour","60 minutes","60"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"How many birthdays does the average person have?",correct:["1","one"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"A rooster lays an egg on top of a roof. Which side does the egg roll down?",correct:["neither","roosters dont lay eggs","roosters do not lay eggs","a rooster cant lay eggs"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"What word becomes shorter when you add two letters to it?",correct:["short","the word short"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"What belongs to you but other people use it more than you do?",correct:["name","your name"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"If an electric train is traveling north, which way does its smoke blow?",correct:["no smoke","it doesnt have smoke","electric trains dont make smoke","none"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"What can you catch but not throw?",correct:["cold","a cold"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"What has teeth but cannot bite?",correct:["comb","a comb"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"What kind of room has no doors or windows?",correct:["mushroom","a mushroom"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"What comes once in a minute, twice in a moment, but never in a thousand years?",correct:["m","the letter m","letter m"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"What has cities but no houses, forests but no trees, and water but no fish?",correct:["map","a map"]},
  {cat:"🕵️ Common Sense?",type:"trivia",q:"If you have one match and enter a dark room with a candle, a lamp, and a fireplace, what do you light first?",correct:["match","the match"]}
);

wildFacts.forEach(q=>{
  q.cat="🔥 Wild Facts Final Round";
  q.type="trivia";
});

const bank=questions;

const norm=s=>(s||"")
  .toLowerCase().trim()
  .replace(/[^a-z0-9\s']/g,"")
  .replace(/\s+/g," ");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const el=id=>$(id);
const hide=id=>el(id)?.classList.add("hidden");
const show=id=>el(id)?.classList.remove("hidden");

// Keep the Final Round wager card independent from the normal answer reveal.
if(el("wagerPanel") && el("hostCategories")?.parentElement){
  el("hostCategories").parentElement.appendChild(el("wagerPanel"));
}

function mult(r){ return r<=2?1:r<=4?2:3; }
function code(){ return String(Math.floor(1000+Math.random()*9000)); }
function getTimerSeconds(){ const n=Number(el("timerSelect")?.value||35); return [15,20,25,30,35].includes(n)?n:35; }
function getCategories(){ return [...new Set(bank.map(q=>q.cat))]; }
function usedKey(){ return "feud-used-all-games"; }
function loadUsed(){ try{state.used=new Set(JSON.parse(localStorage.getItem(usedKey())||"[]"));}catch{state.used=new Set();} }
function saveUsed(){ try{localStorage.setItem(usedKey(),JSON.stringify([...state.used]));}catch{} }
function clearUsed(){ loadUsed(); }
function pickUnused(category){
  let choices=[];
  bank.forEach((q,i)=>{ if(q.cat===category&&!state.used.has(i)) choices.push(i); });
  if(!choices.length){ bank.forEach((q,i)=>{ if(q.cat===category){state.used.delete(i);choices.push(i);} }); }
  const picked=choices[Math.floor(Math.random()*choices.length)];
  state.used.add(picked); saveUsed(); return picked;
}
function finalUsedKey(){ return "feud-used-wild-facts"; }
function pickWildFact(){
  let used=[]; try{used=JSON.parse(localStorage.getItem(finalUsedKey())||"[]");}catch{}
  let choices=wildFacts.map((_,i)=>i).filter(i=>!used.includes(i));
  if(!choices.length){used=[];choices=wildFacts.map((_,i)=>i);}
  const i=choices[Math.floor(Math.random()*choices.length)];
  used.push(i); try{localStorage.setItem(finalUsedKey(),JSON.stringify(used));}catch{} return i;
}
function playingPlayers(ps){ return (ps||[]).filter(p=>!p.is_host||p.host_plays); }
function chooserForRound(ps,round){
  const rotation=(ps||[]).slice(); // Host is intentionally included even in Host Only mode.
  if(!rotation.length) return null;
  return rotation[(Math.max(1,Number(round)||1)-1)%rotation.length];
}
function isMe(p){ return !!p&&!!state.player&&p.id===state.player.id; }

async function createGame(){
  if(C.SUPABASE_URL.includes("PASTE_")) return;
  const host=el("hostName")?.value.trim();
  const hostPlayMode=el("hostPlayMode")?.value||"host-only";
  if(!host){ if(el("homeMsg")) el("homeMsg").textContent="Enter your host name."; return; }
  const {data:g,error}=await sb.from("games").insert({room_code:code(),host_name:host,status:"lobby",round:1,final_round:false}).select().single();
  if(error){el("homeMsg").textContent=error.message;return;}
  const {data:p,error:pe}=await sb.from("players").insert({game_id:g.id,name:host,is_host:true,host_plays:hostPlayMode==="host-player",score:0,wager:0,wager_locked:false}).select().single();
  if(pe){el("homeMsg").textContent=pe.message;return;}
  state={...state,role:"host",game:g,player:p,lastQuestion:null,scoring:false,launchingFinal:false,launchingCategory:false};
  clearUsed(); enterLobby(); subscribe();
}
async function joinGame(){
  if(C.SUPABASE_URL.includes("PASTE_")) return;
  const name=el("joinName")?.value.trim(), room=el("joinCode")?.value.trim();
  if(!name||room.length!==4){el("homeMsg").textContent="Enter your name and 4-digit room code.";return;}
  const {data:g,error}=await sb.from("games").select("*").eq("room_code",room).neq("status","finished").maybeSingle();
  if(error||!g){el("homeMsg").textContent="Room not found.";return;}
  const {data:p,error:pe}=await sb.from("players").insert({game_id:g.id,name,is_host:false,host_plays:false,score:0,wager:0,wager_locked:false}).select().single();
  if(pe){el("homeMsg").textContent=pe.message;return;}
  state={...state,role:"player",game:g,player:p,lastQuestion:null,scoring:false,launchingFinal:false,launchingCategory:false};
  enterLobby(); subscribe();
}
function enterLobby(){ hide("home");hide("play");show("lobby"); el("roomCode").textContent=state.game.room_code; el("lobbyRole").textContent=state.role==="host"?"🎤 Host: "+state.player.name:"👤 "+state.player.name; el("startGame")?.classList.toggle("hidden",state.role!=="host"); el("hostSetup")?.classList.toggle("hidden",state.role!=="host"); el("lobbyWait")?.classList.toggle("hidden",state.role==="host"); refresh(); }
async function subscribe(){
  if(state.channel) await sb.removeChannel(state.channel);
  state.channel=sb.channel("game-"+state.game.id)
    .on("postgres_changes",{event:"*",schema:"public",table:"games",filter:"id=eq."+state.game.id},()=>refresh())
    .on("postgres_changes",{event:"*",schema:"public",table:"players",filter:"game_id=eq."+state.game.id},()=>refresh())
    .on("postgres_changes",{event:"*",schema:"public",table:"answers",filter:"game_id=eq."+state.game.id},()=>refresh())
    .subscribe(s=>{if(el("connectionStatus"))el("connectionStatus").textContent=s==="SUBSCRIBED"?"🟢 Connected":"Connecting…";});
}
async function refresh(){
  if(!state.game)return;
  const {data:g}=await sb.from("games").select("*").eq("id",state.game.id).single(); if(!g)return; state.game=g;
  if(g.status==="finished"){goHome();return;}
  const {data:ps}=await sb.from("players").select("*").eq("game_id",g.id).order("created_at");
  const me=(ps||[]).find(p=>p.id===state.player?.id); if(me)state.player=me;
  if(g.status==="lobby"){hide("play");show("lobby");renderLobby(ps||[]);return;}
  hide("lobby");show("play"); if(el("playRoom"))el("playRoom").textContent="Room "+g.room_code; if(el("playHost"))el("playHost").textContent="Hosted by "+g.host_name;
  if(el("roundNum"))el("roundNum").textContent=g.final_round?"FINAL":g.round;
  if(el("roundMult"))el("roundMult").textContent=g.final_round?"WAGER":mult(g.round)+"×";
  renderLeader(ps||[]);
  if(g.status==="queued_category"){
    showCategoryQueued(ps||[]);
    if(state.role==="host"&&!state.launchingCategory){state.launchingCategory=true;await hostLaunchCategory(Number(g.question_index));state.launchingCategory=false;}
    return;
  }
  if(g.status==="wagering"){showWagering(ps||[]);return;}
  if(g.status==="choosing"){showChoosing(ps||[]);return;}
  if(g.status==="answering"||g.status==="revealed") await showQuestion(ps||[]);
}
function renderLobby(ps){
  if(el("lobbyPlayers"))el("lobbyPlayers").innerHTML=ps.map(p=>'<div class="player"><span>'+(p.is_host?"🎤 ":"👤 ")+esc(p.name)+'</span><span>'+(p.is_host?"Host":"Ready")+'</span></div>').join("");
  if(el("startGame"))el("startGame").disabled=playingPlayers(ps).length<2;
  el("hostSetup")?.classList.toggle("hidden",state.role!=="host");
}
function renderLeader(ps){
  const a=playingPlayers(ps).sort((x,y)=>(y.score||0)-(x.score||0));
  if(el("leaderboard"))el("leaderboard").innerHTML=a.map((p,i)=>'<div class="leader"><span>'+(i===0?"🥇 ":i===1?"🥈 ":i===2?"🥉 ":"")+esc(p.name)+'</span><strong>'+(p.score||0)+'</strong></div>').join("");
}
function showChoosing(ps){
  clearInterval(state.timer); hide("questionPanel");hide("wagerPanel");hide("revealPanel");hide("hostControls");
  const chooser=chooserForRound(ps,state.game.round); const canChoose=isMe(chooser)||state.role==="host";
  if(canChoose){
    show("hostCategories");hide("waitingQuestion");
    const cats=getCategories();
    const note=state.role==="host"&&!isMe(chooser)?'<p class="muted">🎯 '+esc(chooser?.name||"Player")+'\'s pick — Host Override is available.</p>':'<p class="muted">🎯 '+esc(chooser?.name||"You")+'\'s pick!</p>';
    if(el("categoryGrid"))el("categoryGrid").innerHTML=note+cats.map((cat,i)=>'<button class="cat" data-cat="'+i+'">'+esc(cat)+'</button>').join("");
    document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>selectCategory(Number(b.dataset.cat),ps));
  }else{
    hide("hostCategories");show("waitingQuestion");
    const box=el("waitingQuestion"); if(box){const h=box.querySelector("h2");const p=box.querySelector("p");if(h)h.textContent="🎯 "+(chooser?.name||"Another player")+" is choosing!";if(p)p.textContent="The category and question will appear as soon as they pick.";}
  }
}
function showCategoryQueued(ps){
  clearInterval(state.timer);hide("questionPanel");hide("hostCategories");hide("wagerPanel");show("waitingQuestion");
  const chooser=chooserForRound(ps,state.game.round);const box=el("waitingQuestion");if(box){const h=box.querySelector("h2");const p=box.querySelector("p");if(h)h.textContent="🎯 "+(chooser?.name||"Player")+" picked!";if(p)p.textContent="Loading the question…";}
}
async function selectCategory(catIndex,ps){
  const chooser=chooserForRound(ps,state.game.round); if(!isMe(chooser)&&state.role!=="host")return;
  document.querySelectorAll("[data-cat]").forEach(b=>b.disabled=true);
  if(state.role==="host"){await hostLaunchCategory(catIndex);return;}
  const {error}=await sb.from("games").update({status:"queued_category",question_index:catIndex,deadline:null,final_round:false}).eq("id",state.game.id).eq("status","choosing");
  if(error)alert("Could not choose category: "+error.message);
}
async function hostLaunchCategory(catIndex){
  if(state.role!=="host")return;
  const cats=getCategories(),category=cats[catIndex]; if(!category)return;
  const i=pickUnused(category),seconds=getTimerSeconds(),deadline=new Date(Date.now()+seconds*1000).toISOString();
  await sb.from("answers").delete().eq("game_id",state.game.id).eq("round",state.game.round);
  const {error}=await sb.from("games").update({status:"answering",question_index:i,deadline,final_round:false}).eq("id",state.game.id);
  if(error)alert("Could not start question: "+error.message);
}
function showWagering(ps){
  clearInterval(state.timer);hide("questionPanel");hide("waitingQuestion");hide("hostCategories");hide("hostControls");hide("revealPanel");show("wagerPanel");
  const players=playingPlayers(ps),me=players.find(p=>p.id===state.player?.id);
  if(me){show("wagerPlayer");if(el("wagerScore"))el("wagerScore").textContent=me.score||0;if(el("wagerInput")){el("wagerInput").max=me.score||0;el("wagerInput").disabled=!!me.wager_locked;if(me.wager_locked)el("wagerInput").value=me.wager||0;}if(el("lockWager"))el("lockWager").disabled=!!me.wager_locked;if(el("wagerMsg"))el("wagerMsg").textContent=me.wager_locked?"🔒 Wager locked!":"";}else hide("wagerPlayer");
  if(state.role==="host"){show("wagerHost");const locked=players.filter(p=>p.wager_locked).length;if(el("wagerCount"))el("wagerCount").textContent=locked+" of "+players.length;if(players.length&&locked===players.length&&!state.launchingFinal){state.launchingFinal=true;launchWildFactsQuestion().finally(()=>state.launchingFinal=false);}}else hide("wagerHost");
}
async function lockWager(){
  const me=state.player;if(!me||state.game.status!=="wagering")return;const raw=el("wagerInput")?.value.trim();if(raw===""){el("wagerMsg").textContent="Enter a wager first.";return;}const wager=Math.floor(Number(raw)),score=Math.max(0,Number(me.score)||0);if(!Number.isFinite(wager)||wager<0){el("wagerMsg").textContent="Wager must be 0 or more.";return;}if(wager>score){el("wagerMsg").textContent="You can't wager more than your "+score+" points.";return;}
  el("lockWager").disabled=true;el("wagerInput").disabled=true;el("wagerMsg").textContent="🔒 Locking wager...";
  const {error}=await sb.from("players").update({wager,wager_locked:true}).eq("id",me.id);if(error){el("lockWager").disabled=false;el("wagerInput").disabled=false;el("wagerMsg").textContent="Could not lock wager: "+error.message;return;}el("wagerMsg").textContent="🔒 Wager locked!";await refresh();
}
async function launchWildFactsQuestion(){
  if(state.role!=="host"||state.game.status!=="wagering")return;const i=pickWildFact(),seconds=getTimerSeconds(),deadline=new Date(Date.now()+seconds*1000).toISOString();
  await sb.from("answers").delete().eq("game_id",state.game.id).eq("round",state.game.round);
  const {error}=await sb.from("games").update({status:"answering",question_index:i,deadline,final_round:true}).eq("id",state.game.id).eq("status","wagering");if(error)alert("Could not start Wild Facts question: "+error.message);
}
async function showQuestion(ps){
  const g=state.game,q=g.final_round?wildFacts[g.question_index]:bank[g.question_index];if(!q)return;
  hide("hostCategories");hide("waitingQuestion");hide("wagerPanel");show("questionPanel");
  const key=(g.final_round?"F-":"R-")+g.round+"-"+g.question_index;if(state.lastQuestion!==key){if(el("answerInput"))el("answerInput").value="";if(el("answerMsg"))el("answerMsg").textContent="";state.lastQuestion=key;}
  el("questionCategory").textContent=q.cat;el("questionType").textContent=g.final_round?"WILD FACT":q.type==="feud"?"SURVEY SAYS":"TRIVIA";el("questionText").textContent=q.q;
  const {data:ans}=await sb.from("answers").select("*").eq("game_id",g.id).eq("round",g.round);
  if(g.status==="answering"){
    hide("revealPanel");hide("hostControls");show("countdownWrap");
    const hostOnly=state.role==="host"&&!state.player.host_plays;
    if(hostOnly){show("hostLive");hide("answerEntry");}else{el("hostLive")?.classList.toggle("hidden",state.role!=="host");const mine=(ans||[]).find(a=>a.player_id===state.player.id);show("answerEntry");el("answerInput").disabled=!!mine;el("lockAnswer").disabled=!!mine;el("answerMsg").textContent=mine?"🔒 Answer locked. Waiting for time…":"";}
    if(state.role==="host"&&el("submittedCount"))el("submittedCount").textContent=(ans||[]).length+" of "+playingPlayers(ps).length;
    runTimer(g.deadline);
  }else{
    clearInterval(state.timer);hide("countdownWrap");hide("answerEntry");hide("hostLive");await renderReveal(ps,ans||[],q);
  }
}
function runTimer(deadline){
  clearInterval(state.timer);const tick=async()=>{const left=Math.max(0,Math.ceil((new Date(deadline)-Date.now())/1000));if(el("timer"))el("timer").textContent=left;if(left<=0){clearInterval(state.timer);if(state.role==="host")await scoreAndReveal();}};tick();state.timer=setInterval(tick,250);
}
async function submitAnswer(){
  if(state.role==="host"&&!state.player.host_plays)return;if(state.game.status!=="answering")return;const txt=el("answerInput")?.value.trim();if(!txt)return;el("lockAnswer").disabled=true;
  const {error}=await sb.from("answers").insert({game_id:state.game.id,round:state.game.round,player_id:state.player.id,answer_text:txt});if(error){el("answerMsg").textContent=error.message;el("lockAnswer").disabled=false;return;}el("answerInput").disabled=true;el("answerMsg").textContent="🔒 Answer locked. Nobody can see it yet.";
}
function editDistance(a,b){const m=a.length,n=b.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(0));for(let i=0;i<=m;i++)dp[i][0]=i;for(let j=0;j<=n;j++)dp[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);return dp[m][n];}
function wordVariants(s){s=norm(s);const set=new Set([s]);if(s.endsWith("s")&&s.length>3)set.add(s.slice(0,-1));if(s.endsWith("es")&&s.length>4)set.add(s.slice(0,-2));if(s.endsWith("ing")&&s.length>5){const b=s.slice(0,-3);set.add(b);set.add(b+"e");}if(s.endsWith("ed")&&s.length>4){const b=s.slice(0,-2);set.add(b);set.add(b+"e");}return [...set];}
function closeEnough(a,b){a=norm(a);b=norm(b);if(!a||!b)return false;if(a===b)return true;if(a.length>=4&&b.length>=4&&(a.includes(b)||b.includes(a)))return true;const av=wordVariants(a),bv=wordVariants(b);if(av.some(x=>bv.includes(x)))return true;const longest=Math.max(a.length,b.length),allowed=longest>=8?2:longest>=5?1:0;return editDistance(a,b)<=allowed;}
function matchAnswer(text,q){const n=norm(text);if(q.type==="trivia"||q.correct)return q.correct.some(x=>closeEnough(n,x))?25:0;let best=0;for(const row of q.answers)for(const alias of row[2])if(closeEnough(n,alias))best=Math.max(best,row[1]);return best;}
async function scoreAndReveal(){
  if(state.role!=="host"||state.scoring||state.game.status!=="answering")return;state.scoring=true;
  try{
    const g=state.game,q=g.final_round?wildFacts[g.question_index]:bank[g.question_index];
    const {data:ans}=await sb.from("answers").select("*").eq("game_id",g.id).eq("round",g.round);
    for(const a of (ans||[])){if(a.scored)continue;const base=matchAnswer(a.answer_text,q);let pts;if(g.final_round){const {data:p}=await sb.from("players").select("wager").eq("id",a.player_id).single();const wager=Number(p?.wager)||0;pts=base>0?wager:-wager;}else pts=base*mult(g.round);await sb.from("answers").update({matched_points:pts,scored:true}).eq("id",a.id);}
    if(g.final_round){
      const {data:fps}=await sb.from("players").select("*").eq("game_id",g.id);const answered=new Set((ans||[]).map(a=>a.player_id));
      for(const p of playingPlayers(fps||[])){if(answered.has(p.id))continue;await sb.from("answers").insert({game_id:g.id,round:g.round,player_id:p.id,answer_text:"(no answer)",matched_points:-(Number(p.wager)||0),scored:true});}
    }
    const {data:all}=await sb.from("answers").select("player_id,matched_points,scored").eq("game_id",g.id).eq("scored",true);const totals={};for(const a of (all||[]))totals[a.player_id]=(totals[a.player_id]||0)+Number(a.matched_points||0);
    const {data:players}=await sb.from("players").select("*").eq("game_id",g.id);for(const p of (players||[])){if(p.is_host&&!p.host_plays)continue;await sb.from("players").update({score:Math.max(0,totals[p.id]||0)}).eq("id",p.id);}
    await sb.from("games").update({status:"revealed"}).eq("id",g.id).eq("status","answering");await refresh();
  }finally{state.scoring=false;}
}
async function renderReveal(ps,ans,q){
  show("revealPanel");hide("wagerPanel");const names=Object.fromEntries(ps.map(p=>[p.id,p.name]));
  if(el("revealedAnswers"))el("revealedAnswers").innerHTML=ans.length?ans.map(a=>'<div class="reveal-row '+(a.matched_points>0?"correct":"wrong")+'"><span><strong>'+esc(names[a.player_id]||"Player")+'</strong> — '+esc(a.answer_text)+'</span><strong>'+(a.matched_points>0?"+"+a.matched_points:a.matched_points<0?String(a.matched_points):"0")+'</strong></div>').join(""):'<p class="muted">No answers were submitted.</p>';
  if(q.type==="feud")el("feudBoard").innerHTML='<div class="board"><h3>Survey Board</h3>'+q.answers.map((x,i)=>'<div class="board-row"><span>'+(i+1)+'. '+esc(x[0])+'</span><strong>'+x[1]+'</strong></div>').join("")+'</div>';
  else el("feudBoard").innerHTML='<div class="board"><h3>Correct Answer</h3><div class="board-row"><span>'+esc(q.correct[0])+'</span><strong>'+(state.game.final_round?"Wager result":"25 base points")+'</strong></div></div>';
  el("hostControls")?.classList.toggle("hidden",state.role!=="host");if(state.role==="host"){el("nextRound")?.classList.toggle("hidden",!!state.game.final_round);el("finalRound")?.classList.toggle("hidden",!!state.game.final_round);}
}
async function nextRound(){
  if(state.role!=="host"||state.game.final_round)return;state.lastQuestion=null;const {error}=await sb.from("games").update({round:state.game.round+1,status:"choosing",question_index:null,deadline:null,final_round:false}).eq("id",state.game.id);if(error)alert("Could not start next round: "+error.message);else await refresh();
}
async function startFinalRound(){
  if(state.role!=="host")return;if(!confirm("Start the Wild Facts Final Round? Everyone will choose a wager before seeing the question."))return;clearInterval(state.timer);
  await sb.from("players").update({wager:0,wager_locked:false}).eq("game_id",state.game.id);
  state.lastQuestion=null;const {error}=await sb.from("games").update({round:state.game.round+1,status:"wagering",question_index:null,deadline:null,final_round:true}).eq("id",state.game.id);if(error)alert("Could not start Final Round: "+error.message);else await refresh();
}
async function newGame(){
  if(state.role!=="host")return;if(!confirm("Start a new game with the same players? Scores will reset to 0."))return;clearInterval(state.timer);await sb.from("answers").delete().eq("game_id",state.game.id);await sb.from("players").update({score:0,wager:0,wager_locked:false}).eq("game_id",state.game.id);clearUsed();state.lastQuestion=null;state.launchingFinal=false;state.launchingCategory=false;
  const {error}=await sb.from("games").update({round:1,status:"lobby",question_index:null,deadline:null,final_round:false}).eq("id",state.game.id);if(error)alert("Could not reset game: "+error.message);else await refresh();
}
async function endGame(){if(state.role!=="host")return;if(!confirm("End this game and send everyone back to the home screen?"))return;clearInterval(state.timer);const {error}=await sb.from("games").update({status:"finished"}).eq("id",state.game.id);if(error)alert("Could not end game: "+error.message);else goHome();}
async function goHome(){clearInterval(state.timer);if(state.channel){try{await sb.removeChannel(state.channel);}catch{}}state={role:null,game:null,player:null,channel:null,timer:null,scoring:false,used:new Set(),lastQuestion:null,launchingFinal:false,launchingCategory:false};hide("lobby");hide("play");show("home");if(el("homeMsg"))el("homeMsg").textContent="";if(el("joinCode"))el("joinCode").value="";}

el("createGame").onclick=createGame;
el("joinGame").onclick=joinGame;
el("startGame").onclick=async()=>{if(state.role!=="host")return;loadUsed();const {error}=await sb.from("games").update({status:"choosing",round:1,question_index:null,deadline:null,final_round:false}).eq("id",state.game.id);if(error)alert("Could not start game: "+error.message);else await refresh();};
el("lockAnswer").onclick=submitAnswer;
el("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")submitAnswer();});
if(el("showAnswersNow"))el("showAnswersNow").onclick=scoreAndReveal;
if(el("nextRound"))el("nextRound").onclick=nextRound;
if(el("newGame"))el("newGame").onclick=newGame;
if(el("endGame"))el("endGame").onclick=endGame;
if(el("finalRound"))el("finalRound").onclick=startFinalRound;
if(el("lockWager"))el("lockWager").onclick=lockWager;
})();
