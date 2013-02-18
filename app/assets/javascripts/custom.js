var boxes = [];

$(function () {
    // Throw all boxes into array of box objects
    $('.box').each(function () {
        var newBox = box($(this));
        boxes.push(newBox);
        $(this).data('box', newBox);
    });

    // Move the box clicked if it has a move
    $(document).on('click', '.box', function (e) {
        var box = $(this).data('box');
        box.findMove();
    });

    // Toggle number overlay
    $(document).on('click', '#numbers-toggle', function(e) {
        e.preventDefault();
        toggleNumbers();
    });

    // Close winning alert
    $(document).on('click', '.close-alert', function(e) {
        e.preventDefault();
        $(this).parent('.alert').slideUp();
    });

    // Mess the boxes up
    $(document).on('click', '#randomize', function (e) {
        e.preventDefault();
        var possibleBoxes = [],
            boxToMove = {};

        if ($('.alert').is(':visible')) $('.alert').slideUp();

        for (var i = 0; i < 40; i++) {
            possibleBoxes = findBoxesWithMoves();
            possibleBoxes = shuffleArray(possibleBoxes);
            boxToMove === possibleBoxes[0] ? boxToMove = possibleBoxes[1] : boxToMove = possibleBoxes[0];
            boxToMove.findMove();
        }
    });
});