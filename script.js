/* PROBLEM CODE HERE*/
//var playerShrooms = localStorage.getItem('playerShrooms') || getRandomInt() * 50000000) + 20000000; 
var playerShrooms = /*prompt("How many gumpshrooms would you like to start with?",*/getRandomInt(20000000, 45000000)/*).replace(/\D/g, '')*/;
var houseCut = 0.98;
var chance = 50;
//PROBLEM CODE??
/*if(playerShrooms > 100000000){
  playerShrooms = 100000000;
} else if(playerShrooms < 1000000){
  playerShrooms = 1000000;
}*/
/*let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  btnAdd.style.display = 'block';
});
btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});
*/

function hideToggle(button, elem) {
  $(button).toggle( function () {
    $(elem).hide();
  },function () {
    $(elem).show();
  });
}
//hideToggle(".togglechat", ".chat");



$(document).ready(function () {
  
  $.notify.defaults({ globalPosition: 'top center', autoHide: false, showDuration:0, hideDuration:0 });
  $.notify.addStyle('mmg', {
  html: "<div><span data-notify-text/></div>",
  classes: {
    base: {
      //"white-space": "nowrap",
      "background-color": "white",
      "padding": "5px",
      "display": "block",
      "margin-left": "-73%",
      "margin-right": "auto",
      "border-color": "black",
      "border-radius": "10px",
        border:"1px solid #000000"
    },
    win: {
      "color": "black",
      "background-color": "white"
    },
    lose: {
      "color": "black",
      "background-color": "white"
    },
    won: {
      "color": "green",
      "background-color": "white"
    },
    lost: {
      "color": "red",
      "background-color": "white"
    }
    
  }
});
});

function toggleChat(){
  var chatcontainer=document.getElementById("chat-container");
  var chat=document.createElement("iframe");
  if(document.getElementById("chat")){
    chatcontainer.removeChild(document.getElementById("chat"));
  }else{
  chat.setAttribute("src", "chat.html");
  //chat.setAttribute("style", "display:block;margin-right:auto;margin-left:auto");
  chat.setAttribute("style", "z-index:1;position:absolute;background-color:white;right:0px;");
  chat.setAttribute("id", "chat");
  //chat.setAttribute("onload", "setIframeSize(this.id)");
  chat.setAttribute("height", "100%");
  chatcontainer.appendChild(chat);
  document.getElementById("chat").style.width = $(document).width() - 0.7 * $(document).width() +"px";
  //document.getElementById("chat").style.height = $(document).height()+"px";
  }
}

function changeHouseCut() {
  var housecutcandidate = document.getElementById("changeHouseCut").value;
  
  houseCut = (100 - housecutcandidate.replace(/\D/g, '')) / 100;
  getHouseCut(houseCut);
}
function changeChance() {
  var chancecandidate = document.getElementById("changeChance").value;
  chance = chancecandidate.replace(/\D/g, '');
  if(chance > 100){
    $.notify("What's the point of setting it higher than 100%?", {
      style:'mmg',
      className: 'win',
      globalPosition: 'top center'
    });
    chance = 100;
  }
  getChance(chance);
  
}
function getHouseCut(hc) {

  document.getElementById("houseCutValue").innerHTML = numberWithCommas(Math.floor(100 - (hc * 100)));

}
function getChance(c) {

  document.getElementById("chanceValue").innerHTML = numberWithCommas(c);

}
function getShrooms(shrooms) {
  document.getElementById("shroomValue").innerHTML = numberWithCommas(shrooms);
}

function changeShrooms() {
  var shroomsCandidate = document.getElementById("changeShrooms").value;
  playerShrooms = shroomsCandidate.replace(/\D/g, '');
  getShrooms(playerShrooms);
}

function flip() {
  if (getRandomInt(1, 100) <= chance) {
    return true;
  } else {
    return false;
  }
}

function numberWithCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
function getCount(parent, getChildrensChildren){
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for(var i=0; i < children; i++){
        //if(parent.childNodes[i].nodeType != 3){
            if(getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i],true);
            relevantChildren++;
        //}
    }
    return relevantChildren;
}
function checkTooManyBets(){
  if(getCount(document.getElementById("yourbet-container"), false) <=5) {
    return false;
  } else {
    return true;
  }
}

