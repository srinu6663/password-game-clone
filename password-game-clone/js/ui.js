/**
 * UI functionality for The Password Game
 */

/**
 * Create a rule element
 * @param {Object} rule - The rule object
 * @param {number} index - The rule index
 * @returns {HTMLElement} - The rule element
 */
function createRuleElement(rule, index) {
    const ruleElement = document.createElement('div');
    ruleElement.className = 'rule';
    ruleElement.id = `rule-${rule.id}`;
    ruleElement.setAttribute('data-rule-id', rule.id);
    
    // Create rule header
    const ruleHeader = document.createElement('div');
    ruleHeader.className = 'rule-header';
    
    // Add rule number
    const ruleNumber = document.createElement('span');
    ruleNumber.className = 'rule-number';
    ruleNumber.textContent = `Rule ${rule.id}:`;
    
    // Add rule status indicator
    const ruleStatus = document.createElement('span');
    ruleStatus.className = 'rule-status';
    
    ruleHeader.appendChild(ruleNumber);
    ruleHeader.appendChild(ruleStatus);
    
    // Create rule content
    const ruleContent = document.createElement('div');
    ruleContent.className = 'rule-content';
    ruleContent.textContent = typeof rule.description === 'function' ? rule.description() : rule.description;
    
    // Add rule header and content to rule element
    ruleElement.appendChild(ruleHeader);
    ruleElement.appendChild(ruleContent);
    
    // Add visual examples if available
    if (rule.examples) {
        const examplesContainer = document.createElement('div');
        examplesContainer.className = 'rule-examples';
        
        rule.examples.forEach(example => {
            const exampleItem = document.createElement('span');
            exampleItem.className = 'example-item';
            exampleItem.textContent = example;
            exampleItem.title = `Click to add ${example} to your password`;
            
            // Add click event to insert example into password field
            exampleItem.addEventListener('click', () => {
                const passwordInput = document.getElementById('password');
                if (passwordInput) {
                    const start = passwordInput.selectionStart;
                    const end = passwordInput.selectionEnd;
                    const text = passwordInput.value;
                    passwordInput.value = text.substring(0, start) + example + text.substring(end);
                    passwordInput.focus();
                    passwordInput.setSelectionRange(start + example.length, start + example.length);
                    // Trigger input event to validate
                    passwordInput.dispatchEvent(new Event('input'));
                }
            });
            
            examplesContainer.appendChild(exampleItem);
        });
        
        ruleElement.appendChild(examplesContainer);
    }
    
    return ruleElement;
}

/**
 * Update the rule status display
 * @param {number} ruleId - The ID of the rule to update
 * @param {boolean} isValid - Whether the rule is valid
 */
function updateRuleStatus(ruleId, isValid) {
    const ruleElement = document.getElementById(`rule-${ruleId}`);
    if (!ruleElement) return;
    
    const statusElement = ruleElement.querySelector('.rule-status');
    const rulesContainer = document.querySelector('.rules-container');
    
    if (!statusElement || !rulesContainer) return;
    
    // Remove previous status classes
    ruleElement.classList.remove('success', 'error');
    statusElement.classList.remove('rule-status-success', 'rule-status-error');
    
    // Update with new status
    if (isValid) {
        ruleElement.classList.add('success');
        statusElement.classList.add('rule-status-success');
        statusElement.textContent = '✓';
        // Move to bottom
        rulesContainer.appendChild(ruleElement);
    } else {
        ruleElement.classList.add('error');
        statusElement.classList.add('rule-status-error');
        statusElement.textContent = '✗';
        // Move to top
        rulesContainer.insertBefore(ruleElement, rulesContainer.firstChild);
    }
}

/**
 * Update the character count display
 * @param {number} count - The current character count
 */
function updateCharCount(count) {
    const charCountElement = document.querySelector('.char-count');
    if (charCountElement) {
        charCountElement.textContent = count;
    }
}

/**
 * Show the win screen
 */
function showWinScreen() {
    const winScreen = document.querySelector('.win-screen');
    if (winScreen) {
        winScreen.classList.remove('hidden');
    }
}

/**
 * Reset the game
 */
function resetGame() {
    // Clear password input
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.value = '';
        passwordInput.dispatchEvent(new Event('input'));
    }
    
    // Hide win screen
    const winScreen = document.querySelector('.win-screen');
    if (winScreen) {
        winScreen.classList.add('hidden');
    }
    
    // Clear rules container
    const rulesContainer = document.querySelector('.rules-container');
    if (rulesContainer) {
        rulesContainer.innerHTML = '';
    }
    
    // Reset game state
    currentRuleIndex = 0;
    activeRules = [];
    gameWon = false;
    
    // Reinitialize game
    initializeGame();
}