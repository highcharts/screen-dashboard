function initTweets() {
    var $div = $('#pages');
    $.each(tweets, function (i, tweet) {

        var date = Date.parse(tweet.created_at),
            currentDate = +new Date(),
            ago = currentDate - date,
            text = tweet.text;

        // Get time
        if (ago < 3600 * 1000) {
            ago = Math.round(ago / 60000) + ' min ago';
        } else if (ago < 24 * 3600 * 1000) {
            ago = Math.round(ago / (3600 * 1000)) + ' hours ago';
        } else {
            ago = Math.round(ago / (24 * 3600 * 1000)) + ' days ago';
        }

        // Mark up text
        text = text.replace(/(http:\/\/[^\s]+)/gi, '<a href="$1">$1</a>');
        text = text.replace(/@([a-zA-Z_0-9]+)/g, '<a href="http://twitter.com/$1">@$1</a>');
        text = text.replace(/#([a-zA-Z_0-9]+)/g, '<a href="http://twitter.com/search?q=%23$1">#$1</a>');


        $div.append(
            '<div class="page">' + 
            '<div class="page-inner">' + 

            '<div class="header">' +
            '<a href="http://twitter.com/'+ tweet.user.screen_name + '"><strong class="name">' + tweet.user.name + '</strong>' +
            ' <span class="screen-name">@'+ tweet.user.screen_name + '</span></a>' +
            ' <span class="ago">'+ ago + '</span></div>' +
            '<span>' +text + '</span>' +
            '</div>' +
            '</div>'
        );
    });
}

function initPages() {
	var winHeight = $(window).height();
	$('.page').height(winHeight);

	// Slide
    var i = 1;
    setInterval(function () {
    	$('#pages').css({
        	top: -(i % $('.page').length) * winHeight
        });
        
        i++;
    }, 8000);
    
    // Trigger reload from time to time to get new stuff
    setTimeout(function () {
    	window.location.reload();
    }, 15 * 60 * 1000); // 15 minutes
}

$(function () {
    initTweets();
    initPages();
});