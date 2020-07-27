document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector("#start-button");
    const width = 10
    
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
      ]
    
      const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
      ]
    
      const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
      ]
    
      const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
      ]

      const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

      let currentPosition = 4
      let currentRotation = 0
      //randomly select a Tetromino and its first rotation
      let random = Math.floor(Math.random()*theTetrominoes.length)
      let current = theTetrominoes[random][currentRotation]

      //draw the tetromino
      function draw() {
          current.forEach(index => {
              squares[currentPosition + index].classList.add('tetromino')
          })
      }
      
      function undraw() {
        current.forEach(index => {
          squares[currentPosition + index].classList.remove('tetromino')
        })
      }

      timerID = setInterval(moveDown, 1000)

      //assign functions to keycode
      function control(e) {
        //move left
        if (e.keyCode === 37) {
          moveLeft()
        //move right
        } else if (e.keyCode === 39) {
          moveRight()  
        //rotate tetromino
        } else if (e.keyCode === 38) {
          rotate()
        //move down
        } else if (e.keyCode === 40) {
          moveDown()
        }
      }

      document.addEventListener('keydown', control)

      //move down function
      function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
      }

      //freeze function
      function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
          current.forEach(index => squares[currentPosition + index].classList.add('taken'))  
          //start a new tetromino falling
          random = Math.floor(Math.random() * theTetrominoes.length)
          current = theTetrominoes[random][currentRotation]
          currentPosition = 4
          draw()
        }
      }

      function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
          currentPosition += 1
        }
        draw()
      }

      function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === -1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
          currentPosition -= 1
        }
        draw()
      }

      function rotate() {
        undraw()
        currentRotation++
        if(currentRotation === current.length) {
          currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
      }

      //show up-next tetromino in mini-grid display
      const displaySquaeres = document.querySelectorAll('.mini-grid div')
      const displayWidth = 4
      let displayIndex = 0

      //the Tetrominos without rotations
      const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth. displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
      ]
    })