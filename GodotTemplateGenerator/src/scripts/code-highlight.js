/**
 * Code Highlighting for Godot Template Generator
 * Handles syntax highlighting, line numbers, and copy functionality for code blocks
 */

document.addEventListener('DOMContentLoaded', function() {
    // Process all code blocks
    initializeCodeBlocks();
    
    // Add functionality to copy buttons
    initializeCopyButtons();
});

/**
 * Sets up all code blocks with line numbers and formatting
 */
function initializeCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(codeBlock => {
        // Get the code content
        let content = codeBlock.innerHTML;
        
        // Split into lines for line numbering
        const lines = content.split('\n');
        
        // Process each line
        const processedLines = lines.map((line, index) => {
            // Skip empty last line
            if (index === lines.length - 1 && line.trim() === '') {
                return '';
            }
            
            // Add a span for each line to enable line numbering via CSS counters
            return `<span class="code-line">${line}</span>`;
        });
        
        // Join the lines back together
        codeBlock.innerHTML = processedLines.join('\n');
    });
}

/**
 * Adds functionality to all copy buttons
 */
function initializeCopyButtons() {
    document.querySelectorAll('.code-copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.nextElementSibling;
            
            // Get text content without the line numbers
            const textToCopy = getCleanCodeText(codeBlock);
            
            // Copy to clipboard
            copyToClipboard(textToCopy, button);
        });
    });
}

/**
 * Gets the clean code text without HTML tags and line numbers
 */
function getCleanCodeText(codeElement) {
    // Create a temporary element to strip HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = codeElement.innerHTML;
    
    // Replace specific syntax highlighting spans with their text content
    const highlightSpans = tempElement.querySelectorAll('.code-keyword, .code-builtin, .code-function, .code-string, .code-number, .code-comment, .code-variable, .code-property, .code-operator, .code-decorator, .code-signal, .code-export, .code-onready');
    
    highlightSpans.forEach(span => {
        const textNode = document.createTextNode(span.textContent);
        span.parentNode.replaceChild(textNode, span);
    });
    
    // Remove line number spans and get plain text
    const codeLines = tempElement.querySelectorAll('.code-line');
    let cleanText = '';
    
    codeLines.forEach(line => {
        cleanText += line.textContent + '\n';
    });
    
    return cleanText;
}

/**
 * Copies text to clipboard and updates button text
 */
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Change button text to indicate success
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        
        // Revert button text after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        button.textContent = 'Error!';
        
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

/**
 * Utility function for syntax highlighting
 * Not currently used as we're using static highlighting,
 * but could be expanded for dynamic highlighting
 */
function highlightSyntax(code) {
    // Replace GDScript keywords with highlighted spans
    const keywords = ['extends', 'class_name', 'var', 'const', 'func', 'if', 'elif', 'else', 'for', 'while', 'match', 'break', 'continue', 'pass', 'return', 'class', 'enum', 'signal', 'static', 'export', 'onready', 'await'];
    
    let highlightedCode = code;
    
    // Replace keywords
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlightedCode = highlightedCode.replace(regex, `<span class="code-keyword">${keyword}</span>`);
    });
    
    // Replace strings
    highlightedCode = highlightedCode.replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>');
    
    // Replace comments
    highlightedCode = highlightedCode.replace(/#(.*)$/gm, '<span class="code-comment">#$1</span>');
    
    return highlightedCode;
}

