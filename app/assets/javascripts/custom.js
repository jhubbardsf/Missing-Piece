var boxes = [];

$(function () {
    $('.box').each(function () {
        var newBox = box($(this));
        boxes.push(newBox);
        $(this).data('box', newBox);
    });

    $(document).on('click', '.box', function (e) {
        var box = $(this).data('box');
        box.findMove();
    });

    $(document).on('click', '#randomize', function (e) {
        var possibleBoxes = [],
            boxToMove = {};

        for (var i = 0; i < 40; i++) {
            possibleBoxes = findBoxesWithMoves();
            possibleBoxes = shuffleArray(possibleBoxes);
            boxToMove === possibleBoxes[0] ? boxToMove = possibleBoxes[1] : boxToMove = possibleBoxes[0];
            boxToMove.findMove();
        }
    });
});