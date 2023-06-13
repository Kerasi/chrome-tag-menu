function updateTabs() {
  chrome.tabs.query({}, function (tabs) {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, tabs);
    }
  });
}

chrome.tabs.onUpdated.addListener(updateTabs);
chrome.tabs.onRemoved.addListener(updateTabs);
chrome.tabs.onActivated.addListener(updateTabs);


chrome.runtime.onMessage.addListener(function (request) {
  if (request.activateTabId) {
    chrome.tabs.update(request.activateTabId, { active: true });
  }
  if (request.closeTabId) {
    chrome.tabs.remove(request.closeTabId)
  }
});
