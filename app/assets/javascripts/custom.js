$(function () {
    var findAvailable = function () {
        var movablePieces = [];
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                if ($("[data-col=" + col + "][data-row=" + row + "]").length > 0) {
                    // THE BOX EXISTS
                    $box = $("[data-col=" + col + "][data-row=" + row + "]")[0];
                    if (canMove("[data-col=" + col + "][data-row=" + row + "]").length > 0) {
                        movablePieces.push($box);
                    }
                }
            }
        }

        return movablePieces;
    }

    var canMove = function (identifier) {
        var possibleMoves = [];
        if ($(identifier).attr('data-row') > 0) {
            // Check above
            var nextRow = (parseInt($(identifier).attr('data-row')) - 1),
                nextCol = $(identifier).attr('data-col');
            if (!$("[data-col=" + nextCol + "][data-row=" + nextRow + "]").length > 0) {
                possibleMoves.push(["top", "-=100px"]);
            }

        }

        if ($(identifier).attr('data-row') < 3) {
            // Check below
            var nextRow = (parseInt($(identifier).attr('data-row')) + 1),
                nextCol = $(identifier).attr('data-col');
            if (!$("[data-col=" + nextCol + "][data-row=" + nextRow + "]").length > 0) {
                possibleMoves.push(["top", "+=100px"]);
            }

        }

        if ($(identifier).attr('data-col') > 0) {
            // Check left
            var nextRow = $(identifier).attr('data-row'),
                nextCol = (parseInt($(identifier).attr('data-col')) - 1);
            if (!$("[data-col=" + nextCol + "][data-row=" + nextRow + "]").length > 0) {
                possibleMoves.push(["left", "-=100px"]);
            }

        }

        if ($(identifier).attr('data-col') < 3) {
            // Check right
            var nextRow = $(identifier).attr('data-row'),
                nextCol = (parseInt($(identifier).attr('data-col')) + 1);
            if (!$("[data-col=" + nextCol + "][data-row=" + nextRow + "]").length > 0) {
                possibleMoves.push(["left", "+=100px"]);
            }
        }

        return possibleMoves;
    }

    var lastClicked = $('.box')[0];
    var randomizeBoard = function () {

        for (var i = 0; i < 60; i++) {
            var movable = findAvailable();
            movable = shuffleArray(movable);
            if (lastClicked == movable[0]) {
                $(movable[1]).click();
                lastClicked = movable[1];
            } else {
                $(movable[0]).click();
                lastClicked = movable[0];
            }
        }
    };

    $(document).on('click', '.box', function (e) {
        var changed = false;

        if ($(this).attr('data-row') > 0 && !changed) {
            // Check above
            var nextRow = (parseInt($(this).attr('data-row')) - 1),
                nextCol = $(this).attr('data-col');
            if (!$("[data-col=" + nextCol + "][data-row=" + nextRow + "]").length > 0) {
                $(this).animate({ "top": '-=100px' }, 1000, function () {
                    checkIfWin();
                })
                changed = true;
            }

        }

        if ($(this).attr('data-row') < 3 && !changed) {
            // Check below
            var nextRow = (parseInt($(this).attr('data-row')) + 1),
                nextCol = $(this).attr('data-col');
            if (!$("[data-col=" + nextCol + "][data-row=" + nextRow + "]").length > 0) {
                $(this).animate({ "top": '+=100px' }, 1000, function () {
                    checkIfWin();
                }) // Move box down
                changed = true;
            }

        }

        if ($(this).attr('data-col') > 0 && !changed) {
            // Check left
            var nextRow = $(this).attr('data-row'),
                nextCol = (parseInt($(this).attr('data-col')) - 1);
            if (!$("[data-col=" + nextCol + "][data-row=" + nextRow + "]").length > 0) {
                console.log("Left does not exist.");
                $(this).animate({ "left": '-=100px' }, 1000, function () {
                    checkIfWin();
                }) // Move box down
                changed = true;
            }

        }

        if ($(this).attr('data-col') < 3 && !changed) {
            // Check right
            var nextRow = $(this).attr('data-row'),
                nextCol = (parseInt($(this).attr('data-col')) + 1);
            if (!$("[data-col=" + nextCol + "][data-row=" + nextRow + "]").length > 0) {
                $(this).animate({ "left": '+=100px' }, 1000, function () {
                    checkIfWin();
                }) // Move box down
                changed = true;
            }
        }

        if (changed) {
            $(this).attr('data-row', nextRow);
            $(this).attr('data-col', nextCol);
            ;
        }
    });

    var checkIfWin = function () {
        var won = true;
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                var possible = $("[data-col=" + row + "][data-row=" + col + "]");
                if (possible.length > 0) {
                    var correct = parseInt(possible.data('correct')),
                        calculated = parseInt(possible.attr('data-row')) * 4 + parseInt(possible.attr('data-col'));

                    if (correct != calculated) {
                        won = false;
                    }

                }
            }
        }

        if (won) {
            alert("We won!");
        }
    };

    $(document).on('click', '#randomize', function(e) {
        e.preventDefault();
        randomizeBoard();
    });
});


/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}