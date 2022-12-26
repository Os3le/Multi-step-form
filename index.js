let nextButton = document.querySelector('#next')
let sliderArray = Array.from(document.getElementsByClassName('main-container'))
let pageCounter = 0;
let pageCounterOptions = Array.from(document.querySelectorAll('.illuminate'));
let form1Inputs = Array.from(document.getElementsByClassName('input-tags'))
let form2 = document.getElementById('#two')
let goBack = document.getElementById('go-back');
let toggleSwitch = document.getElementById('toggle-switch');
let price = document.querySelectorAll('.price');
let planPrice;
let yearly = "Yearly";
let monthly = "Monthly";
let planDuration = monthly;
let planTitle;
let planOption;
let getSelectedValue = document.querySelector('input[name="choice"]:checked');

let multiOptionPlanArray;

function illuminateOption() {
    pageCounterOptions[pageCounter].classList.toggle('focus')
};
illuminateOption(pageCounter)

goBack.addEventListener('click', function back1() {
    if (pageCounter == 1) {
        document.getElementById('go-back').style.visibility = "hidden"
        sliderArray[pageCounter].style.display = "none"
    }
    sliderArray[pageCounter].style.display = "none"
    pageCounterOptions[pageCounter].classList.remove('focus')
    pageCounter--;
    pageCounterOptions[pageCounter].classList.add('focus')
    sliderArray[pageCounter].classList.remove('translateX-')

})




function reusableNext() {
    sliderArray[pageCounter].classList.add('translateX-');
    document.querySelector("#small-form-1").classList.remove('display');
    displayNextSlide()
    pageCounterOptions[pageCounter].classList.remove('focus')
    pageCounter++;
    pageCounterOptions[pageCounter].classList.add('focus')
}
function displayNextSlide() {
    setTimeout(() => {
        sliderArray[pageCounter].style.display = "initial";
    }, 800);
}

function checkForm1inputs1() {
    if (form1Inputs.filter(e => e.value == "").length !== 0) {
        document.querySelector("#small-form-1").classList.add('display') //showing the warning prompt
    } else {
        reusableNext()
        document.getElementById('go-back').style.visibility = "visible";
    }
}





function renderYearlyPlans() {
    durationSpan.forEach(e => e.classList.add('duration-yearly'))
    price[0].innerHTML = `$ <span class="price-duration">90</span>/yr`;
    price[1].innerHTML = `$ <span class="price-duration">120</span>/yr`;
    price[2].innerHTML = `$ <span class="price-duration">150</span>/yr`;
}

function rendermonthlyPlans() {
    durationSpan.forEach(e => e.classList.remove('duration-yearly'))
    price[0].innerHTML = `$ <span class="price-duration">9</span>/mo`;
    price[1].innerHTML = `$ <span class="price-duration">12</span>/mo`;
    price[2].innerHTML = `$ <span class="price-duration">15</span>/mo`;
}

function getValues() {
    let userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phone').value,
            title: planTitle,
            price: planPrice,
            duration: planDuration,
            forwardSlashDuration : planDuration === monthly ? "/mo" : "/yr",
            totalDuration: planDuration === monthly ? "Month" : "Year",
            additionalAddOns: Array.from(multiOptionPlanArray)
            
        }
        return userData;
        }



//checking the toggle switch
let durationSpan = document.querySelectorAll(".duration")
toggleSwitch.addEventListener('change', function checkToggle() {
    if (this.checked) {
        console.log('yearly was chosen');
        document.getElementById('main').classList.add('main-height');
        planDuration = yearly;
        document.querySelectorAll('input[name="choice"]').forEach((eachRadioButton) => {
            eachRadioButton.checked = false;
        })
        renderYearlyPlans()

    } else {
        console.log(toggleSwitch.checked);
        console.log('monthly was chosen');
        document.getElementById('main').classList.remove('main-height');
        planDuration = monthly
        document.querySelectorAll('input[name="choice"]').forEach((eachRadioButton) => {
            eachRadioButton.checked = false;
        })
        rendermonthlyPlans()
    }
    checkDuration(planDuration)

})




//checkingplan type
document.querySelectorAll('input[name="choice"]').forEach((eachRadioButton) => {
    eachRadioButton.addEventListener('change', function getVal() {
        planOption = eachRadioButton.parentElement.querySelector('.price-duration').innerHTML;
        planTitle = eachRadioButton.parentNode.querySelector('.title').innerHTML;
        planPrice = Number(planOption)
        if (eachRadioButton.checked) {
            console.log("Radio button is selected");
            console.log(eachRadioButton.parentElement.querySelector('.price-duration').innerHTML);
            document.getElementById('small-form-2').style.display = "none"
            planTitle = eachRadioButton.parentNode.querySelector('.title').innerHTML;
            // planPrice =Number(planOption) 
        } else {
            console.log("Nothing has been selected");
        }

    })

})



let togglechecked = document.querySelector('input[name="toggle"]:checked');
// checking if a plan choice was made in the plan type section
function checkForm1inputs2() {
    console.log(planPrice);
    let checkedRadio = Array.from(document.querySelectorAll('.radio')).filter(eachRadioButton => eachRadioButton.checked == true)
    if (!checkedRadio.length == 0) {
        document.getElementById('small-form-2').style.display = "none"
        reusableNext()
    } else {
        document.getElementById('small-form-2').style.display = "unset"
    }
 

}

