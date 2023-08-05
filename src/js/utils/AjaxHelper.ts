export let httpRequest: XMLHttpRequest;

// https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX

export function makeRequest(
    method: string,
    url: string,
    body?: XMLHttpRequestBodyInit,
    onreadystatechange?: (this: XMLHttpRequest, ev: Event) => any
): boolean {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert("Giving up :( Cannot create an XMLHTTP instance");
        return false;
    }
    httpRequest.onreadystatechange = onreadystatechange;
    httpRequest.open(method, url);
    httpRequest.send(body);
    return true;
}