function checkForWin() {
    var correctBoxes = [];
    correctBoxes = $.grep(boxes, function (e) {
        return e.currentRow == e.originalRow && e.currentCol == e.originalCol;
    });

    if (correctBoxes.length == boxes.length) $('.alert').slideDown();
}

function toggleNumbers() {
    $('.text-holder').toggle();
    $('#numbers-toggle > .text1').toggle();
    $('#numbers-toggle > .text2').toggle();
}

function findBoxesWithMoves() {
    return $.grep(boxes, function (e) {
        return e.findMove(false);
    });
}

function findBox(row, col) {
    if (row < 0 || row > 3 || col < 0 || col > 3) return "OUT OF RANGE";

    return $.grep(boxes, function (e) {
        return e.currentRow == row && e.currentCol == col;
    })[0];
}

function box($this) {
    var that = {
        originalRow: $this.data('row'),
        originalCol: $this.data('col'),
        currentRow: $this.data('row'),
        currentCol: $this.data('col')
    };

    that.above = function above() {
        return findBox(that.currentRow - 1, that.currentCol);
    };

    that.below = function below() {
        return findBox(that.currentRow + 1, that.currentCol);
    };

    that.left = function left() {
        return findBox(that.currentRow, that.currentCol - 1);
    }

    that.right = function right() {
        return findBox(that.currentRow, that.currentCol + 1);
    }

    that.moveUp = function moveUp() {
        that.currentRow -= 1;
        $this.animate({ "top": '-=100px' }, 1000, function() { checkForWin(); });
    }

    that.moveDown = function moveDown() {
        that.currentRow += 1;
        $this.animate({ "top": '+=100px' }, 1000, function() { checkForWin(); });
    }

    that.moveLeft = function moveLeft() {
        that.currentCol -= 1;
        $this.animate({ "left": '-=100px'}, 1000, function() { checkForWin(); });
    }

    that.moveRight = function moveRight() {
        that.currentCol += 1;
        $this.animate({ "left": '+=100px'}, 1000, function() { checkForWin(); });
    }

    that.findMove = function findMove(move) {
        var nextMove = false;
        move = typeof move !== "undefined" ? move : true;
        while (true) {
            if (typeof that.above() === "undefined") {
                move ? that.moveUp() : (nextMove = true);
                break;
            }
            if (typeof that.below() === "undefined") {
                move ? that.moveDown() : (nextMove = true);
                break;
            }
            if (typeof that.left() === "undefined") {
                move ? that.moveLeft() : (nextMove = true);
                break;
            }
            if (typeof that.right() === "undefined") {
                move ? that.moveRight() : (nextMove = true);
                break;
            }
            break;
        }

        return nextMove;
    }

    return that;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}