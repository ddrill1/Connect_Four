var board = $('td')
var rows = $('tr')
var btnReset = $('#butReset')
var btnRestart = $('#butRestart')
var btnBegin = $('#butBegin')
var butExitAlert = $('#butExitAlert')
var fullBoard = $('#gameboard')
var count = 0
var filledCells = 0
var collection = []
var gameBoard = false
var first1 = ''
var first2 = ''
var letter1 = ''
var letter2 = ''

fullBoard.toggleClass('enableTable')

btnBegin.click(function () {
    beginGame()
})
btnRestart.click(function () {
    clearBoard()
    gameBoard = false
    fullBoard.toggleClass('enableTable')
    beginGame()
})
btnReset.click(function () {
    clearBoard()
})
board.click(function () {
    var col = $(this).index()
    var row = $(this).closest('tr').index()
    collection = []

    if (gameBoard) {
        if (row === 0) {
            collection = [{ index: 'index', color: 'color' }]
            for (var i = board.length - 1; i >= 0; i--) {
                var cell = board.eq(i)

                if (cell.index() === col) {
                    collection.push({
                        index: i,
                        color: cell.css('background-color')
                    })
                }
            }

            for (var j = 0; j < 7; j++) {
                if (collection[j].color === 'rgb(250, 235, 215)') {
                    board.eq(collection[j].index).removeClass('resetCell')
                    if (count % 2 === 0) {
                        board.eq(collection[j].index).addClass('turnRed')
                        board.eq(collection[j].index).text(letter1)
                    }
                    else {
                        board.eq(collection[j].index).addClass('turnBlue')
                        board.eq(collection[j].index).text(letter2)

                    }
                    count++
                    break
                }
            }
            filledCells ++
        }
    }
})
rows.hover(function () {
    if (gameBoard) {
        s = $(this)
        rowSelected = s.closest('tr').attr('id')

        if (rowSelected === 'top') {
            s.css('cursor', 'pointer')
        }
    }
})
function clearBoard() {
    if (filledCells === 0) {
        swal({
            title: 'The board is already clear',
            icon: 'warning'
        })
    }
    else {
        count = 0
        for (i = 0; i < board.length; i++) {
            var cell = board.eq(i)

            if (cell.css('background-color') === 'rgb(255, 69, 0)') {
                cell.removeClass('turnRed')
            }
            else {
                cell.removeClass('turnBlue')
            }

            cell.addClass('resetCell')
        }
        filledCells = 0
    }
}
function beginGame() {
    if (gameBoard) {
        swal({
            title: 'Game in progress',
            icon: 'warning'
        })
        return
    }
    swal({
        title: 'Player 1',
        text: 'Enter your name',
        content: {
            element: "input",
            attributes: {
                placeholder: "Player 1",
                type: "text",
            },
        }
    }).then(function (value) {
        first1 = value
        letter1 = first1.charAt(0)
    }).then(function () {
        swal({
            title: 'Player 2',
            text: 'Enter your name',
            content: {
                element: "input",
                attributes: {
                    placeholder: "Player 2",
                    type: "text",
                },
            }
        }).then(function (value) {
            first2 = value
            letter2 = first2.charAt(0)
        })
    }).then(function () {
        btnReset.attr('disabled', false)
        btnRestart.attr('disabled', false)
        gameBoard = true
        fullBoard.toggleClass('enableTable')
        fullBoard.focus()
    })
}
function randomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
function changeHeaderColor() {
    colorInput = randomColor()
    $('h1').css('color', colorInput)
}
setInterval("changeHeaderColor()", 250)




