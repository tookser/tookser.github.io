/* Dofamine Menu — app logic */

var STORAGE_KEY = "dofamine_menu_data";

var DEFAULT_DATA = {
  history: [],
  blacklist: []
};

var ACTIVITIES = {
  low_short: [
    { id: "ls1", name: "Watch a cat compilation", desc: "YouTube, 10 min of purring chaos" },
    { id: "ls2", name: "Scroll r/oddlysatisfying", desc: "Pressure washing & perfect fits" },
    { id: "ls3", name: "Listen to one banger song", desc: "Full volume, eyes closed" },
    { id: "ls4", name: "Do a guided breathing exercise", desc: "Box breathing, 5 minutes" },
    { id: "ls5", name: "Look at clouds or out the window", desc: "Name the shapes, no rules" },
    { id: "ls6", name: "Sniff something nice", desc: "Coffee, candle, fresh laundry" },
    { id: "ls7", name: "Watch a nature live cam", desc: "Eagles, aquariums, watering holes" },
    { id: "ls8", name: "Pet any nearby animal", desc: "Certified serotonin procedure" },
    { id: "ls9", name: "Look through old photos", desc: "Digital or paper, both work" },
    { id: "ls10", name: "Watch a slime or kinetic sand video", desc: "Brain goes quiet, oddly" },
    { id: "ls11", name: "Do a 5-minute stretch in bed", desc: "Cat-style, zero dignity required" },
    { id: "ls12", name: "Make a tiny wish on the ceiling", desc: "Free, fast, weirdly effective" }
  ],
  low_medium: [
    { id: "lm1", name: "Rewatch comfort show episode", desc: "The one you've seen 47 times" },
    { id: "lm2", name: "Listen to a podcast in bed", desc: "Bonus points for cozy blanket" },
    { id: "lm3", name: "Take a long shower or bath", desc: "Existential thoughts included free" },
    { id: "lm4", name: "Browse Pinterest aimlessly", desc: "Cottagecore? Dark academia? Both" },
    { id: "lm5", name: "ASMR deep dive", desc: "Find your trigger" },
    { id: "lm6", name: "Read fanfiction", desc: "No judgment zone" },
    { id: "lm7", name: "Do a coloring book page", desc: "Stay inside the lines, or don't" },
    { id: "lm8", name: "Do a full skincare pamper session", desc: "Sheet mask, cucumber water, robe" },
    { id: "lm9", name: "Watch a stand-up comedy special", desc: "Laughing horizontally counts" },
    { id: "lm10", name: "Read a few chapters of a novel", desc: "The cozy kind, not the homework kind" },
    { id: "lm11", name: "Take a solo coffee-shop sit", desc: "People-watch like it's a sport" },
    { id: "lm12", name: "Follow along with a Bob Ross episode", desc: "Happy little accidents only" }
  ],
  low_long: [
    { id: "ll1", name: "Movie marathon from bed", desc: "Pick a trilogy, don't move" },
    { id: "ll2", name: "Fall into a Wikipedia rabbit hole", desc: "Start with 'platypus', end at 'Byzantine economy'" },
    { id: "ll3", name: "Audiobook + staring at ceiling", desc: "Productive laziness" },
    { id: "ll4", name: "Binge a new show", desc: "Just one season, you say" },
    { id: "ll5", name: "Lay on the floor and listen to full albums", desc: "The floor understands you" },
    { id: "ll6", name: "Have a self-care spa day at home", desc: "Bath, mask, nap, repeat" },
    { id: "ll7", name: "Do a giant jigsaw puzzle", desc: "1000 pieces of pure calm" },
    { id: "ll8", name: "Watch an entire documentary series", desc: "Nature, true crime, ancient Rome" },
    { id: "ll9", name: "Read a whole book in one sitting", desc: "Snacks within arm's reach" },
    { id: "ll10", name: "Binge a comfort YouTube channel", desc: "Baking, restoring, abandoned mansions" },
    { id: "ll11", name: "Take a rainy-day road trip from the couch", desc: "Train window videos + cocoa" },
    { id: "ll12", name: "Organize your photo library", desc: "Trip down memory lane included" }
  ],
  medium_short: [
    { id: "ms1", name: "Doodle something weird", desc: "No talent required" },
    { id: "ms2", name: "Do a quick skincare routine", desc: "Hydrate that face" },
    { id: "ms3", name: "Tidy one small surface", desc: "Just the desk. Just the desk." },
    { id: "ms4", name: "Play one round of a phone game", desc: "Slay the Spire, Wordle, whatever" },
    { id: "ms5", name: "Make fancy tea or coffee", desc: "Full ceremony mode" },
    { id: "ms6", name: "Text a friend something unhinged", desc: "Send a meme from 2012" },
    { id: "ms7", name: "Water the plants", desc: "Talk to them, they like it" },
    { id: "ms8", name: "Step outside for fresh air", desc: "Two minutes counts as nature" },
    { id: "ms9", name: "Do a mini journaling sprint", desc: "Brain dump, then close the notebook" },
    { id: "ms10", name: "Learn 5 words in a new language", desc: "Duolingo owl will be thrilled" },
    { id: "ms11", name: "Make the perfect snack plate", desc: "Fancy arrangement elevates everything" },
    { id: "ms12", name: "Stretch and crack everything", desc: "Human pretzel maintenance" }
  ],
  medium_medium: [
    { id: "mm1", name: "Cook something simple but tasty", desc: "Pasta aglio e olio era" },
    { id: "mm2", name: "Go for a walk with music", desc: "Main character energy" },
    { id: "mm3", name: "Play a cozy video game", desc: "Stardew, Animal Crossing, Minecraft" },
    { id: "mm4", name: "Do a jigsaw puzzle", desc: "Edges first, obviously" },
    { id: "mm5", name: "Watch video essays on YouTube", desc: "Why is this 2-hour video about fonts?" },
    { id: "mm6", name: "Reorganize a drawer or shelf", desc: "Before/after dopamine" },
    { id: "mm7", name: "Bake cookies from a store mix", desc: "Semi-homemade still counts" },
    { id: "mm8", name: "Call a friend or family member", desc: "Actual voice call, wild concept" },
    { id: "mm9", name: "Do a home workout video", desc: "Yoga, pilates, or dance cardio" },
    { id: "mm10", name: "Wander a bookstore or library", desc: "Smell the books, judge the covers" },
    { id: "mm11", name: "Give yourself a manicure", desc: "Nails as a productivity metaphor" },
    { id: "mm12", name: "Explore a new playlist genre", desc: "Doom jazz? Hyperpop? Cowpunk?" }
  ],
  medium_long: [
    { id: "ml1", name: "Start a craft project", desc: "Knitting, origami, friendship bracelets" },
    { id: "ml2", name: "Play a story-driven video game", desc: "Get emotionally wrecked" },
    { id: "ml3", name: "Bake something from scratch", desc: "Banana bread is always the answer" },
    { id: "ml4", name: "Deep-clean one room", desc: "Put on a podcast, go feral" },
    { id: "ml5", name: "Write in a journal or blog", desc: "Unload the brain" },
    { id: "ml6", name: "Build something in Lego or Minecraft", desc: "Architecture without consequences" },
    { id: "ml7", name: "Go thrifting or antiquing", desc: "Someone's trash, your treasure" },
    { id: "ml8", name: "Take a long nature walk or easy hike", desc: "Touch grass, literally" },
    { id: "ml9", name: "Have a solo movie night at the cinema", desc: "No negotiations over snacks" },
    { id: "ml10", name: "Redecorate or rearrange one space", desc: "Feng shui by vibes alone" },
    { id: "ml11", name: "Meal prep for the week", desc: "Future you is already grateful" },
    { id: "ml12", name: "Start that DIY project on your list", desc: "The one saved 3 years ago" }
  ],
  high_short: [
    { id: "hs1", name: "Dance to 3 songs", desc: "Lock the door, go wild" },
    { id: "hs2", name: "Do a quick workout", desc: "10 min YouTube HIIT" },
    { id: "hs3", name: "Speed-organize something", desc: "Race the clock, beat the chaos" },
    { id: "hs4", name: "Take a cold shower", desc: "Reset the entire nervous system" },
    { id: "hs5", name: "Learn a card trick or pen spin", desc: "Fidget with purpose" },
    { id: "hs6", name: "Run up and down the stairs", desc: "Simple, brutal, effective" },
    { id: "hs7", name: "Do 50 jumping jacks right now", desc: "No prep, just chaos" },
    { id: "hs8", name: "Sprint around the block", desc: "Look slightly unhinged, feel amazing" },
    { id: "hs9", name: "Beatbox in the shower", desc: "Drop the hottest a cappella" },
    { id: "hs10", name: "Do a 1-minute wall sit challenge", desc: "Legs trembling, mind clear" },
    { id: "hs11", name: "Shadowbox an invisible rival", desc: "You always win this fight" },
    { id: "hs12", name: "Blast a song and scream-sing it", desc: "Gutteral catharsis, zero notes" }
  ],
  high_medium: [
    { id: "hm1", name: "Go for a run or bike ride", desc: "Outrun your thoughts" },
    { id: "hm2", name: "Rearrange your furniture", desc: "New room, who dis" },
    { id: "hm3", name: "Cook an ambitious recipe", desc: "Gordon Ramsay would be proud. Maybe." },
    { id: "hm4", name: "Learn a TikTok dance", desc: "Post it or don't, no pressure" },
    { id: "hm5", name: "Do a full workout", desc: "Chest day? Leg day? Cry day?" },
    { id: "hm6", name: "Impulsively wash your car / clean the bike", desc: "Therapeutic scrubbing" },
    { id: "hm7", name: "Go swimming", desc: "Lane rage is real cardio" },
    { id: "hm8", name: "Hit a climbing gym", desc: "Terrified and powerful at once" },
    { id: "hm9", name: "Do a photoshoot of yourself or your pet", desc: "Lighting, angles, Vogue" },
    { id: "hm10", name: "Karaoke at home or in a booth", desc: "Emotional damage via high notes" },
    { id: "hm11", name: "Deep-clean the entire kitchen", desc: "Gleaming surfaces, gleaming soul" },
    { id: "hm12", name: "Follow an advanced dance tutorial", desc: "Body goes places brain didn't allow" }
  ],
  high_long: [
    { id: "hl1", name: "Go on a spontaneous adventure", desc: "Drive/bus somewhere new" },
    { id: "hl2", name: "Deep-dive into a new hobby", desc: "Buy supplies, watch 12 tutorials" },
    { id: "hl3", name: "Host an impromptu hangout", desc: "Text everyone, see who bites" },
    { id: "hl4", name: "Do a full home declutter", desc: "Marie Kondo possessed mode" },
    { id: "hl5", name: "Build or fix something physical", desc: "Shelf, bike, that wobbly chair" },
    { id: "hl6", name: "Take a day trip somewhere", desc: "Museum, nature, weird roadside attraction" },
    { id: "hl7", name: "Go on a long hike", desc: "Summit says hi" },
    { id: "hl8", name: "Try axe throwing or an escape room", desc: "Unleash with permission" },
    { id: "hl9", name: "Cook a full multi-course dinner", desc: "Candles, plating, everything" },
    { id: "hl10", name: "Do a full garage/wardrobe overhaul", desc: "Donate pile taller than you" },
    { id: "hl11", name: "Explore a new city district", desc: "Tourist in your own town" },
    { id: "hl12", name: "Start a garden or big plant project", desc: "Get your hands seriously dirty" }
  ]
};

