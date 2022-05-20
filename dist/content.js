async function get2FA(){
    try {
      return await fetch('http://localhost:3000/')
        .then(response => 
            response.json()
            )
            .then(data => {return data});
    } catch (error) {
        throw new Error(error)
    }
}


function accessDOM() {
    const firstLoginButton = document.querySelector("div.logged-out div button:first-child");
    firstLoginButton.addEventListener("click", () => { 
        
        setTimeout(() => {
            const modal = document.getElementsByClassName("bg-white dark:bg-dark rounded self-center  fixed sm:static inset-0 w-full overflow-y-auto sm:w-screen h-screen sm:h-auto max-w-none sm:max-w-sm items-center justify-start sm:overflow-auto flex flex-col sm:max-h-screen mx-auto")[0];
            
            const secondLoginButton = modal.querySelector("button.contained-primary.w-full.mt-6.leading-6.p-2");
         
            secondLoginButton.addEventListener("click", () => {
                async function checkLabel() {
                    let k = modal.querySelector("label");
                    if(k.textContent == "Two-Factor Code") {
                    // 1. GET THE INPUT FIELD
                    const TFAInput = modal.querySelector("input#two_factor_code");
                    let theCode = await get2FA();
                    TFAInput.focus()
                    let codeNumber = await theCode.twoFA;
                    TFAInput.value = codeNumber;
                        return;                            
                    }
                    setTimeout(checkLabel, 750);    
                }
                checkLabel();                
                })
        }, 1000);
    })
}

accessDOM();