//getting the add on choices
function checkForMultiOption() {
    let chosenOPT = Array.from(document.getElementsByClassName('multi-choice')).filter(dut => dut.checked)
    multiOptionPlanArray = chosenOPT;
}
//rendering the form step 3 on the page based on the option of the toggle switch
function checkDuration(planDuration) {
    if (planDuration == monthly) updateForm3mo()
    else if (planDuration == yearly) updateForm3Yr()
}



function renderStep4() {
    let currentUserObject = getValues()
    let {
        title,
        price,
        duration,
        forwardSlashDuration,
        totalDuration,
        additionalAddOns
    } = currentUserObject
    console.log(duration);
    
    let chosen = additionalAddOns.map((e) => {
        return  `<li class="charges">
                  <span class="charge">${e.parentNode.querySelector('.right').querySelector('.title').innerHTML}</span>
                  <span class="charge-cost float-left">+<span class="cost">$${e.parentNode.querySelector('.pricing-per-month').querySelector('.price').innerHTML}</span>${forwardSlashDuration}</span>
              </li>`
          })

    let addOnPriceNum =  additionalAddOns.map( e => Number(e.parentNode.querySelector('.pricing-per-month').querySelector('.price').innerHTML))
           console.log(addOnPriceNum);
        var sum = addOnPriceNum.reduce(function (x, y) {
            return x + y;
        }, 0);
        console.log(sum);
        let total  = sum + price
        console.log(total);

       
          
    let step4RenderTemplate = ` <div class="description4">
    <h4 class="select-your-plan"> Finishing up</h4>
    <p class="text">Double-check everything looks OK before confirming.</p>
</div>
<div class="finishing-up">
    <div class="top">
        <div class="left">
            <h5 class="plan-name">${title}(${duration})</h5>
            <a id="change">Change</a>
        </div>
        <div class="top-right">
            $<span class="total">${price}</span>${forwardSlashDuration}
        </div>
    </div>
    <ul id="four-list">
    ${chosen.join(' ')}
    </ul>

    <div class="bottom"></div>
</div>
<div class="total-per-month">
    <span class="total">Total(per <span class="total-duration">${totalDuration}</span>)</span> <span class="cost-total float-left"><span class="cost">$${total}</span>${forwardSlashDuration}</span>
</div>`
document.querySelector('#four').innerHTML = step4RenderTemplate


 document.querySelector('#change').addEventListener('click' , function change(){
    console.log('deez' ,pageCounter );

    sliderArray[pageCounter-1].classList.remove('translateX-')
    sliderArray[pageCounter-1].style.display = "none"
    sliderArray[pageCounter].style.display = "none"
    pageCounterOptions[pageCounter].classList.remove('focus')
    pageCounter = 1;
    // pageCounterOptions[2].classList.remove('focus')
    sliderArray[pageCounter].classList.remove('translateX-');
    // sliderArray[pageCounter].style.display = "initial";
    pageCounterOptions[pageCounter].classList.add('focus')
    // sliderArray[pageCounter].style.transform = "translateX(-200%)";
})
}



function updateForm3mo() {
    document.querySelectorAll('.pricing-per-month')[0].querySelector('.price').innerHTML = "1"
    document.querySelectorAll('.pricing-per-month')[1].querySelector('.price').innerHTML = "2"
    document.querySelectorAll('.pricing-per-month')[2].querySelector('.price').innerHTML = "2"
    document.querySelectorAll('.pricing-per-month')[0].querySelector('.duration').innerHTML = "/mo"
    document.querySelectorAll('.pricing-per-month')[1].querySelector('.duration').innerHTML = "/mo"
    document.querySelectorAll('.pricing-per-month')[2].querySelector('.duration').innerHTML = "/mo"
}

function updateForm3Yr() {
    document.querySelectorAll('.pricing-per-month')[0].querySelector('.price').innerHTML = "10"
    document.querySelectorAll('.pricing-per-month')[1].querySelector('.price').innerHTML = "20"
    document.querySelectorAll('.pricing-per-month')[2].querySelector('.price').innerHTML = "20"
    document.querySelectorAll('.pricing-per-month')[0].querySelector('.duration').innerHTML = "/yr"
    document.querySelectorAll('.pricing-per-month')[1].querySelector('.duration').innerHTML = "/yr"
    document.querySelectorAll('.pricing-per-month')[2].querySelector('.duration').innerHTML = "/yr"
}


function checkForm1inputs3() {
console.log("m");
checkForMultiOption()
reusableNext()
console.log(pageCounter);
renderStep4()
console.log('fn 3');

}

function checkForm1inputs4(){
    console.log('fn 4');
     sliderArray[pageCounter].classList.add('translateX-');
    document.querySelector("#small-form-1").classList.remove('display');
    displayNextSlide()
    pageCounterOptions[pageCounter].classList.remove('focus')
    pageCounter++;
   document.getElementById('footer').style.display = 'none'
}

nextButton.addEventListener('click', function firstForm() {
    switch (pageCounter) {
        case 0:
            checkForm1inputs1()
            console.log(pageCounter);
            break;
        case 1:
            checkForm1inputs2()
            console.log(pageCounter);
            break;
        case 2:
            checkForm1inputs3()
            console.log(pageCounter);
            break;
        case 3:
            checkForm1inputs4()
            console.log(pageCounter);
            break;
        default:
            break;
    }

})




