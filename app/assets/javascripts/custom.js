$(function () {
    var hasEmptySpace = function($box) {
        console.log("text is " + $box.find('.text-holder').text());
        return($box.find('.text-holder').is(':empty'));
    };

    var moveIfEmpty = function($boxOriginal, $boxFuture) {
        console.log("moveIfEmpty contents");
        console.log("move " + $boxOriginal.text() + " to " + $boxFuture);
        console.log($($boxFuture).find('.text-holder'));
        if (hasEmptySpace($boxFuture)) {
             console.log("SHOULD MOVE");
            $boxFuture.find('.text-holder').append($boxOriginal.find('.text-holder').text());
            $boxOriginal.find('.text-holder').empty();
        }
    };

    $(document).on('click', '.col', function(e) {
        var $boxInQuestion = false,
            $this          = $(this),
            thisRow        = $this.data('row'),
            thisCol        = $this.data('col');

        if (thisRow > 1) {
            // Check above
            $boxInQuestion =  $('.row-' + (thisRow - 1) + '.col-' + thisCol);
            console.log("above being empty is " + hasEmptySpace($boxInQuestion));
            moveIfEmpty($this, $boxInQuestion);
        }

        if (thisRow < 4) {
            // Check below
            $boxInQuestion =  $('.row-' + (thisRow + 1) + '.col-' + thisCol);
            console.log("below being empty is " + hasEmptySpace($boxInQuestion));
            moveIfEmpty($this, $boxInQuestion);
        }

        if (thisCol > 1) {
            // Check to the left
            $boxInQuestion =  $('.row-' + thisRow + '.col-' + (thisCol - 1));
            console.log("left being empty is " + hasEmptySpace($boxInQuestion));
            moveIfEmpty($this, $boxInQuestion);
        }

        if (thisCol < 4) {
            // Check to the right
            $boxInQuestion =  $('.row-' + thisRow + '.col-' + (thisCol + 1));
            console.log("right being empty is " + hasEmptySpace($boxInQuestion));
            moveIfEmpty($this, $boxInQuestion);
        }
    });


    for (var row = 1; row <= 4; row++) {
        for (var col = 1; col <= 4; col++) {
            if ((row !== 4) || (col !== 4)) {
                var rowClass         = ".row-" + row,
                    colClass         = ".col-" + col,
                    rowColTextHolder = rowClass + " " + colClass + " > .text-holder";
                $(rowColTextHolder).html(row + " " + col);
            }
        }
    }
});

// Functions

