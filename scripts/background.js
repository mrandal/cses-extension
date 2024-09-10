chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if(tab.ural && tab.url.includes("cses.fi/problemset")) {
        chrome.pageAction.show(tabId)
    }
})