// Load problem set data on extension install or update (push new data)
chrome.runtime.onInstalled.addListener(() => { 
    fetch('problemData.json')
        .then(response => response.json())
        .then(data => {
            chrome.storage.local.set({problemData: data}, function() {
                console.log('Problem data loaded');
            });
        })
        .catch(err => console.error(err));
});