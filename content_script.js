window.addEventListener('load', (event) => {

  var page_load = window.performance.timing.loadEventStart - window.performance.timing.fetchStart;
  var ttfb = window.performance.timing.responseStart - window.performance.timing.requestStart;
  // key: url, value: load, ttfb, timestamp
  console.log(page_load);
  console.log(ttfb);

  chrome.storage.local.get("target_url", function (value) {
    var target_url = value.target_url;
    var accessing_url = location.href;

    console.log(target_url);
    console.log(accessing_url);

    // URL matches the target url
    if (accessing_url && !url.indexOf(target_url)) {
      var page_load = window.performance.timing.loadEventStart - window.performance.timing.fetchStart;
      var ttfb = window.performance.timing.responseStart - window.performance.timing.requestStart;
      console.log(page_load);
      console.log(ttfb);
    }
  });

  var url = location.href;
});
