console.log('content script here');

type HELLO = {
  type: 'CURRENCY_TRANSLATE.HELLO';
};

function isExtensionRequest(request: any): request is HELLO {
  if (request.type === 'CURRENCY_TRANSLATE.HELLO') {
    return true;
  }
  return false;
}

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
  if (isExtensionRequest(request)) {
    const selection = window.getSelection()?.toString();
    sendResponse({ selection });
  }
});
