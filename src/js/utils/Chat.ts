import { httpRequest, makeRequest } from "./AjaxHelper";

let div: HTMLDivElement;

export function createDomElements() {
    div = <HTMLDivElement> document.createElement("div");

    div.style.width = "1024px";
    div.style.maxWidth = "1024px";
    div.style.height = "120px";
    div.style.maxHeight = "120px";
    div.style.padding = "0";
    div.style.margin = "0";
    div.style.overflow = "auto";

    let btn: HTMLButtonElement = <HTMLButtonElement> document.createElement("button");
    btn.addEventListener('click', (e: Event) => makeRequest(
        `http://127.0.0.1:3000?millis=1691243420756`,
        (): void => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    processHttpRequest();
                } else {
                    alert("There was a problem with the request.");
                }
            }
        }
    ));
    btn.textContent = "GET";

    document.body?.appendChild(div);
    document.body?.appendChild(btn);
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