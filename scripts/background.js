// Load problem set data on extension install or update (push new data)
chrome.runtime.onInstalled.addListener(() => { 
    chrome.storage.local.set({allProblems: {}}, function() {});
    chrome.storage.local.set({solvedProblems: []}, function() {});
});