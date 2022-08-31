function crateBoard(){
  const treasureLocations = [],
  gameMap = [
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"]
  ]
  for(let i = 0; i < 6; i++){
    treasureLocations.push(Math.floor(Math.random() * (4 - 0)) + 0);
    if(i % 2 !== 0) gameMap[treasureLocations[i]][treasureLocations[i - 1]] = "T"
  }
  gameMap.forEach((column,y)=>{
    column.forEach((columnElement,x)=>{
      if(columnElement === "T"){
        if(y + 1 <= gameMap.length){
          if(x - 1 >= 0 && gameMap[y + 1][x - 1] !=="T" ) gameMap[y + 1][x - 1] ="2"
          if(gameMap[y + 1][x] !== "T") gameMap[y + 1][x] = "3";
          if(x + 1 <= column.length && gameMap[y + 1][x + 1] !== "T") gameMap[y + 1][x + 1] = "2"
        }
        if(x - 1 >= 0 && gameMap[y][x - 1] !== "T" ) gameMap[y][x - 1] = "3"
        if(x + 1 <= column.length && gameMap[y][x + 1] !== "T" ) gameMap[y][x + 1] = "3" 
        if(y - 1 >= 0){
          if(x - 1 >= 0 && gameMap[y - 1][x - 1] !== "T") gameMap[y - 1][x - 1] = "2"
          if(gameMap[y - 1][x] !== "T" ) gameMap[y - 1][x] = "3" 
          if(x + 1 <= column.length && gameMap[y - 1][x + 1] !== "T") gameMap[y - 1][x + 1] = "2"
        }
      }
    })
  })
  return gameMap
}

module.exports = { crateBoard }