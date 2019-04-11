const CLIENT_ID = 'gZMsRHNkvKGPoqB2';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events

    name: prompt("Enter a username:", getRandomName()),
  
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function askName() {
  var username;
  username = prompt("Please enter a username no longer than 20 characters:", getRandomName());
  console.log("asked")
if(username.length() >= 20){
  console.log("toolong");
  username = prompt("The username was too long. Try again.", getRandomName());
  
} else if(username == null){
  console.log("nothinggiven");
  username = prompt("You did not provide a username. Try again.", getRandomName());
}
  console.log("finish");
  return username;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomName() {
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

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-room',
    message: value,
  });
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} degenerate gambling addict(s) in chat:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}
