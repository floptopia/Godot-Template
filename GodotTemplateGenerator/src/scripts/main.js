// Main JavaScript for Godot Template Generator

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize code copy buttons
    initCodeCopyButtons();
});

// Mobile navigation toggle
function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            nav.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Code copy functionality
function initCodeCopyButtons() {
    document.querySelectorAll('.code-copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.nextElementSibling;
            const codeText = getPlainTextFromCodeBlock(codeBlock);
            
            navigator.clipboard.writeText(codeText).then(() => {
                // Show success feedback
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                this.textContent = 'Error!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            });
        });
    });
}

// Extract plain text from code block
function getPlainTextFromCodeBlock(codeBlock) {
    // Create a clone to work with
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = codeBlock.innerHTML;
    
    // Get all code lines
    const codeLines = tempDiv.querySelectorAll('.code-line');
    let plainText = '';
    
    codeLines.forEach(line => {
        // Get text content and remove line numbers
        plainText += line.textContent + '\n';
    });
    
    return plainText;
}

