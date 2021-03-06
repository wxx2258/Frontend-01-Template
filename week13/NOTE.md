### proxy

``` javascript
  let handlers = new Map();
  let usedReactivities = [];
  let reactivities = new Map();

  function reactive(obj) {
    // 减少重复包装，保证每次返回的都是正确的。
    if (reactivities.has(obj)) {
      return reactivities.get(obj);
    }

    let proxy = new Proxy(obj, {
      get(obj, prop) {
        // console.log('obj, prop: ', obj, prop);
        usedReactivities.push([obj, prop]);
        if (typeof obj[prop] === 'object') {
          return reactive(obj[prop]);
        }
        // console.log('obj[prop]: ', obj[prop]);
        return obj[prop]
      },

      set(obj, prop, val) {
        obj[prop] = val

        if (handlers.has(obj) && handlers.get(obj).get(prop)) {
          for (const handler of handlers.get(obj).get(prop)) {
            handler();
          }
        }

        return obj[prop];
      }
    });

    reactivities.set(obj, proxy);
    reactivities.set(proxy, proxy);

    return proxy;
  }

  function effect(handler) {
    usedReactivities = []
    handler();

    for (const useReactivity of usedReactivities) {
      // console.log('useReactivity: ', useReactivity);
      let [obj, prop] = useReactivity;

      if (!handlers.has(obj)) {
        handlers.set(obj, new Map())
      }
      if (!handlers.get(obj).has(prop)) {
        handlers.get(obj).set(prop, [])
      }

      handlers.get(obj).get(prop).push(handler);
    }
  }

```

### 拖拽的基本思路
``` javascript 
  let dragable = document.getElementById('dragable')
  dragable.addEventListener('mousedown',()=> {
    let move = (e)=> {

    }
    let up = ()=> {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  })
```