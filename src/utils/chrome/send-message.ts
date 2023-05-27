import { getCurrentTab } from './get-current-tab';

export const messageTypes = {
  REQUEST_SELECTION: 'CURRENCY_TRANSLATE.REQUEST_SELECTION',
} as const;

export async function requestSelection() {
  const currentTabId = (await getCurrentTab())?.id;
  if (!currentTabId) {
    return '';
  }

  const response: string | undefined = await chrome.tabs.sendMessage(
    currentTabId,
    {
      type: messageTypes.REQUEST_SELECTION,
    }
  );

  return response ?? '';
}
