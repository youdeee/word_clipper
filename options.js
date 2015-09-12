$(document).ready(function(e) {
  // 初回読み込み
  chrome.storage.local.get("capturedStrings", function (v) {
    var stored_words = v.capturedStrings;
    var new_body = "";
    var export_string = '';
    for (var key in stored_words) {
      new_body += '<tr><td class="td-padding"><span class="glyphicon glyphicon-remove remove" aria-hidden="true"></span></td><td class="td-padding key">' +  key + '</td><td class="value"><input type="text" class="form-control" value="' + stored_words[key] +  '"></td></tr>';
      export_string += key + ',' + stored_words[key] + '\n';
    }
    document.getElementById('word').innerHTML = new_body;
    setBlobUrl('download', export_string);
  });

  // 削除フラグ付加
  $(document).on('click', '.remove', function() {
    $(this).closest('tr').addClass('removed');
  });

  // 保存処理
  $(document).on('click', '.save-button', function() {
    var obj = {};
    var export_string = '';
    $('tbody tr').each(function(i, element) {
      if (!$(element).hasClass('removed')) {
        var key = $(element).children('.key').text();
        var val = $(element).children('.value').children().val();
        obj[key] = val;
        export_string += key + ',' + val + '\n';
      }
    });
    setBlobUrl('download', export_string);
    chrome.storage.local.set({ capturedStrings: obj }, function() {
    });
  });

});

function setBlobUrl(id, content) {
  // 指定されたデータを保持するBlobを作成する。
  var blob = new Blob([ content ], { "type" : "application/x-msdownload" });
  // Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
  window.URL = window.URL || window.webkitURL;
  $("#" + id).attr("href", window.URL.createObjectURL(blob));
  $("#" + id).attr("download", "words.txt");
}
