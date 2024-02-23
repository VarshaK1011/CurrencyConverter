const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdowns=document.querySelectorAll(".dropdown select");
for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==='from' && currCode==='USD')
        {
            newOption.selected='USD'
        }
        if(select.name==='to' && currCode==='INR')
        {
            newOption.selected='INR'
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
   let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newsrc
}
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const btn=document.querySelector("button");
let display=document.querySelector(".msg");
btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();//which prevent all the default works that happen
    let amount=document.querySelector(".amount input");
    let amountvalue=amount.value;
    if(amountvalue<1)
    {
        amountvalue=1;
        amount.value=1;
    }
    const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let reqrate=amountvalue*rate;
    
    display.innerText=`${amountvalue}${fromCurr.value} = ${reqrate}${toCurr.value}`;
    console.log(rate);
});