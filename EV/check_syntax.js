const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

// A simple check to ensure no mismatched template literals or missing tags
const scripts = html.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi);

if (scripts) {
    let scriptContent = scripts.map(s => s.replace(/<\/?script[^>]*>/gi, '')).join('\n');
    try {
        // Just checking JS syntax of the script parts
        new Function(scriptContent);
        console.log("Syntax check passed!");
    } catch (e) {
        console.error("Syntax Error in inline scripts:", e);
        process.exit(1);
    }
} else {
    console.log("No scripts found, HTML should be fine.");
}
