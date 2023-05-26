export function openLink(href: string) {
  return chrome.tabs.create({ url: href });
}
