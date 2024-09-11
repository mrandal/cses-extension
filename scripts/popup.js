let problems = [];
chrome.storage.local.get('allProblems', function(result) {
    if (result.allProblems) {
        problems = result.allProblems;
    }
});

let solved = [];
chrome.storage.local.get('solvedProblems', function(result) {
    updateProblems(result);
});

function updateProblems(result) {
    if (result.solvedProblems) {
        // Get the number of solved problems
        const numSolved = result.solvedProblems.length;
        solved = result.solvedProblems;

        // Set the text of the header with id="num-solved"
        document.getElementById('num-solved').textContent = `${numSolved} / ${problems.length}`;
    } else {
        // If no solved problems are found, set the text accordingly
        document.getElementById('num-solved').textContent = '0 / ${problems.length}';
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateProblems') {
        cout << "RAN";
        chrome.storage.local.get('solvedProblems', function(result) {
            updateProblems(result);
        });
    }
});

// Next problem button
document.getElementById('next').addEventListener('click', () => {
    let problemNumber = 0;
    let problemsCopy = [...problems];
    while(problemsCopy.length > 0) {
        let randomIndex = Math.floor(Math.random() * problemsCopy.length);
        problemNumber = problemsCopy[randomIndex];
        let flag = false;
        for(let i = 0; i < solved.length; i++) {
            if(solved[i] == problemNumber) {
                flag = true;
                break;
            }
        }
        if(flag) {
            problemsCopy.splice(randomIndex, 1);
        }
        else {
            break;
        }
    }
    if(problemsCopy.length == 0) {
        document.getElementById('next').textContent = 'Solved all problems :)';
    }
    else{
        const nextUrl = `https://cses.fi/problemset/task/${problemNumber}`;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //pick random unsolved problem
            if(tabs[0].url.includes("cses.fi")) {
                chrome.tabs.update(tabs[0].id, {url: nextUrl});
            }
            else{
                chrome.tabs.create({url: nextUrl});
            }
        });
    }
});

// Load solved button
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

chrome.storage.local.get('showTags', function(result) {
    if(result.showTags) {
        document.getElementById('show-tags').textContent = 'Hide';
    }
    else {
        document.getElementById('show-tags').textContent = 'Show';
    }
});
// Show/hide tags button
document.getElementById('show-tags').addEventListener('click', () => {
    if(document.getElementById('show-tags').textContent == 'Show') {
        document.getElementById('show-tags').textContent = 'Hide';
        if(window.location.href == 'https://cses.fi/problemset/*') {
            window.location.reload(true);
        }
    }
    else {
        document.getElementById('show-tags').textContent = 'Show';
    }
    chrome.storage.local.get('showTags', function(result) {
        const showTags = result.showTags;
        chrome.storage.local.set({showTags: !showTags}, function() {});
    });
});


