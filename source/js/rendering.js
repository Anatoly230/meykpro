const changeInfo = [
  { class: '.picture__img', target: 'src', source: 'url' },
  { class: '.picture__likes', target: 'textContent', source: 'likes' },
  { class: '.picture__comments', target: 'textContent', source: 'comments.length' },
  { class: '.picture__comments', target: 'dataset.id', source: 'id' }
]


function removeIfContains(elem, classTitle) {
  if (elem.classList.contains(classTitle)) {
      elem.classList.remove(classTitle)
  }
}


function getOut(start, path) {
  if (Array.isArray(path)) {
    return path[0];
  }
  let current = start;
  path.split('.').forEach(function (item) {
    current = current[item]
  })
  return current;
}

function assignToElement(start, path, value) {
  let parse = path.split('.');
  let current = start;
  let i;
  for (i = 0; i < parse.length; i++) {
    if (i === parse.length - 1) {
      current[parse[i]] = value;
    } else {
      current = current[parse[i]];
    }
  }
}


function changeDOM(parent, datas, classesAndValues) {
  datas.forEach(function (data) {
    classesAndValues.forEach(function (item) {
      value = getOut(data, item.source);
      assignToElement(parent.querySelector(item.class), item.target, value);
    })
  })
}

function addToDOM(parent, sample, datas, classesAndValues) {
  let elementStorage = document.createDocumentFragment(),
    element,
    value;
  datas.forEach(function (data) {
    element = sample.cloneNode(true);
    classesAndValues.forEach(function (item) {
      value = getOut(data, item.source);
      assignToElement(element.querySelector(item.class), item.target, value);
    })
    elementStorage.appendChild(element)
  })
  parent.appendChild(elementStorage)
};


export { addToDOM, changeDOM, removeIfContains };