function logBet() {
  if (document.getElementById("playerBet").value.replace(/\D/g, '') > 100000000 || document.getElementById("playerBet").value.replace(/\D/g, '') < 1000) {
    $.notify("Sorry, bets can only be between 1,000 and 100,000,000 shrooms.", {
      style:'mmg',
      className: 'win',
      globalPosition: 'top center'
    });
  } else if (checkTooManyBets() == true) {
    $.notify("You may only have up to 5 bets running at a time.", {
      style:'mmg',
      className: 'win',
      globalPosition: 'top center'
    });
  } else if (playerShrooms >= document.getElementById("playerBet").value.replace(/\D/g, '')) {
    var bet = {
      amount: 0,
      player: "",
      taken: false,
      //won: false,
      timer: (Math.random() * 10000) + 50
    };
    
    var pBet = document.getElementById("playerBet").value.replace(/\D/g, '');
    bet.amount = pBet;
    bet.player = "You";
    if(bet.amount <= 100000){
      bet.timer = 500;
    }
    var idtag = getRandomInt(1, 10000);
    var playernameandamount = document.createElement("P");
    playernameandamount.innerText = "You" + " - " + numberWithCommas(numberWithCommas(pBet)) + " gumpshrooms --- ";
    playernameandamount.setAttribute("id", pBet.toString() + idtag.toString());
    //playernameandamount.setAttribute("style", "display:inline-block;margin-right:auto;margin-left:auto; text-align:center")
    var retractbetbutton = document.createElement("button");
    
    retractbetbutton.setAttribute("id", pBet);
    retractbetbutton.setAttribute("onclick", "retractBet(" + pBet + "," + idtag + ")");
    //retractbetbutton.setAttribute("style", "display:inline-block;margin-right:auto;margin-left:auto; text-align:center")
    retractbetbutton.innerHTML = "Retract";
    //document.getElementById("yourbet-container").appendChild(retractbetbutton);
    document.getElementById("yourbet-container").appendChild(playernameandamount);
    document.getElementById(pBet.toString() + idtag.toString()).appendChild(retractbetbutton);
    playerShrooms = playerShrooms - pBet;
    update();
    refresh();
    
    setTimeout(betTaken, bet.timer, pBet, idtag);
    
    return bet;
  } else {
    $.notify("You don't have enough gumpshrooms to place that bet!", {
      style:'mmg',
      className: 'win',
      globalPosition: 'top center'
    });
  }
}

function betTaken(betamount, tag) {
var node = document.getElementById("yourbet-container");

if(!document.getElementById(betamount.toString() + tag.toString())){
  
} else {
  
  if (flip() == true) {
    //var node = document.getElementById("yourbet-container");
  document.getElementById(betamount.toString() + tag.toString()).removeChild(document.getElementById(betamount));
  node.removeChild(document.getElementById(betamount.toString() + tag.toString()));
    
    var gain = parseInt(parseInt(betamount) + parseInt(Math.floor(betamount * houseCut)));
    if(betamount <= 100000){
      $(document).ready(function () {

      $.notify("Saklad5 took your " + numberWithCommas(betamount) + " gumpshroom bet, and you won, \n earning you " + numberWithCommas(gain.toString()) + " gumpshrooms.", {
        style: 'mmg',
        className: "won",
        globalPosition: 'top center'
      }
      );
    });
    } else {
    $(document).ready(function () {

      $.notify(randName() + " took your " + numberWithCommas(betamount) + " gumpshroom bet, and you won, \n earning you " + numberWithCommas(gain.toString()) + " gumpshrooms. ", {
        style: 'mmg',
        className: "won",
        globalPosition: 'top center'
      }
      );
    });
    }
    playerShrooms += parseInt(betamount);
    playerShrooms += parseInt(betamount * houseCut);
    getShrooms(playerShrooms);
    //localStorage.setItem('playerShrooms', playerShrooms);

  } else {
    //var node = document.getElementById("yourbet-container");
  document.getElementById(betamount.toString() + tag.toString()).removeChild(document.getElementById(betamount));
  node.removeChild(document.getElementById(betamount.toString() + tag.toString()));
    if(betamount <= 100000){
      $(document).ready(function () {
      $.notify("Saklad5 took your " + numberWithCommas(betamount) + " gumpshroom bet, and you lost. \n Better luck next time.", {
        style: 'mmg',
        className: "lost",
        globalPosition: 'top center'
      }
      );
    });
    } else {
    $(document).ready(function () {
      $.notify(randName() + " took your " + numberWithCommas(betamount) + " gumpshroom bet, and you lost. \n Better luck next time.", {
        style: 'mmg',
        className: "lost",
        globalPosition: "top center"
      }
      );
    });
    }
    if (playerShrooms <= 0) {
      playerShrooms = 0;
      $.notify("You're broke!", {
      style:'mmg',
      className: 'win',
      globalPosition: 'top center'
    });
    }
    getShrooms(playerShrooms);
    //localStorage.setItem('playerShrooms', playerShrooms);


  }
}
}

