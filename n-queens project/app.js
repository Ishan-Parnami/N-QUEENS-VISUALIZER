const meetContraints = (rows, column, solution) => {
    for (let i = 0; i < rows; i++) {
        if (solution[i] === column || 
        Math.abs(column - solution[i]) === Math.abs(rows - i)) {
            return false;
        }
    }
    return true;
}


const solve_Nqueens = (n) => {
  const init = [[]];
  const totalSolutions = eachRow(0, n, init);
  return totalSolutions;
}

const eachRow = (row, columns, prevSolutions) => {

    let newSolutions = [];
    let prev = prevSolutions;
  
   for (let i = 0; i< prev.length; i++) {
       let solution = prev[i];
       for (let j = 0; j < columns; j++) {
           if (meetContraints(row, j, solution)) {
               newSolutions.push(solution.concat([j]));           
         } 
       }
     }
   if (row === columns - 1) {
     result = newSolutions;
     
   } else {
     eachRow(row + 1, columns, newSolutions); 
   }
   return result;   
};


const drawBoard = (n, randomSol) => {

const queen = {
 name: "queen",
 w: "\u2655",
 b: "\u265B"
};

const boxSize = 60,
 boardDimension = n,
 boardSize = boardDimension * boxSize,
 margin = 100;
const div = d3.select("#chessboard");
const svg = div.append("svg")
 .attr("width", boardSize + "px")
 .attr("height", boardSize + "px");

for (let i = 0; i < 8; i++) {
 for (let j = 0; j < 8; j++) {
   const box = svg.append("rect")
     .attr("x", i * boxSize)
     .attr("y", j * boxSize)
     .attr("width", boxSize + "px")
     .attr("height", boxSize + "px");
   if ((i + j) % 2 === 0) {
     box.attr("fill", "beige");
   } else {
     box.attr("fill", "gray");
   }

   const chess = svg.append("text")
     .classed('draggable', true)
     .style("font-size", '40')
     .attr("text-anchor", "middle")
     .attr("x", i * boxSize)
     .attr("y", j * boxSize)
     .attr("dx", boxSize / 2)
     .attr("dy", boxSize * 2 / 3);
   
   chess.attr("X", chess.attr("x"))
     .attr("Y", chess.attr("y"));

     if (j === nQueens[randomSol][i]) {
     chess.classed('queens', true)
       .text(queen.b);
   }
 }
}
}


var nQueens = solve_Nqueens(4);
function myfun() {
  const inputValue = parseInt(document.getElementById("inp").value);

  if (inputValue >= 4) {
    document.getElementById("chessboard").style.textAlign = "center";
    const x = inputValue;
    nQueens = solve_Nqueens(x);

    const randomSolution = () => {
      return Math.floor(Math.random() * nQueens.length);
    };
    const random = randomSolution();

    drawBoard(x, random);
  } else {

    alert("Enter a value greater than or equal to 4.");
  }
}


const clearFun = () => {
  d3.select("#chessboard").selectAll("svg").remove();
  document.getElementById("inp").value = "";
};
document.getElementById("inp").addEventListener("keydown", function(event) {
  
  if (event.key === "Enter") {
    event.preventDefault(); 
    myfun();
  }
});
