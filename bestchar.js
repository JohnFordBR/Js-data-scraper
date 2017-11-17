const jsonfile = require('jsonfile');
let chararr = [];
let stararr = [];
jsonfile.readFile("characters.json", function (err, obj) 
    {
        for(let i in obj.articles)
        {
           chararr.push(obj.articles[i].title);
           
        }
        chararr=chararr.sort();
        getbestactor(chararr);
        console.log(stararr);
    });

function getbestactor(arr)
    {
        let current = arr[0];
        let count = 0;
        for(let i in arr)
        {
            if(current == arr[i])
            {
                count++;
            }
            else
            {
                stararr.push([current,count]); 
                current = arr[i];
                count = 1;              
            }
        }
    }