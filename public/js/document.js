
$(document).ready(function() {

    // Some variables
    var timer = null;

    // Functions declaration
    function resize() {

        $("#txt").height($(window).height());
        $("#txt").width($(window).width());
    }

    function save() {

        timer = null;

        $.ajax({
            type: "PUT",
            url: window.location.pathname,
            data: { title: $("#title").data("title"), content: $("#txt").val() }
        }).success(function() {
            $("#status-ko").hide();
            $("#status-ok").show();
        }).error(function() {
            $("#status-ok").hide();
            $("#status-ko").show();
        });
    }

    function scheduleSave() {
        if (timer) { return; }
        timer = setTimeout(save, 1000);
    }

    // Init tooltip
    $("#status-ko").tooltip({title: 'Not synchronized', placement: 'bottom', trigger: 'hover'});

    // Bind events
    $("#txt").keypress(scheduleSave);
    $("#txt").change(scheduleSave);
    $("#txt").bind('cut paste', scheduleSave);

    // Change color scheme
    $(".toolbar-color").click(function(e) {
        var color = $(e.target).data("color") || $(e.target).parent('a').data("color");
        $("#txt").removeClass('dark light').addClass(color);
    });

    // Change font size
    $(".toolbar-font").click(function(e) {
        var size = $(e.target).data("size") || $(e.target).parent('a').data("size");
        $("#txt").removeClass('small normal large').addClass(size);
    });

    // Resize textarea
    $(window).resize(resize);
    resize();
});