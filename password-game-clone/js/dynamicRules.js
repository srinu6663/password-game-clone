/**
 * Dynamic rules functionality for The Password Game
 * These functions generate dynamic rule content based on real-world data
 */

// Get current moon phase emoji
function getMoonPhaseEmoji() {
    const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
    const synodicMonth = 29.530588853; // Average length of a synodic month in days
    const newMoon = new Date("2001-01-24T13:00:00Z"); // Known new moon date
    const today = new Date();
    const daysSince = (today - newMoon) / (1000 * 60 * 60 * 24);
    const phaseIndex = Math.floor((daysSince % synodicMonth) / (synodicMonth / 8)) % 8;
    return moonPhases[phaseIndex];
}

// Get today's date in reverse format
function getReversedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    return `${month}-${day}-${year}`.split('').reverse().join('');
}

// Get the current hour in 24-hour format
function getCurrentHour() {
    return new Date().getHours();
}

// Get today's day of the week
function getCurrentDayOfWeek() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
}

// Get the current year
function getCurrentYear() {
    return new Date().getFullYear();
}

// Generate a random math expression
function generateMathExpression() {
    const operators = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let result;
    switch(operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
    }
    
    return {
        expression: `${num1}${operator}${num2}`,
        result: result
    };
}

// Get user agent length
function getUserAgentLength() {
    return navigator.userAgent.length;
}

// Get browser tab title
function getBrowserTabTitle() {
    return document.title;
}

// Get first letter of each word in a string
function getFirstLettersOfWords(text) {
    return text.split(' ')
               .filter(word => word.length > 0)
               .map(word => word[0])
               .join('');
}

// Simulate getting today's Wordle answer
// In a real implementation, this would use an API or pre-scraped data
function getTodaysWordleWord() {
    // List of potential 5-letter Wordle words
    const wordleWords = [
        'APPLE', 'BRAVE', 'CRATE', 'DWARF', 'EAGLE', 
        'FLAME', 'GRAPE', 'HOTEL', 'IGLOO', 'JUMBO', 
        'KAYAK', 'LEMON', 'MUSIC', 'NOBLE', 'OCEAN', 
        'PIANO', 'QUARK', 'ROBOT', 'SOLAR', 'TIGER'
    ];
    
    // Use the current date to pick a consistent word for each day
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const dateHash = Array.from(dateString).reduce((hash, char) => {
        return (hash * 31 + char.charCodeAt(0)) % 1000000;
    }, 0);
    
    return wordleWords[dateHash % wordleWords.length].toLowerCase();
}

// Simulate getting today's news headline
// In a real implementation, this would use a news API
function getTodaysNewsHeadline() {
    // List of potential news headlines
    const headlines = [
        'Global Leaders Meet to Address Climate Change',
        'New Technology Breakthrough Promises Clean Energy',
        'Scientists Discover Potential Cure for Common Disease',
        'Space Agency Announces Mission to Distant Planet',
        'Economic Growth Exceeds Expectations in First Quarter',
        'Major Sports Team Wins Championship in Dramatic Fashion',
        'Award-Winning Film Opens to Critical Acclaim',
        'Tech Company Unveils Revolutionary New Product',
        'Researchers Find New Species in Remote Location',
        'Historic Peace Agreement Signed Between Nations'
    ];
    
    // Use the current date to pick a consistent headline for each day
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const dateHash = Array.from(dateString).reduce((hash, char) => {
        return (hash * 31 + char.charCodeAt(0)) % 1000000;
    }, 0);
    
    const headline = headlines[dateHash % headlines.length];
    return {
        headline: headline,
        firstLetters: getFirstLettersOfWords(headline)
    };
}

// Lists of common items for rules
const fruitList = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'mango', 'orange', 'peach', 'pear', 'plum', 'strawberry', 'watermelon'];
const animalList = ['cat', 'dog', 'wolf', 'lion', 'tiger', 'bear', 'fox', 'deer', 'frog', 'fish', 'bird', 'snake', 'mouse', 'rabbit'];
const romanNumeralList = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XV', 'XX', 'L', 'C', 'D', 'M'];
const twoDigitPrimes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const htmlTags = ['&lt;div&gt;', '&lt;span&gt;', '&lt;p&gt;', '&lt;h1&gt;', '&lt;a&gt;', '&lt;img&gt;', '&lt;ul&gt;', '&lt;li&gt;', '&lt;form&gt;', '&lt;input&gt;'];
const faceSymbols = [':)', ':(', ';)', ':D', ':-)', ':-(', ';-)', '(⌒‿⌒)', '¯\\_(ツ)_/¯', 'ʕ•ᴥ•ʔ'];