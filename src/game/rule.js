import Game from '../game'
import _ from 'underscore'

const getRuleTypeByName = function (name) {
  console.log('getRuleTypeByName', name)
  if (name.length > 1) {
    return name.substring(0, 1)
  } else {
    return name
  }
}

const getMoveLine = function (pair) {
  const ruleType = getRuleTypeByName(pair.name)
  console.log(pair, ruleType)
  let moveLine = []
  switch (ruleType) {
    case 'z': // 兵
      moveLine = getZMoveLine(pair)
      break
    case 's': // 士
      moveLine = getSMoveLine(pair)
      break
    case 'k': // 帅
      moveLine = getKMoveLine(pair)
      break
    case 'j': // 军
      moveLine = getJMoveLine(pair)
      break
    case 'p': // 炮
      moveLine = getPMoveLine(pair)
      break
    case 'x': // 相
      moveLine = getXMoveLine(pair)
      break
    case 'm': // 马
      moveLine = getMMoveLine(pair)
      break
  }
  return moveLine
}

const canMove = function (pair, targetPair, canMovePoint) {
  console.log(pair, targetPair, canMovePoint)
  if (!canMovePoint || canMovePoint.length < 1) {
    // 如果还没有可移动的列表，则return
    return false
  }
  const positionStr = targetPair.position.toString()
  for (const point of canMovePoint) {
    if (point.toString() === positionStr) {
      return true
    }
  }
  return false
}

// 兵的可移动路线
const getZMoveLine = function (pair) {
  const position = pair.position
  const x = position[0]
  const y = position[1]
  const line = []
  if (pair.camp === 1) { // 红方，棋盘在下方
    if (y <= 5) {
      line.push([x, y + 1]) // 只能前进一步
    } else {
      if (y !== 10) {
        // 可以前进一步
        line.push([x, y + 1])
      }
      if (x !== 1) {
        // 可以左移一步
        line.push([x - 1, y])
      }
      if (x !== 9) {
        // 可以右移一步
        line.push([x + 1, y])
      }
    }
  } else { // 黑方，棋盘在上方
    if (y > 5) {
      line.push([x, y - 1]) // 只能前进一步
    } else {
      if (y !== 1) {
        // 可以前进一步
        line.push([x, y - 1])
      }
      if (x !== 1) {
        // 可以左移一步
        line.push([x - 1, y])
      }
      if (x !== 9) {
        // 可以右移一步
        line.push([x + 1, y])
      }
    }
  }
  return line
}

// 士的可移动路线
const getSMoveLine = function (pair) {
  const position = pair.position
  const x = position[0]
  const y = position[1]
  const line = []
  if (pair.camp === 1) { // 红方，棋盘在下方
    if (x !== 4) {
      if (y !== 1) {
        line.push([x - 1, y - 1])
      }
      if (y !== 3) {
        line.push([x - 1, y + 1])
      }
    }
    if (x !== 6) {
      if (y !== 1) {
        line.push([x + 1, y - 1])
      }
      if (y !== 3) {
        line.push([x + 1, y + 1])
      }
    }
  } else { // 黑方，棋盘在上方
    if (x !== 4) {
      if (y !== 8) {
        line.push([x - 1, y - 1])
      }
      if (y !== 10) {
        line.push([x - 1, y + 1])
      }
    }
    if (x !== 6) {
      if (y !== 8) {
        line.push([x + 1, y - 1])
      }
      if (y !== 10) {
        line.push([x + 1, y + 1])
      }
    }
  }
  return line
}

// 将的可移动路线
const getKMoveLine = function (pair) {
  const position = pair.position
  const x = position[0]
  const y = position[1]
  const line = []
  if (pair.camp === 1) { // 红方，棋盘在下方
    if (y !== 3) {
      // 可以前进一步
      line.push([x, y + 1])
    }
    if (y !== 1) {
      // 可以后退一步
      line.push([x, y - 1])
    }
    if (x !== 4) {
      // 可以左移一步
      line.push([x - 1, y])
    }
    if (x !== 6) {
      // 可以右移一步
      line.push([x + 1, y])
    }
  } else { // 黑方，棋盘在上方
    if (y !== 10) {
      // 可以前进一步
      line.push([x, y + 1])
    }
    if (y !== 8) {
      // 可以后退一步
      line.push([x, y - 1])
    }
    if (x !== 4) {
      // 可以左移一步
      line.push([x - 1, y])
    }
    if (x !== 6) {
      // 可以右移一步
      line.push([x + 1, y])
    }
  }
  return line
}

