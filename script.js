/* PROBLEM CODE HERE*/
//var playerShrooms = localStorage.getItem('playerShrooms') || getRandomInt() * 50000000) + 20000000;
var playerShrooms = /*prompt("How many gumpshrooms would you like to start with?",*/getRandomInt(50000000, 70000000)/*).replace(/\D/g, '')*/;
var houseCut = 0.98;
//PROBLEM CODE??
/*if(playerShrooms > 100000000){
  playerShrooms = 100000000;
} else if(playerShrooms < 1000000){
  playerShrooms = 1000000;
}*/

$(document).ready(function () {
  $.notify.defaults({ globalPosition: 'top center', autoHide: false });
});

function changeHouseCut() {
  houseCut = (100 - document.getElementById("changeHouseCut").value) / 100;
  getHouseCut(houseCut);
}

function getHouseCut(hc) {

  document.getElementById("houseCutValue").innerHTML = numberWithCommas(Math.floor(100 - (hc * 100)));

}

function getShrooms(shrooms) {
  document.getElementById("shroomValue").innerHTML = numberWithCommas(shrooms);
}

function changeShrooms() {
  playerShrooms = document.getElementById("changeShrooms").value.replace(/\D/g, '');
  getShrooms(playerShrooms);
}

function flip() {
  if (Math.floor(Math.random() * 2) == 1) {
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

function logBet() {
  if (document.getElementById("playerBet").value > 100000000 || document.getElementById("playerBet").value < 1000) {
    $.notify("Sorry, bets can only be between 1,000 and 100,000,000 shrooms.");
  } else if (playerShrooms >= document.getElementById("playerBet").value) {
    var bet = {
      amount: 0,
      player: "",
      taken: false,
      won: false,
      timer: (Math.random() * 10000) + 50
    };
    
    var pBet = document.getElementById("playerBet").value;
    bet.amount = pBet.replace(/\D/g, '');
    bet.player = "You";
    if(bet.amount <= 100000){
      bet.timer = 500;
    }
    var playernameandamount = document.createElement("P");
    playernameandamount.innerText = "You" + " - " + numberWithCommas(numberWithCommas(pBet)) + " gumpshrooms";
    playernameandamount.setAttribute("id", pBet);
    var retractbetbutton = document.createElement("button");
    
    retractbetbutton.setAttribute("id", pBet);
    retractbetbutton.setAttribute("onclick", "retractBet(" + pBet + ")");
    retractbetbutton.setAttribute("style", "display:block;margin-right:auto;margin-left:auto")
    retractbetbutton.innerHTML = "Retract";
    document.getElementById("yourbet-container").appendChild(playernameandamount);
    document.getElementById("yourbet-container").appendChild(retractbetbutton);
    playerShrooms = playerShrooms - pBet;
    update();
    refresh();
    setTimeout(betTaken, bet.timer, pBet);
    return bet;
  } else {
    $.notify("You don't have enough gumpshrooms to place that bet!", "info");
  }
}

function betTaken(betamount) {

  var node = document.getElementById("yourbet-container");
  if (flip() == true) {

    node.removeChild(document.getElementById(betamount));
    node.removeChild(document.getElementById(betamount));
    var gain = parseInt(parseInt(betamount) + parseInt(Math.floor(betamount * houseCut)));
    if(betamount <= 100000){
      $(document).ready(function () {

      $.notify("Saklad5 took your " + numberWithCommas(betamount) + " gumpshroom bet, and you won, \n earning you " + numberWithCommas(gain.toString()) + " gumpshrooms.", {
        className: "success",
        globalPosition: 'top center'
      }
      );
    });
    } else {
    $(document).ready(function () {

      $.notify(randName() + " took your " + numberWithCommas(betamount) + " gumpshroom bet, and you won, \n earning you " + numberWithCommas(gain.toString()) + " gumpshrooms.", {
        className: "success",
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
    node.removeChild(document.getElementById(betamount));
    node.removeChild(document.getElementById(betamount));
    if(betamount <= 100000){
      $(document).ready(function () {
      $.notify("Saklad5 took your " + numberWithCommas(betamount) + " gumpshroom bet, and you lost. \n Better luck next time.", {
        className: "error",
        globalPosition: "top center"
      }
      );
    });
    } else {
    $(document).ready(function () {
      $.notify(randName() + " took your " + numberWithCommas(betamount) + " gumpshroom bet, and you lost. \n Better luck next time.", {
        className: "error",
        globalPosition: "top center"
      }
      );
    });
    }
    if (playerShrooms <= 0) {
      playerShrooms = 0;
      $.notify("You're broke!", "error");
    }
    getShrooms(playerShrooms);
    //localStorage.setItem('playerShrooms', playerShrooms);


  }
}

function update() {
  getShrooms(playerShrooms);
  updateNPCBets();
  getHouseCut(houseCut);
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
    var bet = {
      amount: 0,
      player: "",
      taken: false,
      won: false
    };
    if (i == 0) {
      bet.player = "Saklad5";
    } else if(i == 2){
      bet.player = "ninjin_joshi";
    } else {
      bet.player = randName();
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
    var playernameandamount = document.createElement("P");
    playernameandamount.innerText = bets[i].player + " - " + numberWithCommas(bets[i].amount) + " gumpshrooms --- ";
    playernameandamount.setAttribute("id", bets[i].amount);
    var takebetbutton = document.createElement("button");
    if(playerShrooms < bets[i].amount){
      takebetbutton.setAttribute("disabled", "");
      takebetbutton.setAttribute("style", "color:gray");
    }
    takebetbutton.setAttribute("id", bets[i].amount);
    takebetbutton.setAttribute("onclick", "takeBet(" + bets[i].amount + ")");
    takebetbutton.innerHTML = "Take Bet";
    document.getElementById("bet-container").appendChild(playernameandamount);
    document.getElementById(bets[i].amount).appendChild(takebetbutton);
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



function retractBet(betamount) {
  var node = document.getElementById("yourbet-container");
  node.removeChild(document.getElementById(betamount));
  node.removeChild(document.getElementById(betamount));
  playerShrooms = playerShrooms + betamount;
  update();
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
        $.notify("You bet " + numberWithCommas(betamount) + " gumpshrooms. \n \n" +
          "You wipe cold sweat from your brow. \n Nausea twists in your guts. The game begins. \n \"The coin doesn\'t matter,\" says the old man. \n \"your stupid lizard brain will do what it has been programmed by evolution to do.\" " + "\n \n" +
          "The coin is nonsense. Fake, meaningless nonsense. \n Stop doing this. " + "\n \n" +
          "MEANINGLESS " + "\n \n" +
          "You gain " + numberWithCommas(gain.toString()) + " gumpshrooms.", {
            className: "success",
            globalPosition: 'top center'
          }
        );
      });

      playerShrooms = parseInt(parseInt(playerShrooms) + parseInt(Math.floor(betamount * houseCut)));

      //localStorage.setItem('playerShrooms', playerShrooms);
      update();
    } else {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
      $(document).ready(function () {
        $.notify("You bet " + numberWithCommas(betamount) + " gumpshrooms. \n \n" +
          "You wipe cold sweat from your brow. \n Nausea twists in your guts. The game begins. \n \"The coin doesn\'t matter,\" says the old man. \n \"your stupid lizard brain will do what it has been programmed by evolution to do.\" " + "\n \n" +
          "The coin is nonsense. Fake, meaningless nonsense. \n Stop doing this. " + "\n \n" +
          "MEANINGLESS You lost... Why are you still doing this.\"", {
            className: "error",
            globalPosition: "top center"
          }
        );
      });
      playerShrooms = playerShrooms - betamount;
      //localStorage.setItem('playerShrooms', playerShrooms);
      update();
    }
  } else {
    $.notify("You don't have enough gumpshrooms to take that bet!", "info");
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