function update() {
  getShrooms(playerShrooms);
  updateNPCBets();
  getHouseCut(houseCut);
  getChance(chance);
  //localStorage.setItem('playerShrooms', playerShrooms);
}
/*var randName1 = randName();
var randName2 = randName();
var randName3 = randName();*/

function martingale(lastBet) {
  
}

function postNewBets() {

  var bets = []
  for (i = 0; i < getRandomInt(1, 10); i++) {
    var forceonline = false;
    var bet = {
      amount: 0,
      player: "",
      taken: false,
      won: false
    };
    if (i == 0) {
      bet.player = "Saklad5";
    } else if(getRandomInt(1, 8) == 3){
      bet.player = "ninjin_joshi";
    } else {
      bet.player = randName();
    }
    if(getRandomInt(1, 5) == 3 || forceonline == true){
      bet.player = "mr_bibiloni";
      forceonline = true;
    }
    if (bet.player == "Saklad5") {
      var selector = getRandomInt(0, 13);
      if (selector == 0 || selector == 11) {
        bet.amount = 1600000;
      } else if (selector == 1 || selector == 2) {
        bet.amount = 800000;
      } else if (selector == 3 || selector == 4 || selector == 5) {
        bet.amount = 400000;
      } else if (selector == 9 || selector == 10) {
        bet.amount = 100000;
      } else if (selector == 6 || selector == 7 || selector == 8) {
        bet.amount = 200000;
      } else if (selector == 12 || selector == 13){
        bet.amount = 3200000
      }
    } else if (bet.player == "ninjin_joshi") {
      var selector = getRandomInt(0, 13);
      if (selector == 0 || selector == 11) {
        bet.amount = 100000000;
      } else if (selector == 1 || selector == 2) {
        bet.amount = 36000000;
      } else if (selector == 3 || selector == 4 || selector == 5) {
        bet.amount = 18000000;
      } else if (selector == 9 || selector == 10) {
        bet.amount = 1000000;
      } else if (selector == 6 || selector == 7 || selector == 8) {
        bet.amount = 5000000;
      } else if (selector == 12 || selector == 13){
        bet.amount = 70000000;
      }
    } else if(bet.player == "mr_bibiloni"){
      bet.amount = 100000000;
    } else {
      var selector = getRandomInt(0, 10);
      if (selector == 0) {
        bet.amount = parseInt(getRandomInt(50, 120).toString() + "000000");
      } else if (selector == 1 || selector == 2) {
        bet.amount = parseInt(getRandomInt(100, 500).toString() + "00000");
      } else if (selector == 3 || selector == 4 || selector == 5) {
        bet.amount = parseInt(getRandomInt(30, 100).toString() + "00000");
      } else if (selector == 9 || selector == 10) {
        bet.amount = parseInt(getRandomInt(10, 30).toString() + "00000");

      } else if (selector == 6 || selector == 7 || selector == 8) {
        bet.amount = parseInt(getRandomInt(10, 10000).toString() + "00");
      }
    }
    if (bet.amount > 100000000) {
      bet.amount = 100000000;
    }


    bets.push(bet);

  }

  return bets;
}

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function updateNPCBets() {
  var bets = postNewBets();
  for (i = 0; i < bets.length; i++) {
    var idtag = getRandomInt(1, 10000);
    var playernameandamount = document.createElement("P");
    playernameandamount.innerText = bets[i].player + " - " + numberWithCommas(bets[i].amount) + " gumpshrooms --- ";
    playernameandamount.setAttribute("id", bets[i].amount.toString() + idtag.toString());
    var takebetbutton = document.createElement("button");
    if(playerShrooms < bets[i].amount){
      takebetbutton.setAttribute("disabled", "");
      takebetbutton.setAttribute("style", "color:gray");
    }
    takebetbutton.setAttribute("id", bets[i].amount);
    takebetbutton.setAttribute("onclick", "takeBet(" + bets[i].amount + ")");
    takebetbutton.innerHTML = "Take Bet";
    document.getElementById("bet-container").appendChild(playernameandamount);
    document.getElementById(bets[i].amount.toString() + idtag.toString()).appendChild(takebetbutton);
  }
}