// 相的可移动路线
const getXMoveLine = function (pair) {
  const position = pair.position
  const x = position[0]
  const y = position[1]
  const line = []

  // 获取所有棋子的位置
  const positionStrArr = getAllPairPosition()

  if (pair.camp === 1) { // 红方，棋盘在下方
    if (x !== 1) {
      if (y !== 1 && positionStrArr.indexOf([x - 1, y - 1].toString()) < 0) {
        line.push([x - 2, y - 2])
      }
      if (y !== 5 && positionStrArr.indexOf([x - 1, y + 1].toString()) < 0) {
        line.push([x - 2, y + 2])
      }
    }
    if (x !== 9) {
      if (y !== 1 && positionStrArr.indexOf([x + 1, y - 1].toString()) < 0) {
        line.push([x + 2, y - 2])
      }
      if (y !== 5 && positionStrArr.indexOf([x + 1, y + 1].toString()) < 0) {
        line.push([x + 2, y + 2])
      }
    }
  } else { // 黑方，棋盘在上方
    if (x !== 1) {
      if (y !== 6 && positionStrArr.indexOf([x - 1, y - 1].toString()) < 0) {
        line.push([x - 2, y - 2])
      }
      if (y !== 10 && positionStrArr.indexOf([x - 1, y + 1].toString()) < 0) {
        line.push([x - 2, y + 2])
      }
    }
    if (x !== 9) {
      if (y !== 6 && positionStrArr.indexOf([x + 1, y - 1].toString()) < 0) {
        line.push([x + 2, y - 2])
      }
      if (y !== 10 && positionStrArr.indexOf([x + 1, y + 1].toString()) < 0) {
        line.push([x + 2, y + 2])
      }
    }
  }
  return line
}

// 军的可移动路线
const getJMoveLine = function (pair) {
  const position = pair.position
  const x = position[0]
  const y = position[1]
  const line = []

  // 获取所有棋子的位置
  const positionStrArr = getAllPairPosition()
  const pairsArr = Game.getAllPairs()

  if (x !== 9) {
    for (let xIndex = x + 1; xIndex <= 9; xIndex++) {
      const positionIndex = positionStrArr.indexOf([xIndex, y].toString())
      if (positionIndex > -1) {
        if (pairsArr[positionIndex].camp !== pair.camp) {
          line.push([xIndex, y])
        }
        break
      }
      line.push([xIndex, y])
    }
  }
  if (x !== 1) {
    for (let xIndex = x - 1; xIndex >= 1; xIndex--) {
      const positionIndex = positionStrArr.indexOf([xIndex, y].toString())
      if (positionIndex > -1) {
        if (pairsArr[positionIndex].camp !== pair.camp) {
          line.push([xIndex, y])
        }
        break
      }
      line.push([xIndex, y])
    }
  }
  if (y !== 10) {
    for (let yIndex = y + 1; yIndex <= 10; yIndex++) {
      const positionIndex = positionStrArr.indexOf([x, yIndex].toString())
      if (positionIndex > -1) {
        if (pairsArr[positionIndex].camp !== pair.camp) {
          line.push([x, yIndex])
        }
        break
      }
      line.push([x, yIndex])
    }
  }
  if (y !== 1) {
    for (let yIndex = y - 1; yIndex >= 1; yIndex--) {
      const positionIndex = positionStrArr.indexOf([x, yIndex].toString())
      if (positionIndex > -1) {
        if (pairsArr[positionIndex].camp !== pair.camp) {
          line.push([x, yIndex])
        }
        break
      }
      line.push([x, yIndex])
    }
  }
  return line
}

