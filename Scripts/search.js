var main = function(){
    
        var searchAPIKey = "0a37f1bc41faaf3db26da6005371e78c:15:71605180",
        searchKeyword = "",
        beginDate = "",
        endDate = "",
        sort = "";
    
        $(".userInput button").on("click", function(event){
            returnSearchData();
        });


var returnSearchData = function () {
            $("main .returnedData").empty();
            searchKeyword = $("#keyword").val();
            beginDate = $("#startYear").val()+$("#startMonth").val()+"01";
            endDate = $("#endYear").val()+$("#endMonth").val()+"01";
            sort = $("#sortOrder").val();
            
            console.log(beginDate,endDate);
            
            $.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?&             q="+searchKeyword+"&sort="+sort+"&begin_date="+beginDate+"&end_date="+endDate+"&callback=sv c_search_v2_articlesearch&api-key="+searchAPIKey, function (data) {
                
                var retrievedData = data.response.docs;    
        
                for (var i = 0; i < retrievedData.length; i++){
                    console.log(retrievedData[i]);
                    var leadParagraph = "",
                        title = "",
                        url = "",
                        $newsArticle = $("<article>"),
                        $titleDiv = $("<div class = \"title\"></div>"),
                        $abstractDiv = $("<div class = \"abstract\"></div>"),
                        $linkDiv = $("<div class = \"link\"</div>");

                        $($newsArticle).append($titleDiv);
                        $($newsArticle).append($abstractDiv);
                        $($newsArticle).append($linkDiv);

                        title = retrievedData[i].headline.main;
                        $("<h3>"+title+"</h3>").appendTo($titleDiv);


                        leadParagraph = retrievedData[i].lead_paragraph;
                        $("<p>"+leadParagraph+"</p>").appendTo($abstractDiv);

                        url = retrievedData[i].web_url;
                        $("<a href="+url+">Link to article</a>").appendTo($linkDiv);

                        $(".returnedData").append($newsArticle);                    
                    
                }
        
        });
        
    };
};
$(document).ready(main);
