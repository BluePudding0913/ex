let messages = []; // JSONの内容を保持する変数
let currentIndex = 0; // 現在何番目か
// JSONデータを読み込む
fetch('texts.json')
  .then(response => response.json())
  .then(data => {
    messages = data.messages;
  });

// ボタンクリック時の処理
document.getElementById('go').addEventListener('click', () => {
  if (currentIndex < messages.length) {
    //3いったらテキスト削除
    if (currentIndex > 3) {
      const container = document.getElementById('text-area');
      container.removeChild(container.firstChild);
    }

    const container = document.getElementById('text-area');
    const newText = document.createElement('a'); // 新しい段落を作る
    newText.classList.add('fade-t'); // CSSクラスを追加
    newText.classList.add('txt'); // テキストのスタイルを追加
    newText.textContent = messages[currentIndex]; // テキストを代入
    container.appendChild(newText); // 画面に追加
    currentIndex++; // 次のインデックスへ
  } else {
    alert('すべてのメッセージを表示しました！');
  }
});