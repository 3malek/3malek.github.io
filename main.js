//var urlBaseStr = "http://localhost:8080/api/rates";
var urlBaseStr = "https://fx-dash-rest-api-pid.nw.r.appspot.com/api/rates";
var urlParamLimit = 50;
var urlParamPage = 1;
var totalComments=0;
var currentPageNum = 0;
var perPageInt = 7;
var startInt = 0;
var endInt = 0;
var valueOfSelectElement = "GBP";

// Get the query-string parameters
$.urlParam = function(name)
{
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results)
    {
        return results[1];
    }
    else
    {
        return null;
    }
}// and check for results to avoid exception (SitePoint.com)


// Build array of page numbers for pagination
function getPagination(currentPage)
{
    var paginationArray = new Array();

    if(currentPage != 1)
    {
        aPaginationObject = {label: "Previous", index: currentPage - 1};
        paginationArray.push(aPaginationObject);
    }

    pagesInt = Math.ceil(totalComments / perPageInt);

    for(i = 0; i < pagesInt; i++)
    {
        aPaginationObject = {label: i+1, index: i+1};

        paginationArray.push(aPaginationObject);
    }

    if(currentPage != pagesInt)
    {
        var indexValue = +currentPage + 1;
        aPaginationObject = {label: 'Next', index: indexValue};
        paginationArray.push(aPaginationObject);
    }
    return paginationArray;
}

// Print out values from pagination array
function printPagination(currentPage)
{
    var paginationArr = getPagination(currentPage);
    var paginationArrCount = paginationArr.length;

    var out='';            

    if (paginationArrCount > 0 )
    {
        var aPaginationObject;

        for(i = 0; i < paginationArrCount; i++)
        {
            aPaginationObject = paginationArr[i];

            out += '<li class="page-item">';
            out += '<a class="page-link" href="' +
                    "?_limit="+urlParamLimit+"&_page="+ aPaginationObject.index + '">';
            out += aPaginationObject.label + ' ';

            out += '</a>';
            out +=  '</li>';
        }
        document.getElementById("pagination").innerHTML = out;
    }
}

// Print data (json) to page
function printData(data)
{
    var jsonData = JSON.parse(data);

    const timestampRates = jsonData.timestamp;

    // Source - https://stackoverflow.com/a/24170950
    // Posted by Denys Séguret
    // Retrieved 2026-03-12, License - CC BY-SA 3.0
    var asOfDate = new Date(timestampRates * 1000);

    //document.getElementById("subTitle").innerHTML = 'for GBP (as of ' +  asOfDate.toISOString().substring(0, 10) + ')';
    document.getElementById("subTitle").innerHTML = 'rates (as of ' +  asOfDate.toISOString().substring(0, 10) + ')';

    const myObj = jsonData.rates;
    var out = "";
    var counter = (urlParamPage-1) * urlParamLimit;

    for (const keyCurr in myObj)
    {
        var changeSymbol = "<span style='color:darkblue'>&#9632</span>";
        if (myObj[keyCurr][2] == 'u')
        {
            changeSymbol = "<span style='color:green'>&#9650;</span>";
        }
        else if (myObj[keyCurr][2] == 'd')
        {
            changeSymbol = "<span style='color:darkred'>&#9660</span>";
        }
        counter++;
        out += "<tr>";
        out +=
        '<td>' + changeSymbol + '</td>' +
        '<td>' + keyCurr + '</td>' +
        '<td>' + myObj[keyCurr][0] + '</td>' +
        '<td>' + myObj[keyCurr][1] + '</td>' +
        '';
        out += "</tr>";
    }
    document.getElementById("tableData").innerHTML = out;
}

// Make API call as soon as the HTML is ready
$(document).ready(function()
{
    urlParamLimit = $.urlParam('_limit');
    urlParamPage = $.urlParam('_page');

    if (urlParamLimit == null)
    {
        urlParamLimit = 50;
    }
    if (urlParamPage == null)
    {
        urlParamPage = 1;
    }

    var urlComplete = urlBaseStr + "?_limit="+urlParamLimit+"&_page="+urlParamPage+"&_currency="+valueOfSelectElement;

    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };
    fetch(urlComplete, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);

            //totalComments = 169;//data.length;
            totalComments = 179;//data.length;
            //totalComments = 17;//data.length;
            currentPageNum = urlParamPage;
            perPageInt = urlParamLimit;

            startInt = (currentPageNum - 1) * perPageInt;
            endInt = startInt + perPageInt - 1;

            printPagination(currentPageNum);
            printData(result);
        })
        .catch((error) => console.error(error));
});