function buildName(firstName, lastName) {
    if (lastName)
        return firstName + ' ' + lastName;
    else
        return firstName;
}
var result1 = buildName('Bob');
// let result2 = buildName('Bob', 'Adams', 'Sr.'); // error TS2554: Expected 1-2 arguments, but got 3.
var result3 = buildName('Bob', 'Adams');
