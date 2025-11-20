// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
// utils.mjs
export function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (!data) {
        return null;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("Error parsing data from localStorage for key:", key, e);
        // Retorna null o un valor seguro para que el resto del código pueda continuar
        return null; 
    }
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function getParam(param){
  const queryString =window.location.search;
  // Get the only the string of the query not the URL
  const urlParams= new URLSearchParams(queryString)
  // Params that you can analize
  // Get Values and append values
  return urlParams.get(param)
  // Return the value of the param that you stablished like param
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position="afterbegin",
  clear=false
){
  const htmlStrings =list.map(templateFn)
  const combinedHtml=htmlStrings.join('');
  if(clear){
    parentElement.innerHTML='';
  }
  parentElement.insertAdjacentHTML(position,combinedHtml);
}