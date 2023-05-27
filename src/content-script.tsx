import { messageTypes } from './utils/chrome/send-message';

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
  if (request.type === messageTypes.REQUEST_SELECTION) {
    const selection = window.getSelection()?.toString();
    sendResponse(selection);
  }
});
