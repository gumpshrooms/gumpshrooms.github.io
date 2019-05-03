var yourbetHistory = localStorage.getItem('yourbetHistory');
var betHistory = localStorage.getItem('betHistory');
function update() {
  document.getElementById("yourbetHistory").innerHTML = splitYourBetHistory();
  document.getElementById("betHistory").innerHTML = splitBetHistory();
}
function toggleChat() {
  var chatcontainer = document.getElementById("chat-container");
  var chat = document.createElement("iframe");
  if (document.getElementById("chat")) {
    chatcontainer.removeChild(document.getElementById("chat"));
  } else {
    chat.setAttribute("src", "chat.html");
    //chat.setAttribute("style", "display:block;margin-right:auto;margin-left:auto");
    chat.setAttribute("style", "z-index:1;position:absolute;background-color:white;right:0px;");
    chat.setAttribute("id", "chat");
    //chat.setAttribute("onload", "setIframeSize(this.id)");
    chat.setAttribute("height", "100%");
    chatcontainer.appendChild(chat);
    document.getElementById("chat").style.width = $(document).width() - 0.7 * $(document).width() + "px";
    //document.getElementById("chat").style.height = $(document).height()+"px";
  }
}
function splitYourBetHistory(){
  if(yourbetHistory == ''){
    return "(none)";
  }
  var tempyourbetHistory = yourbetHistory;
  tempyourbetHistory = tempyourbetHistory.split(/([0-9]+)/);
  tempyourbetHistory.splice(0, 1);
  /*for(var j = 1; j <= tempyourbetHistory.length; j++){ 
    tempyourbetHistory[j] = numberWithCommas(tempyourbetHistory[j]);
  }*/
  for(var i = 0; i <= tempyourbetHistory.length; i += 3) {
    
    tempyourbetHistory.splice(i, 0, "<br>");
    
  }
  
  //var y = tempyourbetHistory.split(/\D/g);
  return tempyourbetHistory.join('');
}

function splitBetHistory(){
  if(betHistory == ''){
    return "(none)";
  }
  var tempbetHistory = betHistory;
  tempbetHistory = tempbetHistory.split(/([0-9]+)/);
  tempbetHistory.splice(0, 1);
  /*for(var j = 1; j <= tempbetHistory.length; j++){ tempbetHistory[j] = numberWithCommas(tempbetHistory[j]);}*/

  for(var i = 0; i <= tempbetHistory.length; i += 3) {
    
    tempbetHistory.splice(i, 0, "<br>");
    
 
  }
  //var y = tempyourbetHistory.split(/\D/g);
  return tempbetHistory.join('');
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
