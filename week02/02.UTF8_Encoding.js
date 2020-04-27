/**
 * 思路：
 *
 */

/**
 * @param {string} str
 * @return {Array}
 */
function utf8Encoding(str) {
    var charToUtf8 = function (char) {
        const binary = char.codePointAt().toString(2);
        if (binary.length < 8) {
            return binary.padStart(8, '0');
        }
        const headers = ['0', '110', '1110', '11110'];
        const sequence = [];
        for (let end = binary.length; end > 0; end -= 6) {
            const sub = binary.slice(Math.max(end - 6, 0), end);

            if (sub.length === 6) {
                sequence.unshift(`10${sub}`);
            } else {
                const header = headers[sequence.length];
                sequence.unshift(`${header}${sub.padStart(8 - header.length, '0')}`);
            }
        }
        return sequence.join('');
    }
    return Array.from(str).map((char) => {
        return charToUtf8(char)
    });
}

console.log(utf8Encoding('严'));
console.log(utf8Encoding('厉害'));