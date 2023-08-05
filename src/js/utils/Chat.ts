import { httpRequest, makeRequest } from "./AjaxHelper";

let div: HTMLDivElement;

export function createDomElements() {
    div = <HTMLDivElement> document.createElement("div");

    div.style.background = "#FAFAFA";
    div.style.width = "1024px";
    div.style.maxWidth = "1024px";
    div.style.height = "120px";
    div.style.maxHeight = "120px";
    div.style.padding = "0";
    div.style.margin = "0";
    div.style.overflow = "auto";

    getMessages();

    let input: HTMLInputElement = <HTMLInputElement> document.createElement("input");
    input.style.width = "1024px";
    input.style.maxWidth = "1024px";
    input.style.padding = "0";
    input.style.margin = "0";
    input.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
            postMessage(input.value);
            input.value = "";
        }      
    });

    // каждые 5 секунд получаем новые сообщения
    setInterval(getMessages, 5000);

    document.body?.appendChild(div);
    document.body?.appendChild(input);
}

function getMessages() {
    makeRequest(
        "GET",
        `http://127.0.0.1:3000`,
        undefined,
        (): void => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    processHttpRequest();
                } else {
                    console.log("Проблема с GET запросом");
                }
            }
        }
    )
}

function postMessage(message: string) {
    makeRequest(
        "POST",
        `http://127.0.0.1:3000`,
        message,
        (): void => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    getMessages();
                } else {
                    console.log("Проблема с POST запросом");
                }
            }
        }
    )
}

function processHttpRequest() {
    console.log(httpRequest.responseText);
    
    try {

        let json: { 
            items: Array<{ 
                millis: number, 
                message: string
            }>
        } = JSON.parse(httpRequest.responseText);

        div.replaceChildren();

        for (let { millis, message } of json.items) {

            let line: HTMLDivElement = <HTMLDivElement> document.createElement("div");

            let date: Date = new Date(0);
            date.setUTCMilliseconds(millis);

            line.textContent += `[${date.toLocaleString()}] ${message} \r\n`;

            div.appendChild(line);

        }

    } catch(e) {
        console.log("Ошибка при парсинге: ", e)
    }
}