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
    var is_update_accepted = true;

    // check if it's ok to overwrite target URL
    chrome.storage.local.get("target_url", function (value) {
      var original_target_url = document.getElementById("target_url").value;

      if (target_url !== original_target_url) {
        is_update_accepted = window.confirm(`
          It's going to overwrite the target URL.\n
          - Current: ${original_target_url}\n
          - New: ${target_url}\n
          Is it OK?
        `);
      }
    });

    // update target_url
    if (is_update_accepted === true) {
      //localStorage.setItem("target_url", target_url);
      chrome.storage.local.set({"target_url": target_url}, function() {}); // test
      document.getElementById("target_url").value = target_url;
    }
  }
};

document.getElementById("reset").onclick = function() {
  //localStorage.clear();
  chrome.storage.local.clear();
};
