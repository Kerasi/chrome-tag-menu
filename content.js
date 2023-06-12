document.addEventListener('keydown', function (e) {

  if (e.altKey && e.key === 't' || e.altKey && e.key === 'T') {
    let tabContainer = document.getElementById('tab-container');
    tabContainer.style.display = tabContainer.style.display === 'none' ? 'block' : 'none';
  }

})

chrome.runtime.onMessage.addListener(function (tabs) {
  let tabContainer = document.getElementById('tab-container') || createTabContainer();
  let tabContent = document.getElementById('tab-content');

  // 重置内容
  tabContent.innerHTML = '';

  // 标签文档
  let fragment = document.createDocumentFragment();

  // 遍历标签
  for (let tab of tabs) {
    let tabLink = document.createElement('div');
    tabLink.textContent = tab.title;

    if (tab.active) {
      tabLink.style.color = '#007BFF'
    }

    tabLink.onclick = function () {
      chrome.runtime.sendMessage({ activateTabId: tab.id });
      tabLink.style.color = '#007BFF'
      return false;
    };

    fragment.appendChild(tabLink);
  }

  // 最后更新 HTML
  tabContent.appendChild(fragment);

});

// 创建容器
function createTabContainer() {

  let tabBtn = document.createElement('div');
  tabBtn.id = 'tab-button';
  tabBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#cccccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20px" height="20px"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>'

  tabContent = document.createElement('div');
  tabContent.id = 'tab-content';

  tabContainer = document.createElement('div');
  tabContainer.id = 'tab-container';
  document.body.appendChild(tabContainer);

  tabContainer.appendChild(tabBtn);
  tabContainer.appendChild(tabContent);
  tabContainer.style.display = 'none';
  return tabContainer;
}