/* Flat id -> activity map for settings rendering */
var ACTIVITY_INDEX = {};
(function buildIndex() {
  for (var key in ACTIVITIES) {
    ACTIVITIES[key].forEach(function (a) {
      ACTIVITY_INDEX[a.id] = a;
    });
  }
})();

/* Runtime state */
var data = { history: [], blacklist: [] };
var storageAvailable = true;
var currentEnergy = null;
var currentTime = null;
var shown = [];
var currentActivity = null;
var previousScreenId = "screen-welcome";

/* ---------- storage ---------- */

function checkStorage() {
  try {
    var k = "__dofamine_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    storageAvailable = true;
  } catch (e) {
    storageAvailable = false;
  }
}

function loadData() {
  if (!storageAvailable) {
    data = { history: [], blacklist: [] };
    return;
  }
  var raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      var parsed = JSON.parse(raw);
      data = {
        history: Array.isArray(parsed.history) ? parsed.history : [],
        blacklist: Array.isArray(parsed.blacklist) ? parsed.blacklist : []
      };
      return;
    } catch (e) {
      /* fallthrough to default */
    }
  }
  data = { history: [], blacklist: [] };
}

function saveData() {
  if (!storageAvailable) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    storageAvailable = false;
  }
}

/* ---------- screens ---------- */

