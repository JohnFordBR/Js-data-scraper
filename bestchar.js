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
        getbestactorarr(chararr);
         readstararr();
    });

function getbestactorarr(arr)
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
        stararr.sort(function(a,b){
          return a[1] - b[1];
        });
    }
function readstararr()
  {
    for(let i in stararr)
    {
      if(stararr[i][1]>=3)
      {
        console.log(stararr[i]);
      }
    }
  }
