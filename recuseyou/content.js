// Wait for document ready before executing main function
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        main();
    }
}, 10);

function main() {
    // Replace page title
    document.title = generateReplacement(document.title);

    // Replace all initial text on page
    replaceNodeText(document.body);

    // Create a mutation observer to monitor the DOM for changes
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            Array.prototype.slice.call(mutation.addedNodes).forEach(replaceNodeText);
        });
    });

    // Configure and start the observer
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
}

function replaceNodeText(node) {
    // Create a tree walker to traverse all text nodes
    var walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Reject contentEditable nodes
                return (node.parentElement && node.parentElement.isContentEditable) ?
                    NodeFilter.FILTER_SKIP :
                    NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    // Replace all text nodes
    var textNode;
    while(textNode = walker.nextNode()) {
        textNode.nodeValue = generateReplacement(textNode.nodeValue);
    }
}

function generateReplacement(text) {
	console.log(text);
    const regex = /(R|r)(ecus)(ing|al|ed|e)?/g;
    	
    return text.replace(regex, function (g1, g2, g3, g4) {
    	console.log(g1, g2, g3, g4);
    	var prefix = '';
    	var middle = 'uck';
    	var suffix = '';
    	if (g2 == g2.toLowerCase()) {
    		prefix = 'f';
    	} else {
    		prefix = 'F';
    	}
    	switch(g4) {
    		case 'ed':
    			suffix = 'ed';
    			break;
    		case 'ing':
    			suffix = 'ing';
    			break;
    		case 'al':
    			suffix = 'ing';
    			break;
    		case "s":
    			suffix = 's';
    			break;
    	}
    	var word = prefix + middle + suffix;
    	console.log(word)
    	return word;
    })
}