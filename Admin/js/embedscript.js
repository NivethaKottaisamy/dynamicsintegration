async function initiateAjax(url, type, data, callback) {
    await $.ajax({
        url: url,
        type: type,
        dataType: "json",
        data: data,
        success: function (result) {
            return callback(result, null);
        },
        error: function (err) {
            return callback(null, err);
        }
    });
}
$(function () {
    let pathlocation = window.location.search.substr(1);
    var querystring = pathlocation;

    $('a').each(function () {
        var href = $(this).attr('href');

        if (href) {
            href += (href.match(/\?/) ? '&' : '?') + querystring;
            $(this).attr('href', href);
        }
    });
    var url = $(location).attr('href'),
        parts = url.split("/"),
        last_part = parts[parts.length - 1],
        final_url = last_part.split('?');
        let queryprofileid = querystring.split('=')[1];
        if (final_url[0] == "ProductPerformance") {
            initiateAjax("/viewProductPerformance", "POST", {
                params: queryprofileid
            }, function (data, err) {
                var dt = $('.risk-profile-table').dataTable().api();
                let resultdata='';
                $.each(data,function(index,value){
                dt.row.add($(`<tr><td>${value.ProductID}</td><td>${value.productsname.Name}</td><td>${value.Currentprice}</td><td>${value.Previousday}</td><td>${value.Daychange}</td><td>${value.PercentageChange}</td><td>${value.Performance}</td></tr>`));
                dt.draw();
                })
      
            });
        }
        else if (final_url[0] == "transactions") {
            initiateAjax("/viewTransactions", "POST", {
                params: queryprofileid
            }, function (data, err) {
                var dt = $('.risk-profile-table').dataTable().api();
                let resultdata='';
                $.each(data,function(index,value){
                dt.row.add($(`<tr><td>${value.CustomerID}</td><td>${value.ProductID}</td><td>${value.Quantity}</td><td>${value.Price}</td><td>${value.Action}</td><td>${value.Date}</td></tr>`));
                dt.draw();
                })
      
            });
        }
    else if (final_url[0] == "RiskProfile") {
        initiateAjax("/viewRiskProfile", "POST", {
            params: queryprofileid
        }, function (data, err) {
            var dt = $('.risk-profile-table').dataTable().api();
            let resultdata='';
            $.each(data,function(index,value){
            dt.row.add($(`<tr><td>${value.ClientID}</td><td>${value.RiskCategory}</td><td>${value.From}</td><td>${value.Active}</td><td>${value.Active}</td></tr>`));
            dt.draw();
            })
  
        });

    }else  if (final_url[0] == "holdings") {
        initiateAjax("/viewHoldingProfile", "POST", {
            params: queryprofileid
        }, function (data, err) {
            var dt = $('.risk-profile-table').dataTable().api();
            let resultdata='';
            $.each(data,function(index,value){
            dt.row.add($(`<tr><td>${value.CustomerID}</td><td>${value.ProductID}</td><td>${value.Quantity}</td><td>${value.CurrentPrice}</td><td>${value.MarketValue}</td></tr>`));
            dt.draw();
            })
  
        });

    } else if (final_url[0] == "Profile") {
        
        initiateAjax("/viewProfile", "POST", {
            params: queryprofileid
        }, function (data, err) {
            let profile=data[0];
            if (data) {
                $("div.body").html(`<div class="row clearfix">
            <h2 class="card-inside-title col-sm-6">ClientID</h2>
            <div class="col-sm-6">
                <div class="form-group">
                        <span>${profile.ClientId}</span>
                </div>
            </div>
        </div>
        <div class="row clearfix">
                <h2 class="card-inside-title col-sm-6">Name</h2>
                <div class="col-sm-6">
                    <div class="form-group">
                            <span>${profile.Name}</span>
                    </div>
                </div>
            </div>
            <div class="row clearfix">
                    <h2 class="card-inside-title col-sm-6">Client Type</h2>
                    <div class="col-sm-6">
                        <div class="form-group">
                                <span>${profile.ClientType}</span>
                        </div>
                    </div>
                </div>
                <div class="row clearfix">
                        <h2 class="card-inside-title col-sm-6">Age</h2>
                        <div class="col-sm-6">
                            <div class="form-group">  
                                    <span>${profile.Age}</span>
                            </div>
                        </div>
                    </div>`)
            }
        });
    }
});