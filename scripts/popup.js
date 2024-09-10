document.getElementById('next').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs[0].url.includes("cses.fi")) {
            chrome.tabs.update(tabs[0].id, {url: 'https://cses.fi/problemset/'});
        }
        else{
            chrome.tabs.create({url: 'https://cses.fi/problemset/'});
        }
    });
    console.log('Next button clicked');
});
document.getElementById('load-solved').addEventListener('click', () => {
    chrome.tabs.create({url: 'https://cses.fi/problemset/'}, function(newTab) {
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if(tabId == newTab.id && changeInfo.status == 'complete') {
                chrome.scripting.executeScript({
                    target: {tabId: newTab.id},
                    files: ['contentScript.js']
                });

                chrome.tabs.onUpdated.removeListener(arguments.callee);
            }
        })
    });

});