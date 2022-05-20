// // import axios from 'axios';


// document.getElementById("test-btn").addEventListener('click', async () => {
//     console.log("Popup DOM fully loaded and parsed");

//     function modifyDOM() {
//         const firstLoginButton = document.querySelector("div.logged-out div button:first-child");
//         firstLoginButton.addEventListener("click", () => {
//             setTimeout(() => {
//                 const modal = document.getElementsByClassName("bg-white dark:bg-dark rounded self-center  fixed sm:static inset-0 w-full overflow-y-auto sm:w-screen h-screen sm:h-auto max-w-none sm:max-w-sm items-center justify-start sm:overflow-auto flex flex-col sm:max-h-screen mx-auto")[0];
//                 const secondLoginButton = modal.querySelector("button.contained-primary.w-full.mt-6.leading-6.p-2");
//                 secondLoginButton.addEventListener("click", () => {
//                     setTimeout(() => {
//                         const TFA = modal.querySelector("label");
//                         if(TFA.textContent == "Two-Factor Code") {
//                             // MAKE THE API CALL WITHIN THE BODY OF THIS CONDITION
//                             // NEXT 
//                             // 1. GET THE INPUT FIELD
//                             const TFAInput = modal.querySelector("input#two_factor_code");
//                             // 2.SET THE INPUT FIELD VALUE TO THE RESPONSE FROM THE API CALL ----- FOR NOW HARDCODE IT
//                             TFAInput.value = 123456;
//                         }
//                     }, 2000);
//                 })
//             }, 500);
//         })
//     }
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     chrome.scripting.executeScript(
//         {
//             target: {tabId: tab.id},
//             func: modifyDOM, //argument here is a string but function.toString() returns function's code
//     }, (results) => {
//         // Here we have just the innerHTML and not DOM structure
//         console.log('Popup script:')
//         console.log(results[0]);
//     });
// });