const problemTags = ["Introductory Problems", "Sorting and Searching", "Dynamic Programming",
    "Graph Algorithms", "Range Queries", "Tree Algorithms", "Mathematics",
    "String Algorithms", "Geometry", "Advanced Techniques", "Additional Problems"];

// Hide problem tags
chrome.storage.local.get('showTags', function (result) {
    if (!result.showTags) {
        // Create a TreeWalker to traverse text nodes in the document
        const walker = document.createTreeWalker(
            document.body, // Start at the body
            NodeFilter.SHOW_TEXT, // Only consider text nodes
            null,
            false
        );

        let node;
        while ((node = walker.nextNode())) {
            problemTags.forEach(tag => {
                // Create a regular expression to find the tag in the text (case-insensitive)
                const regex = new RegExp(`\\b${tag}\\b`, 'gi');

                if (regex.test(node.nodeValue)) {
                    // Replace the tag with "problem type hidden"
                    node.nodeValue = node.nodeValue.replace(regex, 'Problem type hidden');
                }
            });
        }
    }
});
