define([], function () {
    return {
        page: 1,
        offset: 25,
        init: function () {
            var that = this;
            $.getJSON("/photo/output.json", function (data) {
                that.render(that.page, data);

                that.scroll(data);
            });
        },

        render: function (page, data) {
            var begin = (page - 1) * this.offset;
            var end = page * this.offset;
            if (begin >= data.length) return;
            var html, li = "";
            for (var i = begin; i < end && i < data.length; i++) {
                var name = data[i].substring(0, data[i].length - 4);
                li += '<li><div class="img-box">' +
                    '<a class="fancybox" rel="article0" title='+ name +' href="http://123.206.207.125/photos/' + data[i] + '?raw=true">' +
                    '<img class="galleryimage" src="http://123.206.207.125/photos/' + data[i] + '?raw=true" />' +
                    '</a>' +
   	   	    '</li>';
            }

            //html = '<section class="archives album">' +
            //    '<ul class="img-box-ul">' + li + '</ul>' +
            //    '</section>';


            $(".img-box-ul").append(li);
            $(".img-box-ul").lazyload();
            $("a[rel=example_group]").fancybox();
        },

        scroll: function (data) {
            var that = this;
            $(window).scroll(function() {
                var windowPageYOffset = window.pageYOffset;
                var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                var sensitivity = 0;

                var offsetTop = $(".instagram").offset().top + $(".instagram").height();

                if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                    that.render(++that.page, data);
                }
            })
        }
    }

})