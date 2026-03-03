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
// Taken from SitePoint.com and check for results to avoid exception
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
}


// Build array of page numbers for pagination
function getPagination(currentPage)
{
    var paginationArray = new Array();

    if(currentPage != 1)
    {
        aPaginationObject = {label: "Previous", index: currentPage - 1};
        paginationArray.push(aPaginationObject);
    }
    /*else
    {
        aPaginationObject = {label: "Previous", index: currentPage };
        paginationArray.push(aPaginationObject);            
    }*/

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
    /*else
    {
        var indexValue = +currentPage;
        aPaginationObject = {label: 'Next', index: indexValue};
        paginationArray.push(aPaginationObject);            
    }*/
    return paginationArray;
}

// Print out values from pagination array
function printPagination(currentPage)
{
    var paginationArr = getPagination(currentPage);
    var paginationArrCount = paginationArr.length;

    //var out='<nav aria-label="Page navigation">';
    var out='';            

    if (paginationArrCount > 0 )
    {
        //out += '<ul class="pagination justify-content-end">';
        var aPaginationObject;
        //var j=1;

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
        //out += "</ul></nav>";

        document.getElementById("pagination").innerHTML = out;
    }
}

// Print data (json) to page
function printData(data)
{
    var jsonData = JSON.parse(data);
    //const myObj = jsonData.rates;
    const myObj = jsonData;
    
    let text = "";
    let valueCurrValue = "";

    var out = "";
    var i;

    /*
    out += '<table class="table table-hover">';
    out += '<thead class="thead-light">';
    out += "<tr>";
    out += //'<th >Post id</th>' +
        '<th>ID</th>' +
        '<th>Currency</th>' +
        '<th>Value</th>';
    out += '</tr>';
    out += '</thead>';
    */

    var counter = (urlParamPage-1) * urlParamLimit;

    for (const keyCurr in myObj)
    {            
        counter++;
        out += "<tr>";
        //out += '<td>' + ( counter<10 ? "0"+counter : counter ) + '</td>';
        out += '<td>' + keyCurr + '</td>' +
        '<td>' + myObj[keyCurr][0] + '</td>' +
        '<td>' + myObj[keyCurr][1] + '</td>';
        out += "</tr>";       
    }
    //out += "</table>";

    document.getElementById("tableData").innerHTML = out;
}

// Make API call as soon as the HTML is ready
$(document).ready(function()
{
    //alert("test");

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

    //$("#form-select-currency").on("click", { url: urlComplete }, getJson);
    $("#form-select-currency").on("change", { arg: document.getElementById("form-select-currency").value }, setBaseCurrency);

});

function setBaseCurrency(evt)
{
    console.log("evt: " + evt.data.arg);

    var selectedItem = $('#form-select-currency').val();

    console.log("selectedItem: " + selectedItem);

    valueOfSelectElement = selectedItem;
    //var selectElement = document.getElementById("form-select-currency");
    //var valueOfSelectElement = selectElement.value;        
    //var text = e.options[e.selectedIndex].text;
}