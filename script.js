let chartData, nameOfMainStory, messages, choices, currentIndex = 0;
const clickContainer = document.getElementById('image-area');
const textContainer = document.getElementById('text-area');
const btnYes = document.getElementById('yes');
const btnNo = document.getElementById('no');

async function loadStory(storyName) {
  const response = await fetch(`story/${storyName}.json`);
  const data = await response.json();
  
  messages = data.messages;
  choices = data.choices || null;
  
  currentIndex = 0;
  textContainer.replaceChildren();
  
  //ボタン隠すdisplay: none
  btnYes.style.display = "none";
  btnNo.style.display = "none";

}

async function initStory() {
  const chartRes = await fetch('chart.json');
  chartData = await chartRes.json();
  
  nameOfMainStory = Object.keys(chartData)[0];
  await loadStory(nameOfMainStory);
  clickContainer.click();
}

initStory();

// テキストエリアクリック時の処理
clickContainer.addEventListener('click', () => {
  if (currentIndex < messages.length) {
    let flg = messages[currentIndex] === "_";
    
    if (currentIndex > 0 && !flg) textContainer.replaceChildren();
    if (flg) currentIndex++;

    const newText = document.createElement('span'); 
    newText.classList.add('fade-t', 'txt'); 
    newText.textContent = messages[currentIndex];
    textContainer.appendChild(newText);
    
    currentIndex++; 
  }
  if(chartData[nameOfMainStory] && currentIndex == messages.length) {
  // jsonにchoicesが設定されていればボタンのテキストを上書きする
  if (choices && choices.length >= 2) {
    btnYes.textContent = choices[0].text;
    btnNo.textContent = choices[1].text;
  }
  btnYes.style.display = "inline-block";
  btnNo.style.display = "inline-block";
}
});

// [0] のストーリーへ
btnYes.addEventListener('click', async () => {
  nameOfMainStory = chartData[nameOfMainStory][0];
  await loadStory(nameOfMainStory);
  clickContainer.click();
});

// [1] のストーリーへ
btnNo.addEventListener('click', async () => {
  nameOfMainStory = chartData[nameOfMainStory][1];
  await loadStory(nameOfMainStory);
  clickContainer.click();
});