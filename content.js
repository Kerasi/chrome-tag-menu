let menuIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#cccccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20px" height="20px"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>';

let earthIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:v="https://vecta.io/nano" viewBox="0 0 190.5 190.5" width="20px" height="20px"><g transform="translate(90.669 -507.469)"><path d="M4.583 650.342c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z" fill="#fff" clip-path="none" mask="none"/><path d="M-36.664 626.539l-41.24-71.43c-8.362 14.479-12.765 30.904-12.765 47.625s4.401 33.146 12.762 47.625 20.387 26.503 34.868 34.86 30.908 12.755 47.628 12.75l41.24-71.43v-.011c-4.177 7.244-10.188 13.26-17.428 17.443a47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z" fill="#229342" clip-path="none" mask="none"/><path d="M45.826 626.536l-41.239 71.43c16.72.003 33.146-4.398 47.626-12.757s26.504-20.384 34.863-34.865a95.24 95.24 0 0 0 12.755-47.627c-.003-16.72-4.408-33.145-12.772-47.623H4.58l-.01.007a47.62 47.62 0 0 1 23.819 6.372c7.243 4.179 13.257 10.19 17.439 17.431a47.62 47.62 0 0 1-.001 47.633z" fill="#fbc116" clip-path="none" mask="none"/><path d="M4.583 640.43c20.824 0 37.705-16.881 37.705-37.706s-16.881-37.705-37.705-37.705-37.705 16.881-37.705 37.705 16.881 37.706 37.705 37.706z" fill="#1a73e8" clip-path="none" mask="none"/><path d="M4.583 555.097h82.479c-8.358-14.481-20.381-26.507-34.861-34.868a95.23 95.23 0 0 0-47.625-12.76c-16.72.001-33.145 4.404-47.623 12.767a95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633c4.179-7.242 10.193-13.256 17.434-17.436s15.456-6.381 23.818-6.379z" fill="#e33b2e" clip-path="none" mask="none"/></g></svg>'

// 控制显隐
document.addEventListener('keydown', function (e) {

  if (e.altKey && e.key === 't' || e.altKey && e.key === 'T') {
    let tabContainer = document.getElementById('tab-container');
    tabContainer.style.display = tabContainer.style.display === 'none' ? 'block' : 'none';
  }

})

// 监听并创建元素
chrome.runtime.onMessage.addListener(function (tabs) {

  console.log(tabs, 'wawww')

  let tabContainer = document.getElementById('tab-container') || createTabContainer();
  let tabContent = document.getElementById('tab-content');

  // 重置内容
  tabContent.innerHTML = '';

  // 标签文档
  let fragment = document.createDocumentFragment();

  // 遍历标签
  for (let tab of tabs) {
    let tabBox = document.createElement('div');
    let tabLink = document.createElement('div');
    let tabIcon = document.createElement('div');

    tabBox.id = 'tab-box';
    tabLink.id = 'tab-link';
    tabIcon.id = 'tab-icon';

    tabLink.textContent = tab.title;
    tabIcon.innerHTML = tab.favIconUrl ? `<img src=${tab.favIconUrl} width="20px" height="20px" />` : earthIcon;

    tab.active ? tabLink.style.color = '#007BFF' : '';

    tabLink.onclick = function () {
      chrome.runtime.sendMessage({ activateTabId: tab.id });
      tabLink.style.color = '#007BFF'
      return false;
    };

    tabBox.appendChild(tabIcon);
    tabBox.appendChild(tabLink);
    console.log(tabBox, 'what is tabBox look like');
    fragment.appendChild(tabBox);
  }

  // 最后更新 HTML
  tabContent.appendChild(fragment);

});

// 创建容器
function createTabContainer() {

  let tabBtn = document.createElement('div');
  tabBtn.id = 'tab-button';
  tabBtn.innerHTML = menuIcon;

  tabContent = document.createElement('div');
  tabContent.id = 'tab-content';

  tabContainer = document.createElement('div');
  tabContainer.id = 'tab-container';
  document.body.appendChild(tabContainer);

  tabContainer.appendChild(tabBtn);
  tabContainer.appendChild(tabContent);
  // tabContainer.style.display = 'none';
  return tabContainer;
}

