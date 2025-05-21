/**
 * Rules definitions for The Password Game
 */

const rules = [
    // Basic Rules (1-4)
    {
        id: 1,
        description: "Your password must be at least 5 characters long.",
        validate: (password) => password.length >= 5
    },
    {
        id: 2,
        description: "Your password must include a number.",
        validate: (password) => /\d/.test(password)
    },
    {
        id: 3,
        description: "Your password must include an uppercase letter.",
        validate: (password) => /[A-Z]/.test(password)
    },
    {
        id: 4,
        description: "Your password must include a special character (e.g., !, @, #).",
        validate: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        visual: "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?"
    },

    // Intermediate Rules (5-16)
    {
        id: 5,
        description: "All digits in your password must add up to 25.",
        validate: (password) => {
            const digits = password.match(/\d/g) || [];
            return digits.reduce((sum, digit) => sum + parseInt(digit), 0) === 25;
        }
    },
    {
        id: 6,
        description: "Your password must include a month name (e.g., March, October).",
        validate: (password) => {
            const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                          'july', 'august', 'september', 'october', 'november', 'december'];
            return months.some(month => password.toLowerCase().includes(month));
        },
        examples: ['January', 'March', 'October', 'December']
    },
    {
        id: 7,
        description: "Your password must include a Roman numeral (e.g., IV, X, IX).",
        validate: (password) => {
            const romanNumerals = extractRomanNumerals(password);
            return romanNumerals.length > 0;
        },
        examples: ['IV', 'X', 'IX', 'L', 'C']
    },
    {
        id: 8,
        description: "Your password must include a sponsor name (Pepsi, Starbucks, or Shell).",
        validate: (password) => {
            const sponsors = ['pepsi', 'starbucks', 'shell'];
            return sponsors.some(sponsor => password.toLowerCase().includes(sponsor));
        },
        examples: ['Pepsi', 'Starbucks', 'Shell']
    },
    {
        id: 9,
        description: "The product of all Roman numerals in your password must equal 35.",
        validate: (password) => {
            const romanNumerals = extractRomanNumerals(password);
            if (romanNumerals.length === 0) return false;
            const product = romanNumerals.reduce((prod, rn) => prod * romanToDecimal(rn), 1);
            return product === 35;
        }
    },
    {
        id: 10,
        description: "Your password must include a valid hex color code (e.g., #FF5733).",
        validate: (password) => {
            const hexRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/;
            return hexRegex.test(password);
        },
        examples: ['#FF0000', '#00FF00', '#0000FF', '#abc', '#123456']
    },
    {
        id: 11,
        description: "Your password must include a periodic table element symbol (e.g., Na, Fe).",
        validate: (password) => {
            const elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'];
            return elements.some(element => password.includes(element));
        },
        examples: ['Na', 'Fe', 'Au', 'Ag', 'Cu']
    },
    {
        id: 12,
        description: () => `Your password must include today's moon phase emoji: ${getMoonPhaseEmoji()}`,
        validate: (password) => password.includes(getMoonPhaseEmoji()),
        dynamicContent: true
    },
    {
        id: 13,
        description: "Your password must include a leap year (e.g., 2024, 2000).",
        validate: (password) => {
            const leapYears = ['2000', '2004', '2008', '2012', '2016', '2020', '2024'];
            return leapYears.some(year => password.includes(year));
        },
        examples: ['2000', '2004', '2020', '2024']
    },
    {
        id: 14,
        description: "Your password must include a chess move notation (e.g., Nf3, e4).",
        validate: (password) => {
            const chessMoves = ['e4', 'd4', 'Nf3', 'Nc3', 'Bc4', 'Bf4', 'O-O', 'O-O-O'];
            return chessMoves.some(move => password.includes(move));
        },
        examples: ['e4', 'Nf3', 'Bc4', 'O-O']
    },

    // Advanced Rules (17-30)
    {
        id: 15,
        description: "Your password must include 'I am loved', 'I am worthy', or 'I am enough'.",
        validate: (password) => {
            const affirmations = ['I am loved', 'I am worthy', 'I am enough'];
            return affirmations.some(affirmation => password.includes(affirmation));
        },
        examples: ['I am loved', 'I am worthy', 'I am enough']
    },
    {
        id: 16,
        description: "Your password must include a banned letter that you can never use again.",
        validate: (password) => {
            const bannedLetters = getBannedLetters();
            return bannedLetters.some(letter => password.includes(letter));
        },
        dynamicContent: true
    },
    {
        id: 17,
        description: "All vowels in your password must be bold.",
        validate: (password) => {
            const vowels = password.match(/[aeiouAEIOU]/g) || [];
            return vowels.every(vowel => password.includes(`<b>${vowel}</b>`));
        }
    },
    {
        id: 18,
        description: "Your password must have twice as many italic characters as bold characters.",
        validate: (password) => {
            const boldCount = (password.match(/<b>.*?<\/b>/g) || []).length;
            const italicCount = (password.match(/<i>.*?<\/i>/g) || []).length;
            return italicCount === boldCount * 2;
        }
    },
    {
        id: 19,
        description: "Your password must include a color hex code (e.g., #FF5733).",
        validate: (password) => {
            const hexRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/;
            return hexRegex.test(password);
        },
        examples: ['#FF0000', '#00FF00', '#0000FF']
    },
    {
        id: 20,
        description: "Your password length must be a prime number.",
        validate: (password) => isPrime(password.length)
    },
    {
        id: 21,
        description: "Your password must include its own length (e.g., 'length=30').",
        validate: (password) => {
            const length = password.length;
            return password.includes(`length=${length}`);
        }
    },
    {
        id: 22,
        description: "Your password must include the current time in HH:MM format.",
        validate: (password) => {
            const now = new Date();
            const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            return password.includes(time);
        },
        dynamicContent: true
    },
    {
        id: 23,
        description: "Your password must include a hidden rule that's not visible until broken.",
        validate: (password) => {
            // This is a meta-rule that's always true, but the UI will show it as broken
            // until the user discovers the hidden rule
            return true;
        },
        hidden: true
    },
    {
        id: 24,
        description: "Your password must intentionally break one of the previous rules.",
        validate: (password) => {
            // This rule is always true, but the UI will show it as broken
            // until the user intentionally breaks a previous rule
            return true;
        },
        reverse: true
    }
];

// Helper function to get banned letters
function getBannedLetters() {
    return ['e', 't', 'a', 'o', 'i', 'n', 's', 'h', 'r', 'd', 'l', 'c', 'u', 'm', 'w', 'f', 'g', 'y', 'p', 'b', 'v', 'k', 'j', 'x', 'q', 'z'];
}

// Helper function to get moon phase emoji
function getMoonPhaseEmoji() {
    const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    const date = new Date();
    const phase = Math.floor((date.getDate() / 29.5) * 8) % 8;
    return phases[phase];
}

// Helper function to check if a number is prime
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