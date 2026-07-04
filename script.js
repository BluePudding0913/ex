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
    const container = document.getElementById('text-area');
    
    //表示するメッセージが３つ以上なら、最初のメッセージを削除する
    if (currentIndex > 1) {
      container.removeChild(container.firstChild);
    }



    // ★ 'a' や 'div' ではなく 'span' にする
    const newText = document.createElement('span'); 
    
    newText.classList.add('fade-t'); 
    newText.classList.add('txt'); 
    
    // 句点の後などに少し隙間が欲しい場合はスペースを足すのもアリです
    newText.textContent = messages[currentIndex] + " "; 
    
    container.appendChild(newText); 
    currentIndex++; 
  } else {
    alert('すべてのメッセージを表示しました！');
  }
});