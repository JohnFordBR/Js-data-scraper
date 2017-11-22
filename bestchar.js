const jsonfile = require('jsonfile');
let chararr = [];
let stararr = [];
let sendarr = [];
jsonfile.readFile("characters.json", function (err, obj) {
    for (let i in obj.articles) {
        chararr.push(obj.articles[i].title);

    }
    chararr = chararr.sort();
    getbestactorarr(chararr);
    readstararr();
});

function getbestactorarr(arr) {
    let current = arr[0];
    let count = 0;
    for (let i in arr) {
        if (current == arr[i]) {
            count++;
        }
        else {
            stararr.push([current, count]);
            current = arr[i];
            count = 1;
        }
    }
    stararr.sort(function (a, b) {
        return b[1] - a[1];
    });
}
function readstararr() {
    for (let i in stararr) {
        if (stararr[i][1] == 1) {
            sendarr.push({ key: stararr[i][1], name: stararr[i][0] });
        }
        else {
            sendarr.push({ key: stararr[i][1], parent: `${stararr[i][1] - 1}`, name: stararr[i][0] });
        }
    }


    jsonfile.writeFile('gitbook.json', {act: sendarr}, { spaces: 2}, () => {
        //console.error(err);
    });
    console.log(sendarr);
}
