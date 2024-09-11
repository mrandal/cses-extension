// Load problem set data on extension install or update (push new data)
chrome.runtime.onInstalled.addListener(() => { 
    chrome.storage.local.set({allProblems: []}, function() {});
    chrome.storage.local.set({solvedProblems: []}, function() {});
    chrome.storage.local.set({showTags: false}, function() {});
    chrome.tabs.create({url: 'https://cses.fi/problemset/'}, function(newTab) {
        // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        //     if(tabId == newTab.id && changeInfo.status == 'complete') {
        //         chrome.scripting.executeScript({
        //             target: {tabId: newTab.id},
        //             files: ['gatherData.js']
        //         });
        //     }
        // });
    });
});