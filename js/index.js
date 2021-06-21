// Full Name
var fullName = document.querySelector("#full-name")
var fullNameError = document.querySelector("#full-name-error")

// Email
var email = document.querySelector("#email")
var emailError = document.querySelector("#email-error")

// Phone numbers
var phone = document.querySelector("#phone")
var phoneError = document.querySelector("#phone-error")

// Icon 
var icon = document.querySelector("#icon")

// Address
var address = document.querySelector("#address")

// Submit
var submit = document.querySelector("#submit")

// Submit
var otpSubmit = document.querySelector("#otpSubmit")
var otpInput = document.querySelector("#otp")
var otpForm = document.querySelector("#otpForm")
var form1 = document.querySelector("#form-1")
var submitInfo = document.querySelector("#submit-info")
var section2 = document.querySelector(".section-2")
var user = document.querySelector("#user")
var phoneNumber = document.querySelector("#phone-number")

otpSubmit.addEventListener("click", () => {

    if (otpInput.value == otp) {
        otpForm.action = "http://pixel6.co/"
    } else {
        otpForm.action = "http://pixel6.co/notfound"
    }
})

fullName.addEventListener("input", (e) => {
    submitInfo.innerText = ""
    var inputWords = e.target.value.split(" ");
    var filteredWords = inputWords.filter(e => e !== '');
    user.innerText = filteredWords[0];
    if (filteredWords.length < 2)
        fullNameError.innerHTML = "min words should be 2"
    else {
        fullNameError.innerHTML = ""
        for (let index = 0; index < filteredWords.length; index++) {
            if (/\d/.test(filteredWords[index]))
                fullNameError.innerHTML = "numbers are not allowed";
            else {
                if (filteredWords[index].length < 4)
                    fullNameError.innerHTML = "min chars for each words should be 4";
                else
                    fullNameError.innerHTML = ""
            }
        }
    }
})

email.addEventListener("input", (e) => {
    submitInfo.innerText = ""
    var inputString = e.target.value
    if (!validateEmail(inputString))
        emailError.innerHTML = "Invalid email"
    else
        emailError.innerHTML = ""

})

phone.addEventListener("input", (e) => {
    submitInfo.innerText = ""
    var inputString = e.target.value

    phoneError.innerHTML = ""

    if (inputString.length == 3) {
        phone.value = "(" + phone.value + ")-";
    } else if (inputString.length == 9) {
        phone.value = phone.value + "-";
    } else if (inputString.length > 14) {
        phoneError.innerHTML = "number should be 10 digits";
    }
    if (!/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(inputString)) {
        phoneError.innerHTML = "invalid numbers"
    } else {
        phoneNumber.innerText = phone.value;
        if (inputString.length >= 3) {
            phoneError.innerHTML = ""
            var provider = '';
            var paresedInt = parseInt(phone.value[1] + phone.value[2] + phone.value[3]);
            if (paresedInt <= 799 && paresedInt >= 621) {
                provider = "Jio"
                icon.style.display = "block";
                icon.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Reliance_Jio_Logo_%28October_2015%29.svg')"

            } else if (paresedInt <= 920 && paresedInt >= 801) {
                provider = "Idea"
                icon.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/c/cf/Idea_Cellular_Logo.svg')"
            } else if (paresedInt <= 999 && paresedInt >= 921) {
                provider = "Vodafone"
                icon.style.backgroundImage = "url('https://i1.wp.com/www.logotaglines.com/wp-content/uploads/2017/03/voda-fone-logo.jpg?fit=741%2C600&ssl=1')"
            } else {
                icon.style.display = "none";
                icon.style.backgroundImage = ''
                phoneError.innerHTML = "invalid numbers"
            }


            if (phoneError.innerHTML == "") {
                address.innerHTML = provider;
            }
        }
        if (inputString.length >= 6) {
            var stateParsed = parseInt(phone.value[6] + phone.value[7] + phone.value[8]);
            var index = statesCodes.findIndex((state) => state == stateParsed)
            if (index != -1) {
                if (phoneError.innerHTML == "") {
                    address.innerHTML += "," + states[index]
                }
            } else {
                phoneError.innerHTML = "invalid numbers"
            }
        }

    }

})
var otp = ""
submit.addEventListener("click", (e) => {
    e.preventDefault()
    if (form1.checkValidity()) {
        otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        console.log("OTP SENT " + otp);
        section2.style.display = "flex";
    } else {
        submitInfo.innerText = "Enter all field!";
    }
})

var statesCodes = [
    100, 200, 300, 400, 500
]
var states = [
    "Maharastra", "UP", "MP", "Delhi", "Gujrat"
]


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}