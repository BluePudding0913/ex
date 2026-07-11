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
    let flg = false;
    if((messages[currentIndex]=="_"))flg = true;
    const container = document.getElementById('text-area');
    //メッセージを削除する
    if (currentIndex > 0 && !flg)container.replaceChildren();

    if(flg)currentIndex++;
    const newText = document.createElement('span'); 
    newText.classList.add('fade-t'); 
    newText.classList.add('txt'); 
    newText.textContent = messages[currentIndex];
    container.appendChild(newText);
    currentIndex++; 
  } else {
    alert('すべてのメッセージを表示しました！');
  }
});