function activateScreen(next) {
  next.classList.add("screen--active");
  /* force reflow so the opacity transition plays from 0 to 1 */
  void next.offsetWidth;
  if (next.id === "screen-settings") {
    renderHistory();
    renderBlacklist();
  }
}

function showScreen(screenId) {
  var current = document.querySelector(".screen--active");
  var next = document.getElementById(screenId);
  if (!next || next === current) return;

  if (current) {
    current.classList.remove("screen--active");
    current.classList.add("screen--leaving");
    setTimeout(function () {
      current.classList.remove("screen--leaving");
      activateScreen(next);
    }, 400);
  } else {
    activateScreen(next);
  }
}

function rememberPreviousScreen() {
  var active = document.querySelector(".screen--active");
  if (active && active.id !== "screen-settings") {
    previousScreenId = active.id;
  }
}

/* ---------- selection flow ---------- */

function selectEnergy(value) {
  currentEnergy = value;
  showScreen("screen-time");
}

function selectTime(value) {
  currentTime = value;
  shown = [];
  generateResult(currentEnergy, currentTime);
  showScreen("screen-result");
}

function availableActivities() {
  var key = currentEnergy + "_" + currentTime;
  var list = ACTIVITIES[key] || [];
  return list.filter(function (a) {
    return data.blacklist.indexOf(a.id) === -1;
  });
}

