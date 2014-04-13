var inboxData;
var myInfo;

(function() {
  var accessToken = "CAAVHEx8VilQBAENvDP9SnEhQZAfIYsOwDVfcdEUbyZCDZAGBReoYOVUZCZBqZAZBZBMnrZA8HiLOfff2zo6HNLzD9h8XcEdtmrHvlr2RrMTlAXAkeYydWArwxodLKoPZCjo42eM0pnfg7CnkOBVCLYxbkTqLvfu6dnhZAiX1hZAriIiWXkZB1IZBModxZB9Xd7hvRy2Hv8ZD";
  $.getJSON("https://graph.facebook.com/me/inbox?access_token=" + accessToken, function(json) {
      console.log("We attempted to get inbox data");
      console.log("Inbox length: " + json.data.length)
      if (json.data.length > 5) {
          console.log("Facebook convos longer than 5");
          json.data = json.data.slice(0, 5);
      }
      inboxData = json;
      myInfo = $.getJSON("https://graph.facebook.com/me?access_token=" + accessToken, function(json) {
          console.log("We attempted to get my data");
          myInfo = json;
      });
  }).done(function() {
      $("#unread-count").html(getReadUnreadString());
      var convoListHtml;
      for (var i = 0; i < getConversationIndexCount(); i++) {
          convoListHtml += ('<div class="conversation"><strong>" + prettyParticipants(i) + "</strong><br />" + getConversationSnippet(i) + "<br /><em>" + getDateString(i) + "</em></div>');
      }
      $("#recent-convos").empty().html(convoListHtml);
  });
})();

function getUnreadCount() {
  return inboxData.summary.unread_count;
}

function getReadUnreadString() {
  if (getUnreadCount() > 0) {
      return "You have " + getUnreadCount() + " unread messages";
  } else {
      return "No unread messages!";
  }
}

function getConversationIndexCount() {
  return inboxData.data.length;
}

function getMessageParticipants(conversationIndex) {
  var participantList = [];
  inboxData.data[conversationIndex].to.data.forEach(function(element, index, array) {
      participantList.push(element.name);
  });
  return participantList;
}

function prettyParticipants(conversationIndex) {
  participants = getMessageParticipants(conversationIndex);
  participants.splice(participants.lastIndexOf(myInfo.name), 1, "Me");
  return participants;
}

function getConversationSnippet(conversationIndex) {
  returnMessage = inboxData.data[conversationIndex].comments.data[getLastMessageIndex(conversationIndex)].message;
  returnMessage = returnMessage.trunc(60);
  if (detectLastParticipant(conversationIndex) == myInfo.name) {
      return "Me: " + returnMessage;
  } else {
      return detectLastParticipant(conversationIndex) + ": " + returnMessage;
  }
  return "error";
}

function getLastMessageIndex(conversationIndex) {
  return inboxData.data[conversationIndex].comments.data.length - 1;
}

function detectLastParticipant(conversationIndex) {
  return inboxData.data[conversationIndex].comments.data[getLastMessageIndex(conversationIndex)].from.name;
}

function getDateString(conversationIndex) {
  return moment(inboxData.data[conversationIndex].updated_time).format("ddd, M/D");
}

//Thanks Stack Overflow
String.prototype.trunc =
  function(n, useWordBoundary) {
      var toLong = this.length > n,
          s_ = toLong ? this.substr(0, n - 1) : this;
      s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
      return toLong ? s_ + '...' : s_;
};