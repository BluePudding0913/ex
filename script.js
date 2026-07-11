let chartData, nameOfMainStory, messages, choices, currentIndex = 0;
const container = document.getElementById('text-area');
const btnYes = document.getElementById('yes');
const btnNo = document.getElementById('no');

async function loadStory(storyName) {
  const response = await fetch(`story/${storyName}.json`);
  const data = await response.json();
  
  messages = data.messages;
  choices = data.choices || null; // choices配列を取得（エンディングなど存在しない場合を考慮してnullフォールバック）
  
  currentIndex = 0;
  container.replaceChildren();
  
  //ボタン隠す
  btnYes.style.display = 'none';
  btnNo.style.display = 'none';
}

async function initStory() {
  const chartRes = await fetch('chart.json');
  chartData = await chartRes.json();
  
  nameOfMainStory = Object.keys(chartData)[0];
  loadStory(nameOfMainStory);
}

initStory();

// テキストエリアクリック時の処理
container.addEventListener('click', () => {
  if (currentIndex < messages.length) {
    let flg = messages[currentIndex] === "_";
    
    if (currentIndex > 0 && !flg) container.replaceChildren();
    if (flg) currentIndex++;

    const newText = document.createElement('span'); 
    newText.classList.add('fade-t', 'txt'); 
    newText.textContent = messages[currentIndex];
    container.appendChild(newText);
    
    currentIndex++; 
  } else {
    //ボタン表示
    if(chartData[nameOfMainStory]) {
      // jsonにchoicesが設定されていればボタンのテキストを上書きする
      if (choices && choices.length >= 2) {
        btnYes.textContent = choices[0].text;
        btnNo.textContent = choices[1].text;
      }
      
      btnYes.style.display = 'inline-block';
      btnNo.style.display = 'inline-block';
    }
    
  }
});

//[0] のストーリーへ
btnYes.addEventListener('click', () => {
  nameOfMainStory = chartData[nameOfMainStory][0];
  loadStory(nameOfMainStory);
});

//[1] のストーリーへ
btnNo.addEventListener('click', () => {
  nameOfMainStory = chartData[nameOfMainStory][1];
  loadStory(nameOfMainStory);
});