function generateResult(energy, time) {
  currentEnergy = energy;
  currentTime = time;
  var pool = availableActivities().filter(function (a) {
    return shown.indexOf(a.id) === -1;
  });
  if (pool.length === 0) {
    /* everything either blacklisted or shown: reset shown */
    pool = availableActivities();
    shown = [];
  }
  if (pool.length === 0) {
    currentActivity = null;
    renderResult();
    return;
  }
  var pick = pool[Math.floor(Math.random() * pool.length)];
  shown.push(pick.id);
  currentActivity = pick;
  renderResult();
}

function renderResult() {
  var card = document.getElementById("result-card");
  var empty = document.getElementById("result-empty");
  if (currentActivity) {
    card.hidden = false;
    empty.hidden = true;
    document.getElementById("result-name").textContent = currentActivity.name;
    document.getElementById("result-desc").textContent = currentActivity.desc || "";
  } else {
    card.hidden = true;
    empty.hidden = false;
  }
}

function reroll() {
  var card = document.getElementById("result-card");
  var pool = availableActivities().filter(function (a) {
    return shown.indexOf(a.id) === -1;
  });
  if (pool.length === 0) {
    shown = [];
    pool = availableActivities();
    /* avoid repeating the last shown one when there are alternatives */
    if (pool.length > 1 && currentActivity) {
      pool = pool.filter(function (a) {
        return a.id !== currentActivity.id;
      });
    }
  } else if (currentActivity) {
    pool = pool.filter(function (a) {
      return a.id !== currentActivity.id;
    });
    if (pool.length === 0) pool = availableActivities().filter(function (a) {
      return a.id !== currentActivity.id;
    });
  }
  if (pool.length === 0) {
    renderResult();
    return;
  }
  var pick = pool[Math.floor(Math.random() * pool.length)];
  shown.push(pick.id);

  card.classList.remove("result-card--flip");
  void card.offsetWidth; /* restart animation */
  card.classList.add("result-card--flip");
  setTimeout(function () {
    currentActivity = pick;
    document.getElementById("result-name").textContent = pick.name;
    document.getElementById("result-desc").textContent = pick.desc || "";
  }, 250);
}

function accept() {
  if (currentActivity) {
    data.history.unshift({
      id: currentActivity.id,
      name: currentActivity.name,
      date: new Date().toISOString()
    });
    if (data.history.length > 20) {
      data.history.length = 20;
    }
    saveData();
  }
  playConfetti();
  setTimeout(function () {
    showScreen("screen-welcome");
  }, 800);
}

/* ---------- confetti ---------- */

