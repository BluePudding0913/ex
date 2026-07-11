let chartData = null;
let nameOfMainStory = "";
let messages = [];
let currentIndex = 0;

async function initStory() {
  try {
    const chartRes = await fetch('chart.json');
    chartData = await chartRes.json();
    const keys = Object.keys(chartData);
    nameOfMainStory = keys[0];
    const storyRes = await fetch(`story/${nameOfMainStory}.json`);
    const storyData = await storyRes.json();
    messages = storyData.messages;
    
  } catch (error) {
    console.error("データの読み込みに失敗しました: ", error);
  }
}

initStory();

// ボタンクリック時の処理
document.getElementById('text-area').addEventListener('click', async () => {
  if (messages.length === 0) return;

  if (currentIndex < messages.length) {
    let flg = false;
    if (messages[currentIndex] === "_")flg = true;
    
    const container = document.getElementById('text-area');
    if (currentIndex > 0 && !flg)container.replaceChildren();

    if (flg)currentIndex++;
    const newText = document.createElement('span'); 
    newText.classList.add('fade-t', 'txt'); 
    newText.textContent = messages[currentIndex];
    container.appendChild(newText);
    
    currentIndex++; 

  } else {
    const nextStoryName = chartData[nameOfMainStory][0]; 
    if (!nextStoryName)return; // 次のストーリーが存在しない場合は終了
    try {
      const response = await fetch(`story/${nextStoryName}.json`);
      const data = await response.json();
      messages = data.messages;
      currentIndex = 0;
      nameOfMainStory = nextStoryName;
      document.getElementById('text-area').replaceChildren();
    } catch (error) {
      console.error("次のストーリーの読み込みに失敗しました: ", error);
    }
  }
});