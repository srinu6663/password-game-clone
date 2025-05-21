/**
 * Utility functions for The Password Game
 */

// DOM element selection helper
function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }

// Create an HTML element with attributes and content
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else {
            element.setAttribute(key, value);
        }
    });
    
    // Set content
    if (content) {
        element.innerHTML = content;
    }
    
    return element;
}

// Check if a string contains a valid emoji
function containsEmoji(str) {
    // Regex pattern for emoji ranges
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(str);
}

// Check if a string is a palindrome
function isPalindrome(str) {
    // Remove spaces and non-alphanumeric characters
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// Check if a number is a palindrome
function isNumberPalindrome(num) {
    const strNum = num.toString();
    return strNum === strNum.split('').reverse().join('');
}

// Find all palindrome numbers in a string
function findPalindromeNumbers(str) {
    // Match sequences of 2 or more digits
    const numberMatches = str.match(/\d{2,}/g) || [];
    return numberMatches.filter(num => isNumberPalindrome(num));
}

// Extract all Roman numerals from a string
function extractRomanNumerals(password) {
  const matches = password.match(/[IVXLCDM]+/gi) || [];
  return matches.filter(isValidRomanNumeral);
}

function isValidRomanNumeral(str) {
  str = str.toUpperCase();
  return /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(str);
}
// Convert Roman numeral to decimal
function romanToDecimal(roman) {
    const romanMap = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };
    
    // Validate input
    if (!roman || typeof roman !== 'string') return 0;
    
    const upperRoman = roman.toUpperCase();
    if (!/^[IVXLCDM]+$/.test(upperRoman)) return 0;
    
    let result = 0;
    let prevValue = 0;
    
    for (let i = upperRoman.length - 1; i >= 0; i--) {
        const current = romanMap[upperRoman[i]];
        if (current >= prevValue) {
            result += current;
        } else {
            result -= current;
        }
        prevValue = current;
    }
    
    return result;
}

// Check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    
    return true;
}

// Find all two-digit prime numbers in a string
function findTwoDigitPrimes(str) {
    // Match all 2-digit numbers
    const matches = str.match(/\b\d{2}\b/g) || [];
    return matches.filter(num => isPrime(parseInt(num, 10)));
}

// Calculate sum of ASCII values for a string
function calculateAsciiSum(str) {
    return Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

// Throttle function to limit function execution
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

// Function to create and display a notification
function showNotification(message, type = 'info') {
    const notification = createElement('div', {
        className: `notification notification-${type}`
    }, message);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Extract HTML tags from a string
function extractHtmlTags(str) {
    const tagRegex = /<\/?[a-z][\s\S]*?>/gi;
    return str.match(tagRegex) || [];
}

// Function to check if a string contains a face-like symbol
function containsFace(str) {
    const faceRegex = /[:;][-~]?[)D(]/;
    const japaneseStyleFace = /\([^)]*\)/;
    const textFaces = ['¯\\_(ツ)_/¯', '(╯°□°）╯︵ ┻━┻', 'ಠ_ಠ', '( ͡° ͜ʖ ͡°)'];
    
    return faceRegex.test(str) || 
           japaneseStyleFace.test(str) || 
           textFaces.some(face => str.includes(face));
}

function getRuleDescription(rule) {
    if (typeof rule.description === 'function') {
        return rule.description();
    }
    return rule.description;
}

function validateRule(rule, password) {
    return rule.validate(password);
}
