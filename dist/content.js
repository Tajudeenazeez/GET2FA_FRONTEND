let currentBrowserLocation = window.location.host;
const pattern = new RegExp(/\d{6}/);
async function get2FA(reqUrl){
    console.log(reqUrl);
    try {
    // return await fetch("https://get-ed-2fa.herokuapp.com/")
      return await fetch(`http://localhost:3500?reqUrl=${reqUrl}`)
        .then(response => 
            response.json()
            )
            .then(data => {
                console.log(data);
                return data
            })
            // .catch(error => console.log(error));
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

function accessDOM() {
    console.log(currentBrowserLocation);
    // Device Verification Code
    if(currentBrowserLocation === "github.com"){
        async function getGitHub2FACodeFunction() {
        const gitInputForOTP = document.querySelector("#otp");
        
        if(gitInputForOTP){
            let theGit2FACode = await get2FA('github');
            console.log(theGit2FACode);
            gitInputForOTP.focus()
            let decodedGit2FACode
            try {
                decodedGit2FACode =  window.atob(theGit2FACode)
            } catch (error) { 
            console.log(error); 
            throw new Error(error);
            }
            let gitOTP = decodedGit2FACode.match(pattern);
            console.log(gitOTP);
            gitInputForOTP.value = gitOTP;
            
            }
        }
        getGitHub2FACodeFunction(); 
        
    }else{
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
                    let theCode = await get2FA('educative');
                    console.log('from the educative code',theCode);
                    // TFAInput.focus()
                    let codeNumber = await theCode.twoFA;
                    
                    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(TFAInput, codeNumber);
                    TFAInput.dispatchEvent(new Event('change', { bubbles: true }));
                    return;                            
                    }
                    setTimeout(checkLabel, 750);    
                }
                checkLabel();                
                })
        }, 1000);
    })

}
}

accessDOM();