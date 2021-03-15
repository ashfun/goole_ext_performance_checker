$(function() {
  function initialSetup() {
    chrome.storage.local.get("target_url", function (value) {
      var target_url = value.target_url;

      if (target_url) {
        document.getElementById("target_url").value = target_url;
      }
    });
  }
  initialSetup();
});

// Set target url
document.getElementById("set_target_url").onclick = function() {
  if (document.getElementById("target_url").value) {

    chrome.storage.local.get("target_url", function (value) {
      let is_update_accepted = true;
      let original_target_url = value.target_url;
      let target_url = document.getElementById("target_url").value;
      console.log(original_target_url);

      if (original_target_url && target_url !== original_target_url) {
        is_update_accepted = window.confirm(`
          It's going to overwrite the target URL.\n
          - Current: ${original_target_url}\n
          - New: ${target_url}\n
          Is it OK?
        `);
      }

      // update target_url
      if (is_update_accepted === true) {
        chrome.storage.local.set({"target_url": target_url}, function() {});
        document.getElementById("target_url").value = target_url;
      } else {
        document.getElementById("target_url").value = original_target_url;
      }
    });
  }
};

// Remove current data
document.getElementById("remove_cuttent").onclick = function() {
  chrome.storage.local.get(["performance_results", "current_url"], function (value) {
    let performance_results = value.performance_results;
    let current_url = value.current_url;

    if (current_url) {
      is_remove_accepted = window.confirm(`
        Would you like to remove the performance data for current page?
        URL: ${current_url}
      `);

      if (is_remove_accepted === true) {
        // remove the last data for current url
        performance_results[current_url].pop();
        chrome.storage.local.set({"performance_results": performance_results}, function() {});
        chrome.storage.local.remove("current_url", function() {});

        alert("Removed the last performance data");
      }
    } else {
      alert("The data is already removed.");
    }
  });
};

document.getElementById("remove_all").onclick = function() {
  let is_remove_all = window.confirm(`
    It's going to remove all performance data & target url setting.\n
    Are you sure you want to do it?
  `);

  // remove all data
  if (is_remove_all === true) {
    chrome.storage.local.clear();
    document.getElementById("target_url").value = "";

    alert("Removed all data");
  }
};

// Download
document.getElementById("export").onclick = function() {
  chrome.storage.local.get("performance_results", function (value) {
    let performance_results = value.performance_results;
    if (performance_results) {
      exportCSVFile(performance_results);
    } else {
      alert("No data to export");
    }
  });
};

function exportCSVFile(object) {
    // set headers
    const headers = ["url", "timestamp", "page_load (ms)", "ttfb (ms)"];
    const key_list = ["url", "timestamp", "page_load", "ttfb"];

    // initiate csv with headers
    let csv = headers.join(",") + '\r\n';

    // convert to CSV
    Object.keys(object).forEach(function (key) {
      var item_num = object[key].length;
      for (var i = 0; i < item_num; i++) {
        csv += key + "," + object[key][i][key_list[1]] + "," + object[key][i][key_list[2]] + "," + object[key][i][key_list[3]] + '\r\n';
      }
    });

    // set file name
    var date = new Date();
    var date_string = String(date.getTime());
    var filename = 'performance_results_' + date_string + '.csv';

    // download
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
