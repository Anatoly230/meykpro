const galeryPath = './img/portfolio/micflags/'
const galeryAlt = 'кубик на микрофон типа'

// const allImages = [
//   standImages,
//   prsmVlImages,
//   prsmVaImages,
//   prsmImages,
//   euImages,
//   customImages,
// ]

const galerySettings = {
  devices: [false],
  pictureTypes: ['webp', 'jpeg'],
  imageType: 'jpeg',
  screens: ['1x', '2x'],
  path: galeryPath,
  picClass: 'portfolio',
  width: '130',
  height: '112',
  alt: galeryAlt,
}



class ImageGenerate {
  constructor(obj) {
    this.devices = obj.devices;
    this.screens = obj.screens;
    this.path = obj.path;
    this.width = obj.width;
    this.height = obj.height;
    this.pictureTypes = obj.pictureTypes;
    this.imgType = obj.imageType;
    this.alt = obj.alt;
    this.picture = null;
    this.image = null;
    this.picClass = obj.picClass;
  }
  #setPicture(data, picture = false) {
    let names = data.name;
    if (picture) {
      names = [`${names}-full`, names]
    }
    return {
      devices: this.devices,
      type: data.type,
      screens: this.screens,
      names: names,
      path: this.path,
      pictureClass: this.picClass,
    }
  }
  #setImage(data) {
    return {
      path: this.path,
      imageClass: this.picClass,
      screens: this.screens.length > 1 ? `${this.screens.length}` : '1',
      type: this.imgType,
      name: data.names,
      width: this.width,
      height: this.height,
      alt: this.alt,
      dataType: data.type,
    }
  }
  getImage(data, picture = false) {
    console.log(picture)
    return [
      this.#setPicture(data, picture),
      this.#setImage(data)
    ]
  }
}

let imageFabric = new ImageGenerate(galerySettings)
// console.log(imageFabric)