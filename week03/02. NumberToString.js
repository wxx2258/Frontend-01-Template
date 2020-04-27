function NumerToString(number, x = 10) {
    var integer = Math.floor(number);
    var fraction = number - integer;
    var string = '';

    while(integer > 0) {
        string = integer % x + string;
        integer = Math.floor(integer / x);
    }

    return string;
}
console.log(NumerToString(12.32))