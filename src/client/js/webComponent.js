import { h, render } from 'preact';


function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function webComponentDecorator(name, options = {}) {

  var config = { attributes: true };

  let root;

  function rerenderComponent(TargetComponent, element) {
    var dataset = {};
    for (var data in element.dataset) {
      if (data.endsWith("Model")) {
        try {
          dataset[data] = JSON.parse(element.dataset[data]);
        } catch (e) {
          dataset[data] = element.dataset[data];
        }
      } else if (data.startsWith("is") || data.startsWith("show")) {
        dataset[data] = element.dataset[data] == 'true';
      } else {
        dataset[data] = element.dataset[data];
      }
    }
    root = render(<TargetComponent {...dataset} />, element, root);
  }

  return function (TargetComponent) {
    var mountPoint = document.getElementsByTagName(name);
    var debouncedFn = debounce(rerenderComponent, 100);
    var observer = new MutationObserver(((mutationsList) => {
      for (var mutation of mutationsList) {
        if (mutation.type == 'attributes') {
          debouncedFn(TargetComponent, mutation.target);
        }
      }
    }));

    for (let i = 0; i < mountPoint.length; i++) {
      const element = mountPoint[i];
      if (options.observeAttributes) {
        observer.observe(element, config);
      }
      rerenderComponent(TargetComponent, element);
    }
  };
}

export default webComponentDecorator;