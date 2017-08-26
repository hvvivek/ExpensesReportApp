var monthNames = 
["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

var types = 
[
    "academic",
    "rent",
    "food",
    "personal",
    "books",
    "health"
]

var max_amounts = 
[
    25000,
    8000,
    6000,
    3500,
    3000,
    1600
]

var dataset = [
	{ name: 'IE', percent: 39.10 },
	{ name: 'Chrome', percent: 32.51 },
	{ name: 'Safari', percent: 13.68 },
	{ name: 'Firefox', percent: 8.71 },
	{ name: 'Others', percent: 6.01 }
];






function checkOption(label)
{
    var otherOptions = document.querySelectorAll(".type-input input[type=radio]");
    for(var i=0; i<otherOptions.length; i++)
        {
            otherOptions[i].checked=false;
            document.querySelector('[for="'+otherOptions[i].id+'"]').classList.remove("active");            
        }
    document.getElementById(label.getAttribute("for")).checked = true;
    label.classList.toggle("active");
    var stringSplit = label.getAttribute("for").split("_"); 
    console.log(stringSplit[stringSplit.length-1]);
    var time = new Date();
    var expenseDesc = capitalizeFirstLetter(stringSplit[stringSplit.length-1]) + " expense on " +  time.getDate() + getSuffix(time.getDate()) + " " + monthNames[time.getMonth()];
    document.querySelector("form#new_expense .expense-desc-field").value=expenseDesc;

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getSuffix(num)
{
    var suffix = 'th';
    if( num == 1 || num == 21 || num == 31 )
        {
            console.log("st")
            suffix = "st";
        }
    else if( num == 2 || num == 22 )
        {
            console.log("nd")
            suffix = "nd";
        }
    else if( num == 3 || num == 23 )
        {
            console.log("rd")
            suffix = "rd";
        }

        return suffix;
}


function calculate()
{
    
    var colorArray = [d3.schemeCategory10[0], "#aaaaaa", d3.schemeCategory10[1], "#aaaaaa", d3.schemeCategory10[2], "#aaaaaa", d3.schemeCategory10[3], "#aaaaaa",d3.schemeCategory10[4], "#aaaaaa",d3.schemeCategory10[5], "#aaaaaa"]
    var color = d3.scaleOrdinal(colorArray);    
    var startColor = 0;

    for( var i=0; i<types.length; i++ )
        {
            var amount_used  = 0;
            if( document.querySelector("[for='"+ types[i] +"']") )
                {
                    amount_used = parseInt(document.querySelector("[for='"+ types[i] +"']").innerHTML.substring(1));
                }
            var amount_left = max_amounts[i] - amount_used;

            console.log(amount_used);
            
            var dataset = [
                { label: 'Amount Used', count: amount_used },
                { label: 'Amount Left', count: amount_left },
              ];
              var width = 240;
              var height = 240;
              var radius = Math.min(width, height) / 2;
              var innerRadius = radius - 60;
              


              var svg = d3.select('#chart-'+ types[i] +'')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +
                  ',' + (height / 2) + ')');

              var arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(radius);

              var pie = d3.pie()
                .value(function(d) { return d.count; })
                .sort(null);

              var path = svg.selectAll('path')
                .data(pie(dataset))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', function(d) {
                  return color(startColor++);
                });
        }
        
    
}
