let problems
chrome.storage.local.get('problemData', function(result) {
    if (result.problemData) {
        problems = result.problemData;
    }
});

let solved = [];
chrome.storage.local.get('solvedProblems', function(result) {
    if (result.solvedProblems) {
        // Get the number of solved problems
        const numSolved = result.solvedProblems.length;
        solved = result.solvedProblems;

        // Set the text of the header with id="num-solved"
        document.getElementById('num-solved').textContent = `Solved ${numSolved} / ${Object.keys(problems).length}`;
    } else {
        // If no solved problems are found, set the text accordingly
        document.getElementById('num-solved').textContent = 'Solved 0 / ${problems.length}';
    }
});

// Next proble button
document.getElementById('next').addEventListener('click', () => {
    let problemNumber = 0;
    let problemKeys = Object.keys(problems);
    while(problemKeys.length > 0) {
        let randomIndex = Math.floor(Math.random() * problemKeys.length);
        problemNumber = problemKeys[randomIndex];
        let flag = false;
        for(let i = 0; i < solved.length; i++) {
            if(solved[i] == problemNumber) {
                flag = true;
                break;
            }
        }
        if(flag) {
            problemKeys.splice(randomIndex, 1);
        }
        else {
            break;
        }
    }
    const nextUrl = `https://cses.fi/problemset/task/${problemNumber}`;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //pick random unsolved problem
        if(tabs[0].url.includes("cses.fi")) {
            chrome.tabs.update(tabs[0].id, {url: nextUrl});
        }
        else{
            chrome.tabs.create({url: nextUrl});
        }
    });
    console.log('Next button clicked');
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




