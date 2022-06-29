const { palindrome, average  } = require("../utils/for_testing");

test.skip('Tests on palindrome of midu', () => {
    const result = palindrome('midudev');
    expect(result).toBe('vedudim');
});

test.skip('palindrome of empty string', () => {
    const result = palindrome('');
    expect(result).toBe('');
});

test.skip('palindrome of undefined should be a empty string', () => {
    const result = palindrome();
    expect(result).toBe('');
});