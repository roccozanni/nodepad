
$(document).ready(function() {

    $(".toolbar-color").click(function(e) {
        var color = $(e.target).data("color") || $(e.target).parent('a').data("color");
        $("#txt").removeClass('dark light').addClass(color);
    });

    $(".toolbar-font").click(function(e) {
        var size = $(e.target).data("size") || $(e.target).parent('a').data("size");
        $("#txt").removeClass('small normal large').addClass(size);
    });

    function resize() {
        $("#txt").height($(window).height());
        $("#txt").width($(window).width());
    }

    $(window).resize(resize);

    resize();
});