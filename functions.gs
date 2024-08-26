function isTelegram(e) {


  if (
    typeof e.parameter.method === 'undefined' ||
    e.parameter.method === ''

  ) {
    return {
      error: true,
      log: 'use a method'
    };
  }

  if (
    typeof e.parameter.chat_id === 'undefined' ||
    typeof e.parameter.token === 'undefined' ||
    e.parameter.chat_id === '' ||
    e.parameter.token === ''

  ) {
    return {
      error: true,
      log: 'use valid token , chat_id'
    };
  } else {
    return {
      error: false,
      token: e.parameter.token,
      chat_id: e.parameter.chat_id,
      method: e.parameter.method
    };

  }


}