// 马的可移动路线
const getMMoveLine = function (pair) {
  const position = pair.position
  const x = position[0]
  const y = position[1]
  const line = []

  // 获取所有棋子的位置
  const positionStrArr = getAllPairPosition()

  /*
  八种可能
  x + 1, y + 2
  x + 1, y - 2
  x - 1, y + 2
  x - 1, y - 2
  x + 2, y + 1
  x - 2, y + 1
  x + 2, y - 1
  x - 2, y - 1
  */

  if (x !== 1) {
    if (y > 2 && positionStrArr.indexOf([x, y - 1].toString()) < 0) {
      line.push([x - 1, y - 2])
    }
    if (y < 9 && positionStrArr.indexOf([x, y + 1].toString()) < 0) {
      line.push([x - 1, y + 2])
    }
  }
  if (x !== 9) {
    if (y > 2 && positionStrArr.indexOf([x, y - 1].toString()) < 0) {
      line.push([x + 1, y - 2])
    }
    if (y < 9 && positionStrArr.indexOf([x, y + 1].toString()) < 0) {
      line.push([x + 1, y + 2])
    }
  }
  if (y !== 1) {
    if (x > 2 && positionStrArr.indexOf([x - 1, y].toString()) < 0) {
      line.push([x - 2, y - 1])
    }
    if (x < 8 && positionStrArr.indexOf([x + 1, y].toString()) < 0) {
      line.push([x + 2, y - 1])
    }
  }
  if (y !== 9) {
    if (x > 2 && positionStrArr.indexOf([x - 1, y].toString()) < 0) {
      line.push([x - 2, y + 1])
    }
    if (x < 8 && positionStrArr.indexOf([x + 1, y].toString()) < 0) {
      line.push([x + 2, y + 1])
    }
  }

  return line
}

// 炮的可移动路线
const getPMoveLine = function (pair) {
  const position = pair.position
  const x = position[0]
  const y = position[1]
  const line = []

  // 获取所有棋子的位置
  const positionStrArr = getAllPairPosition()
  const pairsArr = Game.getAllPairs()

  if (x !== 9) {
    let hasFulcrum = false // 是否有支点
    for (let xIndex = x + 1; xIndex <= 9; xIndex++) {
      const positionIndex = positionStrArr.indexOf([xIndex, y].toString())
      if (hasFulcrum) {
        if (positionIndex > -1) {
          if (pairsArr[positionIndex].camp !== pair.camp) {
            line.push([xIndex, y])
          }
          break
        }
      } else {
        if (positionIndex > -1) {
          hasFulcrum = true
          continue
        }
        line.push([xIndex, y])
      }
    }
  }
  if (x !== 1) {
    let hasFulcrum = false // 是否有支点
    for (let xIndex = x - 1; xIndex >= 1; xIndex--) {
      const positionIndex = positionStrArr.indexOf([xIndex, y].toString())
      if (hasFulcrum) {
        if (positionIndex > -1) {
          if (pairsArr[positionIndex].camp !== pair.camp) {
            line.push([xIndex, y])
          }
          break
        }
      } else {
        if (positionIndex > -1) {
          hasFulcrum = true
          continue
        }
        line.push([xIndex, y])
      }
    }
  }
  if (y !== 10) {
    let hasFulcrum = false // 是否有支点
    for (let yIndex = y + 1; yIndex <= 10; yIndex++) {
      const positionIndex = positionStrArr.indexOf([x, yIndex].toString())
      if (hasFulcrum) {
        if (positionIndex > -1) {
          if (pairsArr[positionIndex].camp !== pair.camp) {
            line.push([x, yIndex])
          }
          break
        }
      } else {
        if (positionIndex > -1) {
          hasFulcrum = true
          continue
        }
        line.push([x, yIndex])
      }
    }
  }
  if (y !== 1) {
    let hasFulcrum = false // 是否有支点
    for (let yIndex = y - 1; yIndex >= 1; yIndex--) {
      const positionIndex = positionStrArr.indexOf([x, yIndex].toString())
      if (hasFulcrum) {
        if (positionIndex > -1) {
          if (pairsArr[positionIndex].camp !== pair.camp) {
            line.push([x, yIndex])
          }
          break
        }
      } else {
        if (positionIndex > -1) {
          hasFulcrum = true
          continue
        }
        line.push([x, yIndex])
      }
    }
  }
  return line
}

const getAllPairPosition = function () {
  const pairsArr = Game.getAllPairs()
  const positionArr = _.pluck(pairsArr, 'position')

  const strArr = []
  for (const position of positionArr) {
    strArr.push(position.toString())
  }
  console.log(strArr)
  return strArr
}

export default {
  getMoveLine,
  canMove
}