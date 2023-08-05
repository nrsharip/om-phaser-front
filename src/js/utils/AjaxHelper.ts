export let httpRequest: XMLHttpRequest;

// https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX

export function makeRequest(
    url: string, 
    onreadystatechange: (this: XMLHttpRequest, ev: Event) => any
): boolean {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert("Giving up :( Cannot create an XMLHTTP instance");
        return false;
    }
    httpRequest.onreadystatechange = onreadystatechange;
    httpRequest.open("GET", url);
    httpRequest.send();
    return true;
}