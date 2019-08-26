/**
 * @flow
 */

/**
 * Max
 *
 * @param {Array.<number>} xs
 * @return {number}
 */
export function max (xs) {
    return Math.max.apply(undefined, xs)
  }
  
  /**
   * Min
   *
   * @param {Array.<number>} xs
   * @return {number}
   */
  export function min (xs) {
    return Math.min.apply(undefined, xs)
  }
  
  const nonEmpty = (xs) => xs && xs.length > 0
  
  /**
   * Average
   *
   * @param {Array.<number>} xs
   * @return {number}
   */
  export function mean (xs) {
    return nonEmpty(xs) ? xs.reduce((a, b) => a + b) / xs.length : 0
  }
  
  /**
   * Median
   *
   * @param {Array.<number>} xs
   * @return {number}
   */
  export function median (xs) {
    return nonEmpty(xs) ? xs.sort()[Math.floor(xs.length / 2)] : 0
  }
  
  const devSum = xs => {
    const avg = mean(xs)
    return xs.reduce((acc, x) => {
      return acc + Math.pow(x - avg, 2)
    })
  }
  
  /**
   * Standard Deviation
   *
   * @param {Array.<number>} xs
   * @return {number}
   */
  export function stdev (xs)  {
    return nonEmpty(xs) ? Math.sqrt(devSum(xs) / (xs.length - 1)) : 0
  }
  
  /**
   * Sample Data
   *
   * @param {Array.<number>} xs
   * @param {number} sampling
   * @return {number}
   */
  export function sample (xs, sampling) {
    const band = (sampling > 1 ? xs.length : 1) / sampling
    const step = Math.round(Math.min(band, xs.length / 2))
  
    let cursor = -1
    return xs.filter((x, i) => {
      if (i > cursor) {
        cursor += step
      }
  
      return i === cursor
    })
  }