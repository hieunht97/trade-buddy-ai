export function getFirstNCharsOrLess(text, numChars = 1000) {
  if (text.length <= numChars) {
    return text;
  }
  return text.substring(0, numChars);
}

export function getFirstN({ messages, size = 10 }) {
  if (messages.length > size) {
    const firstN = new Array();
    for (let i = 0; i < size; i++) {
      firstN.push(messages[i]);
    }
    return firstN;
  } else {
    return messages;
  }
}
