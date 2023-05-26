chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled');
  chrome.contextMenus.create(
    {
      title: 'Translate selected money',
      id: 'translate_selected_money',
      contexts: ['all'],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.log('Got expected error: ' + chrome.runtime.lastError.message);
      }
    }
  );
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab || !tab.id) {
    return;
  }
  switch (info.menuItemId) {
    case 'translate_selected_money':
      console.log('translate clicked', tab);
      break;
  }
});