function playConfetti() {
  var container = document.getElementById("confetti");
  container.innerHTML = "";
  container.hidden = false;
  for (var i = 0; i < 24; i++) {
    var p = document.createElement("div");
    p.className = "confetti__particle";
    var angle = Math.random() * Math.PI * 2;
    var dist = 80 + Math.random() * 160;
    p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    p.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    p.style.animationDelay = Math.random() * 0.15 + "s";
    p.style.background = i % 3 === 0 ? "#D4A59A" : "#C9A84C";
    container.appendChild(p);
  }
  setTimeout(function () {
    container.hidden = true;
    container.innerHTML = "";
  }, 1100);
}

/* ---------- settings ---------- */

function formatDate(iso) {
  var d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() +
    " " + d.getHours().toString().padStart(2, "0") + ":" +
    d.getMinutes().toString().padStart(2, "0");
}

function renderHistory() {
  var list = document.getElementById("history-list");
  list.innerHTML = "";
  if (data.history.length === 0) {
    var li = document.createElement("li");
    li.className = "settings__empty";
    li.textContent = "No adventures yet. Go pick one!";
    list.appendChild(li);
    return;
  }
  data.history.forEach(function (entry) {
    var li = document.createElement("li");
    var name = document.createElement("span");
    name.textContent = entry.name;
    var date = document.createElement("span");
    date.className = "history-list__date";
    date.textContent = formatDate(entry.date);
    li.appendChild(name);
    li.appendChild(date);
    list.appendChild(li);
  });
}

function renderBlacklist() {
  var list = document.getElementById("blacklist-list");
  list.innerHTML = "";
  if (data.blacklist.length === 0) {
    var li = document.createElement("li");
    li.className = "settings__empty";
    li.textContent = "Nothing is blacklisted.";
    list.appendChild(li);
    return;
  }
  data.blacklist.forEach(function (id) {
    var activity = ACTIVITY_INDEX[id];
    var li = document.createElement("li");
    var name = document.createElement("span");
    name.textContent = activity ? activity.name : id;
    var btn = document.createElement("button");
    btn.className = "blacklist-toggle";
    btn.type = "button";
    btn.textContent = "Restore";
    btn.addEventListener("click", function () {
      toggleBlacklist(id);
    });
    li.appendChild(name);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function toggleBlacklist(id) {
  var idx = data.blacklist.indexOf(id);
  if (idx === -1) {
    data.blacklist.push(id);
  } else {
    data.blacklist.splice(idx, 1);
  }
  saveData();
  renderBlacklist();
}

/* ---------- init & wiring ---------- */

function init() {
  checkStorage();
  loadData();
  if (!storageAvailable) {
    var warn = document.createElement("p");
    warn.className = "storage-warning";
    warn.textContent = "Storage is unavailable — your history won't be saved.";
    document.querySelector("main.app").prepend(warn);
  }

  document.getElementById("btn-open-menu").addEventListener("click", function () {
    showScreen("screen-energy");
  });

  document.querySelectorAll("#menu-energy .menu-card").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("#menu-energy .menu-card").forEach(function (b) {
        b.classList.remove("menu-card--selected");
      });
      btn.classList.add("menu-card--selected");
      selectEnergy(btn.getAttribute("data-value"));
    });
  });

  document.querySelectorAll("#menu-time .menu-card").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectTime(btn.getAttribute("data-value"));
    });
  });

  document.getElementById("btn-another").addEventListener("click", reroll);
  document.getElementById("btn-perfect").addEventListener("click", accept);
  document.getElementById("btn-startover").addEventListener("click", function () {
    document.querySelectorAll("#menu-energy .menu-card").forEach(function (b) {
      b.classList.remove("menu-card--selected");
    });
    showScreen("screen-energy");
  });

  document.getElementById("btn-empty-settings").addEventListener("click", function () {
    showScreen("screen-settings");
  });

  document.getElementById("settings-btn").addEventListener("click", function () {
    rememberPreviousScreen();
    showScreen("screen-settings");
  });

  document.getElementById("btn-back").addEventListener("click", function () {
    showScreen(previousScreenId);
  });

  document.getElementById("btn-clear-history").addEventListener("click", function () {
    data.history = [];
    saveData();
    renderHistory();
  });

  document.getElementById("btn-reset-all").addEventListener("click", function () {
    if (window.confirm("Reset ALL data (history + blacklist)? This cannot be undone.")) {
      data = { history: [], blacklist: [] };
      saveData();
      renderHistory();
      renderBlacklist();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