function refresh() {
  var node = document.getElementById("bet-container");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  getHouseCut(houseCut);
  update();
}



function retractBet(betamount, tag) {
  var node = document.getElementById("yourbet-container");
  document.getElementById(betamount.toString() + tag.toString()).removeChild(document.getElementById(betamount));
  node.removeChild(document.getElementById(betamount.toString() + tag.toString()));
  
  playerShrooms = playerShrooms + betamount;
  getShrooms(playerShrooms);
  //updateNPCBets();
  getHouseCut(houseCut);
  refresh();
}
function takeBet(betamount) {

  if (playerShrooms >= betamount) {
    var node = document.getElementById("bet-container");
    if (flip() == true) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
      $(document).ready(function () {

        var gain = parseInt(parseInt(betamount) + parseInt(Math.floor(betamount * houseCut)));
        $.notify("🍄 You bet " + numberWithCommas(betamount) + " gumpshrooms. \n \n" +
          "You wipe cold sweat from your brow. \n Nausea twists in your guts. The game begins. \n \"The coin doesn\'t matter,\" says the old man. \n \"your stupid lizard brain will do what it \n has been programmed by evolution to do.\" " + "\n \n" +
          "The coin is nonsense. Fake, meaningless nonsense. \n Stop doing this. " + "\n \n" +
          "MEANINGLESS " + "\n \n" +
          "🍄 You gain " + numberWithCommas(gain.toString()) + " gumpshrooms.", {
        style: 'mmg',
        className: "win",
        globalPosition: 'top center'
      }
        );
      });

      playerShrooms = parseInt(parseInt(playerShrooms) + parseInt(Math.floor(betamount * houseCut)));

      //localStorage.setItem('playerShrooms', playerShrooms);
      getShrooms(playerShrooms);
  updateNPCBets();
  getHouseCut(houseCut);
    } else {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
      $(document).ready(function () {
        $.notify("🍄 You bet " + numberWithCommas(betamount) + " gumpshrooms. \n \n" +
          "You wipe cold sweat from your brow. \n Nausea twists in your guts. The game begins. \n \"The coin doesn\'t matter,\" says the old man. \n \"your stupid lizard brain will do what it \n has been programmed by evolution to do.\" " + "\n \n" +
          "The coin is nonsense. Fake, meaningless nonsense. \n Stop doing this. " + "\n \n" +
          "MEANINGLESS You lost... Why are you still doing this.\"", {
        style: 'mmg',
        className: "lose",
        globalPosition: 'top center'
      }
        );
      });
      playerShrooms = playerShrooms - betamount;
      //localStorage.setItem('playerShrooms', playerShrooms);
      getShrooms(playerShrooms);
  updateNPCBets();
  getHouseCut(houseCut);
    }
  } else {
    $.notify("You don't have enough gumpshrooms to take that bet!", {
      style:'mmg',
      className: 'win',
      globalPosition: 'top center'
    });
  }

}

var nameList = [
  'Time', 'Past', 'Future', 'Dev',
  'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
  'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
  'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
  'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
  'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
  'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
  'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
  'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
  'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
  'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha',
  'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
  'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
  'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
  'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
  'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken',
  'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
  'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
  'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
  'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
  'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich', 'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand', 'Cool', 'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
];



function randName() {
  var name = "";
  var selector = getRandomInt(1, 3);
  name = nameList[Math.floor(Math.random() * nameList.length)];
  name += nameList[Math.floor(Math.random() * nameList.length)];
  if (Math.random() > 0.5) {
    name += nameList[Math.floor(Math.random() * nameList.length)];
    if (Math.random() > 0.6) {
      if (selector > 1) {
        name += getRandomInt(1, 100);
      } else {
        name += getRandomInt(1000, 10000);
      }
    }
  }
  return name;
};