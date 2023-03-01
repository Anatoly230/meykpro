function pathDetected(str) {
    if (str.split(',').length > 1) {
        return str.split(',').reduce(function (accum, item) {
            return accum += `, ${getFullPath(item)}`;
        }, '')
    }
    return getFullPath(str)
}


function getStringStart(str) {
    return str.split('').slice(0, str.lastIndexOf('/') + 1).join('')
}

function getFullPath(surcePath) {
    return getStringStart(surcePath) + getFileName(surcePath) + '-full' + getStringEnd(surcePath);
}

function switchChar(str) {
    if (str.lastIndexOf('@') === -1) {
        return '.'
    }
    return '@';
}

function getStringEnd(str) {
    let end = switchChar(str);
    return str.split('').slice(str.lastIndexOf(end), str.length).join('')
}

function getFileName(str) {
    let end = switchChar(str);
    return str.split('').slice(str.lastIndexOf('/') + 1, str.lastIndexOf(end)).join('');
}

export {pathDetected};