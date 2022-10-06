import { addOneRow } from '../../add_one_row_to_tree'

describe('add_one_row_to_tree/index.js', () => {

  test('1', () => {
    const root = [4, 2, null, 3, 1];
    const val = 1;
    const depth = 3;
    const output = [4, 2, null, 1, 1, 3, null, null, 1]
    const result = addOneRow(root, val, depth)
    console.log(result, output, 'compare')
    expect(result).toEqual(output);
  })
  test('2', () => {
    /*
    Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]
    */
    const root = [4, 2, 6, 3, 1, 5];
    const val = 1;
    const depth = 2;
    const output =  [4,1,1,2,null,null,6,3,1,5];

    const result = addOneRow(root, val, depth)
    console.log('result', result);
    console.log('expect', output);
    expect(result).toEqual(output);
  })
})