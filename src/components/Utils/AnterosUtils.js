
import React from 'react';


export function cloneReferencedElement(element, config, ...children) {
    let cloneRef = config.ref;
    let originalRef = element.ref;
    if (originalRef == null || cloneRef == null) {
      return React.cloneElement(element, config, ...children);
    }
  
    if (typeof originalRef !== 'function') {
      if (__DEV__) {
        console.warn(
          'Cloning an element with a ref that will be overwritten because it ' +
          'is not a function. Use a composable callback-style ref instead. ' +
          'Ignoring ref: ' + originalRef,
        );
      }
      return React.cloneElement(element, config, ...children);
    }
  
    return React.cloneElement(element, {
      ...config,
      ref(component) {
        cloneRef(component);
        originalRef(component);
      },
    }, ...children);
  }


  export function formatDateTime(dateTime, format) {
    const date = new Date(dateTime)
    let fmt = format || 'yyyy-MM-dd'
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))) }
    return fmt
  }
  