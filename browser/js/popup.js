// popup.js
document.getElementById('changeColor').addEventListener('click', function () {
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor = "lightgreen";'
  });
});

