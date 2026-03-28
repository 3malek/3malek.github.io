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

var hopeThisWorks;

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
    //console.log( "data..." );
    //console.log( data );

    var jsonData = JSON.parse(data);

    //console.log( "jsonData..." );
    //console.log( jsonData );

    const timestampRates = jsonData.timestamp;

    // Source - https://stackoverflow.com/a/24170950
    // Posted by Denys Séguret
    // Retrieved 2026-03-12, License - CC BY-SA 3.0
    var asOfDate = new Date(timestampRates * 1000);

    //document.getElementById("subTitle").innerHTML = 'for GBP (as of ' +  asOfDate.toISOString().substring(0, 10) + ')';
    document.getElementById("subTitle").innerHTML = 'rates (as of ' +  asOfDate.toISOString().substring(0, 10) + ')';

    const ratesObj = jsonData.rates;

    console.log( "ratesObj..." );
    console.log( ratesObj );

    var out = "";
    var counter = (urlParamPage-1) * urlParamLimit;

    for (const keyCurrrency in ratesObj)
    {
        var changeSymbol = "<span style='color:darkblue'>&#9632</span>";
        if (ratesObj[keyCurrrency][2] == 'u')
        {
            changeSymbol = "<span style='color:green'>&#9650;</span>";
        }
        else if (ratesObj[keyCurrrency][2] == 'd')
        {
            changeSymbol = "<span style='color:darkred'>&#9660</span>";
        }
        counter++;
        out += "<tr>";
        out +=
        '<td>' + changeSymbol + '</td>' +
        '<td>' + keyCurrrency + '</td>' +
        '<td>' + ratesObj[keyCurrrency][0] + '</td>' +
        '<td>' + ratesObj[keyCurrrency][1] + '</td>' +
        '';
        out += "</tr>";
    }
    document.getElementById("tableData").innerHTML = out;

    setGraphVariables(jsonData);
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
        .then((result) =>
        {
            //console.log("result: " + result);

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

function setGraphVariables(javascriptObject)
{
    const graphDataBtc = deriveChartValues(javascriptObject, "BTC", 1);
    const graphDataXau = deriveChartValues(javascriptObject, "XAU", 1);
    const graphDataXag = deriveChartValues(javascriptObject, "XAG", 1);
    const graphDataXpt = deriveChartValues(javascriptObject, "XPT", 1);
    const graphDataUsd = deriveChartValues(javascriptObject, "USD", 1);
    const graphDataEur = deriveChartValues(javascriptObject, "EUR", 1);
    const graphDataChf = deriveChartValues(javascriptObject, "CHF", 1);

    chartValues(graphDataBtc, graphDataXau, graphDataXag, graphDataXpt, graphDataUsd, graphDataEur, graphDataChf);
}

function deriveChartValues(javascriptObject, currencyCode, rateOrValue)
{
    const ratesTodayObj = javascriptObject.rates;
    const ratesYesterdayObj = javascriptObject.yesterday;
    const ratesDaysBeforeObj2 = javascriptObject.daysBefore2;
    const ratesDaysBeforeObj3 = javascriptObject.daysBefore3;
    const ratesDaysBeforeObj4 = javascriptObject.daysBefore4;

    const rateTodayArray = ratesTodayObj[currencyCode];
    const valueToday = rateTodayArray[rateOrValue];

    const rateYesterdayArray = ratesYesterdayObj[currencyCode];
    const valueYesterday = rateYesterdayArray[rateOrValue];

    const rateDaysBefore2Array = ratesDaysBeforeObj2[currencyCode];
    const valueDaysBefore2 = rateDaysBefore2Array[rateOrValue];

    const rateDaysBefore3Array = ratesDaysBeforeObj3[currencyCode];
    const valueDaysBefore3 = rateDaysBefore3Array[rateOrValue];

    const rateDaysBefore4Array = ratesDaysBeforeObj4[currencyCode];
    const valueDaysBefore4 = rateDaysBefore4Array[rateOrValue];

    const graphData = [valueDaysBefore4, valueDaysBefore3, valueDaysBefore2, valueYesterday, valueToday];

    return graphData;
}