function doPost(e) {
  if (typeof e !== 'undefined') {
    return requestHandler(e);
  }
}

function requestHandler(e) {
  var response = handleRequest(e);
  return ContentService.createTextOutput(response);
}


function handleRequest(e) {


  var query;

  if (!isTelegram(e).error) {
    var token = isTelegram(e).token;
    var chat_id = isTelegram(e).chat_id;
    var method = isTelegram(e).method;
  }


  if (typeof e.parameter.text !== 'undefined') {
    var text = e.parameter.text;
  } else {
    var text = '';
  }

  if (typeof e.parameter.photo !== 'undefined' && e.parameter.photo != '') {
    var photo = e.parameter.photo;
  }

  if (typeof e.parameter.document !== 'undefined' && e.parameter.document != '') {
    var document = e.parameter.document;
  }

  if (typeof e.parameter.video !== 'undefined' && e.parameter.video != '') {
    var video = e.parameter.video;
  }

  if (typeof e.parameter.sticker !== 'undefined' && e.parameter.sticker != '') {
    var sticker = e.parameter.sticker;
  }

  if (typeof e.parameter.voice !== 'undefined' && e.parameter.voice != '') {
    var voice = e.parameter.voice;
  }

  if (typeof e.parameter.audio !== 'undefined' && e.parameter.audio != '') {
    var audio = e.parameter.audio;
  }

  if (typeof e.parameter.file_id !== 'undefined' && e.parameter.file_id != '') {
    var file_id = e.parameter.file_id;
  }

  // Updates

  if (typeof e.parameter.offset !== 'undefined' && e.parameter.offset != '') {
    var offset = e.parameter.offset;
  }

  if (typeof e.parameter.limit !== 'undefined' && e.parameter.limit != '') {
    var limit = e.parameter.limit;
  }

  if (typeof e.parameter.timeout !== 'undefined' && e.parameter.timeout != '') {
    var timeout = e.parameter.timeout;
  }


  if (typeof e.parameter.from_chat_id !== 'undefined' && typeof e.parameter.message_id !== 'undefined') {
    var from_chat_id = e.parameter.from_chat_id;
    var message_id = e.parameter.message_id;
  }

  if (typeof e.parameter.reply_to_message_id !== 'undefined' && e.parameter.reply_to_message_id != '') {
    var reply_to_message_id = e.parameter.reply_to_message_id;
  }
  if (typeof e.parameter.disable_notification !== 'undefined' && e.parameter.disable_notification != '') {
    var disable_notification = e.parameter.disable_notification;
  }
  if (typeof e.parameter.duration !== 'undefined' && e.parameter.duration != '') {
    var duration = e.parameter.duration;
  }



  var base_query = "https://api.telegram.org/bot" + token + "/" + method + "?";

  switch (method) {
    case 'sendMessage':
      query = base_query + "text=" + encodeURIComponent(text) + "&chat_id=" + chat_id + "&parse_mode=HTML";
      break;
    case 'sendPhoto':
      photo = e.parameter.photo;
      query = base_query + "caption=" + encodeURIComponent(text) + "&photo=" + encodeURIComponent(photo) + "&chat_id=" + chat_id + "&parse_mode=HTML";
      break;
    case 'forwardMessage':
      query = base_query + "chat_id=" + chat_id + "&from_chat_id=" + from_chat_id + "&message_id=" + message_id;
      break;
    case 'sendAudio':
      query = base_query + "chat_id=" + chat_id + "&audio=" + audio + "&caption=" + text + "&duration=" + duration;
      break;
    case 'sendDocument':
      query = base_query + "chat_id=" + chat_id + "&document=" + document + "&caption=" + text;
      break;
    case 'sendSticker':
      query = base_query + "chat_id=" + chat_id + "&from_chat_id=" + sticker;
      break;
    case 'sendVideo':
      query = base_query + "chat_id=" + chat_id + "&video=" + video + "&caption=" + text + "&duration=" + duration;
      break;
    case 'sendVoice':
      query = base_query + "chat_id=" + chat_id + "&voice=" + voice + "&duration=" + duration;
      break;
    case 'getMe':
      query = base_query;
      break;
    case 'getUpdates':
      query = base_query + "offset=" + offset + "&limit=" + limit + "&timeout=" + timeout;
      break;
    case 'getFile':
      query = base_query + "file_id=" + file_id;
      break;
  }

  if (query) {
    var response = UrlFetchApp.fetch(query);
    return JSON.stringify({
      data: response.getContentText(),
      error: false,
      status: 'done',
    });

  } else {
    return JSON.stringify(isTelegram(e));
  }

}
