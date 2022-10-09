

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
  const groups = [];
  const log2 = Math.log2(root.length)
  for (let j = 0; j < log2; j++) {
    const range = (() => {
      if (j === 0) {
        return [0, Math.pow(2, j)]
      } else {
        return [Math.pow(2, j) - 1, Math.pow(2, j + 1) - 1]
      }
    })();
    const currentGroup = []
    for (let i = range[0]; i < range[1]; i++) {
      currentGroup.push(root[i] || null)
    }
    groups.push(currentGroup)
  }
  const newGroups = [];
  for (let i = 0; i < groups.length; i++) {
    if (i + 1 === depth) {
      newGroups.push([val, val])
    }
    newGroups.push(groups[i])
  }

  const slots = (() => {
    return JSON.parse(JSON.stringify(newGroups))
  })()
  for (let i = 0; i < newGroups.length; i++) {
    for (let j = 0; j < newGroups[i].length; j++) {
      (() => {
        if (j % 2 === 0) {
          return j
        } else {
          const parentNodesCount = (() => {
            if (i > 0) {
              return newGroups[i - 1].filter(item => !!item).length
            } else {
              return 0;
            }
          })()
          for (let g = j; g <= Math.pow(2, parentNodesCount); g++) {
            const v = Math.floor((g + 1) / 2);
            if (!slots[i][g + 1]) {
              if (slots[i - 1][v]) {
                slots[i][g] = null
                slots[i][g + 1] = newGroups[i][j]
              }
            }
          }
        }
      })()
    }
  }

  for (let i = slots.length - 1; i > 0; i--) {
    for (let j = slots[i].length - 1; j > 0; j--) {
      if (slots[i][j] || i !== slots.length - 1) {
        break
      } else {
        slots[i] = slots[i].filter((item, index) => index !== j)
      }
    }
  }
  const left = [];
  const right = [];
  let vval = null;
  // const result = slots.flat().forEach((item, index) => {
  //   if (index === 0) {
  //     val = item;
  //   }
  // })
  for(let i =0 ; i < slots.length; i ++) {
    for(let j = 0 ; j < slots[i].length; j++) {
      if (i == 0 && j === 0) {
        vval = slots[i][j];
      } else {
        // const v = Math.ceil((j + 1) / 2);
        // console.log(v, j );
        if(j+ 1 <= (Math.pow(2, i ) / 2)) {
          left.push(slots[i][j])
        } else {
          if (!(right.length === 0 && !slots[i][j])) {
            right.push(slots[i][j])
          }
        }
      }
    }
  }
  // return TreeNode(vval, left, right)
  console.log(left, right, vval);
  return slots.flat()
};

module.exports = {
  addOneRow
}