// Load problem set data on extension install or update (push new data)
chrome.runtime.onInstalled.addListener(() => { 
    chrome.storage.local.set({problemData: {}}, function() {
        console.log('Problem data loaded');
    });
    fetch('problemData.json')
        .then(response => response.json())
        .then(data => {
            chrome.storage.local.set({problemData: data}, function() {
                console.log('Problem data loaded');
            });
        })
        .catch(err => console.error(err));
});