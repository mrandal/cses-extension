const tasks = document.querySelectorAll('li.task');

let problemData = {};
console.log("RAN");

let solvedProblems = [];

tasks.forEach(task => {
    const taskLink = task.querySelector('a')
    const href = taskLink.href;
    const problemNumber = href.match(/\/task\/(\d+)/);
    const statusElement = task.querySelector('span.task-score.icon.full', 'span.tas-score.icon')
    const status = statusElement ? statusElement.classList.contains('full') ? 'solved' : 'unsolved' : 'unknown'
    if(problemNumber && status === 'solved') {
        solvedProblems.push(problemNumber[1]);
    }
})

chrome.storage.local.set({solvedProblems: solvedProblems}, function() {});