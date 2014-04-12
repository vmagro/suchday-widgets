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