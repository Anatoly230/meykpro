import { getTemporaryNotice } from "./alert.js";
const requestURL = './php/action.php';

export default async function sendData(formElements, url = requestURL) {
    const formData = new FormData(formElements);
    let sendResult = false;
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })
    if (response.ok) {
        response
            .json()
            .then((json) => {
                sendResult = json.error === 0;
            })
    } else {
        getTemporaryNotice({
            title: 'Ошибка отправки данных',
            description: 'Возможно сетевая ошибка, можете сами позвонить по номеру 8 985 468 76 51'
        })
    }
    return sendResult;
}