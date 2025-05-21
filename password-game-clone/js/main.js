/**
 * Main application logic for The Password Game
 */

// Game state
let currentRuleIndex = 0;
let activeRules = [];
let gameWon = false;

// Initialize the game
function initializeGame() {
    // Add the first rule
    addNextRule();
    
    // Set up event listeners
    setupEventListeners();
}

// Add the next rule to the game
function addNextRule() {
    if (currentRuleIndex >= rules.length) {
        return; // No more rules to add
    }
    
    const rule = rules[currentRuleIndex];
    activeRules.push(rule);
    
    // Create rule element
    const ruleElement = createRuleElement(rule, currentRuleIndex);
    const rulesContainer = document.querySelector('.rules-container');
    if (rulesContainer) {
        rulesContainer.appendChild(ruleElement);
    }
    
    // Validate rule with current password
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        const password = passwordInput.value;
        const isValid = validateRule(rule, password);
        updateRuleStatus(rule.id, isValid);
    }
    
    // Increment rule index
    currentRuleIndex++;
}

// Check if all active rules are valid
function checkAllRules(password) {
    let allValid = true;
    
    activeRules.forEach(rule => {
        const isValid = validateRule(rule, password);
        updateRuleStatus(rule.id, isValid);
        
        if (!isValid) {
            allValid = false;
        }
    });
    
    return allValid;
}

// Update rules that have dynamic content
function updateDynamicRules() {
    activeRules.forEach(rule => {
        if (rule.dynamicContent) {
            // Update rule description for dynamic rules
            const ruleElement = document.getElementById(`rule-${rule.id}`);
            if (ruleElement) {
                const contentElement = ruleElement.querySelector('.rule-content');
                if (contentElement) {
                    contentElement.textContent = typeof rule.description === 'function' ? rule.description() : rule.description;
                }
            }
        }
    });
}

// Handle password input changes
function handlePasswordChange(event) {
    const password = event.target.value;
    
    // Update character count
    updateCharCount(password.length);
    
    // Check all active rules
    const allValid = checkAllRules(password);
    
    // If all rules are valid and we haven't added all rules yet, add the next rule
    if (allValid && currentRuleIndex < rules.length && !gameWon) {
        setTimeout(addNextRule, 500); // Add a small delay for better UX
    }
    
    // Check if the game is won (all rules are valid and all rules have been added)
    if (allValid && currentRuleIndex >= rules.length && !gameWon) {
        gameWon = true;
        setTimeout(showWinScreen, 1000); // Delay to show the win screen
    }
}

// Set up event listeners
function setupEventListeners() {
    // Password input event
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', throttle(handlePasswordChange, 300));
    }
    
    // Reset game button
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.addEventListener('click', resetGame);
    }
    
    // Update dynamic rules periodically
    setInterval(function() {
        if (!gameWon) {
            updateDynamicRules();
            // Re-validate password against updated rules
            const passwordInput = document.getElementById('password');
            if (passwordInput) {
                const password = passwordInput.value;
                checkAllRules(password);
            }
        }
    }, 5000); // Update every 5 seconds
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGame);