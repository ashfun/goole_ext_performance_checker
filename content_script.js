window.addEventListener('load', (event) => {
  chrome.storage.local.get(["target_url", "performance_results"], function (value) {
    let target_url = value.target_url;
    let performance_results = value.performance_results;
    let current_url = location.href;

    // URL matches the target url
    if (current_url && !url.indexOf(target_url)) {
      let page_load = window.performance.timing.loadEventStart - window.performance.timing.fetchStart;
      let ttfb = window.performance.timing.responseStart - window.performance.timing.requestStart;
      let result = {
        timestamp: Date.now(),
        page_load: page_load,
        ttfb: ttfb
      };

      // initialize performance_results
      if (!performance_results) {
        performance_results = {};
      }

      // update performance_results
      if (performance_results[current_url]) {
        performance_results[current_url].push(result);
      } else {
        performance_results[current_url] = [result];
      }
      chrome.storage.local.set({"performance_results": performance_results}, function() {});
    }
  });

  var url = location.href;
});
