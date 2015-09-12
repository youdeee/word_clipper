document.onkeydown = function (e) {
  if (e.keyCode == 65) {
    var selected_word = getSelection().toString().toLowerCase();
    var words = {};
    if (selected_word) {
      chrome.storage.local.get("capturedStrings", function (v) {
        words = v.capturedStrings;
        words[selected_word] = '';
        chrome.storage.local.set({ capturedStrings: words }, function () {
        });
      });
    }
  }
  // else if (e.keyCode == 86) {
  //   chrome.storage.local.get("capturedStrings", function (v) {
  //     var value = v.capturedStrings;
  //   });
  // }
};
