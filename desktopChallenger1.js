
window.salesCalcTest = 'ACTIVE';
window.salesCalcTestSeg = 'A';
window.salesCalc_subtotal_Global = '';
window.salesCalc_savingsAmount_Global = '';
window.salesCalc_subtotalWithCard_Global = '';
var utils = window.optimizely.get('utils');
// var wcdSavingsCalcApplyURL = "https://apply.syf.com/eapply/eapply.action?clientCode=OLDNAVY&sitecode=onbcsl0d2";
var brongSavingsCalcContent = '<div class="savings_calc_test-box"><div class="savings_calc_test-Top" style="overflow: hidden;"><div class="savings_calc_test-Card"><span style="display: inline-block;" class="savings_calc_test-cardEnrollmentIcon-ON-CBCC"></span><div class="savings_calc_test-PromotionMessage"><b>Save 20% on Old Navy items</b><br><div>with your first Old Navy Card purchase&#042;</div><div>Open a Card today!</div></div></div><div><div class="savings_calc_test-space savings_calc_test-body-a_universal savings_calc_test-preApprovalCardRow savings_calc_test-border"></div><div class="savings_calc_test-preApprovalCardRow"><span class="savings_calc_test-subTotalTitle savings_calc_test-shippingSubTotalTitle savings_calc_test-body-a_universal savings_calc_test-SubTotalText">Estimated Total</span><span class="savings_calc_test-shippingSubTotal savings_calc_test-body-a_universal savings_calc_test-SubTotal savings_calc_test-SubTotal-Amount"></span></div><div class="savings_calc_test-preApprovalCardRow savings_calc_test-border"><span class="savings_calc_test-subTotalTitle savings_calc_test-shippingSubTotalTitle savings_calc_test-saving savings_calc_test-body-a_universal">Savings</span><span class="savings_calc_test-shippingSubTotal savings_calc_test-saving savings_calc_test-body-a_universal savings_calc_test-Savings-Amount"></span></div></div><div class="savings_calc_test-Bottom"><div class="savings_calc_test-afterBar"><div class="savings_calc_test-total-space"><span class="savings_calc_test-subTotalTitle savings_calc_test-shippingSubTotalTitle savings_calc_test-withcard savings_calc_test-body-a_universal">Estimated Total with Card</span><span class="savings_calc_test-shippingSubTotal savings_calc_test-body-a_universal savings_calc_test-withcard savings_calc_test-FinalTotal-Amount"></span></div><div class="savings_calc_test-button-row"><a class="savings_calc_test-about-offer link">* Offer Details</a><span class="savings_calc_test-shippingSubTotal"><a class="savings_calc_test-getStartedButtonTracker savings_calc_test-getStartedButton savings_calc_test-getStartedButton1">APPLY NOW</a></span></div></div></div></div></div>';

/*
    SDP (Secure Data Package) Update code
    1. Getting SDP via API.
    2. Adding the SDP response to the hidden form input.
    3. Submitting form via POST method which will redirect to Credit Card page on a new tab.
    4. SDP string will be submitted via form query not in URL.
*/ 

var brand_name = "";  
var cs_link_d_apply_now="";
var clientFormCodeURL = "";
var domainOrig = window.location.hostname;
var whichBrand='';    

//dynamic brand attribute
    function isBrand(arr){
      arr = domainOrig.split('.');
      var firstElement='';
      if(arr[0] === 'www'){
        firstElement = arr.shift();
        firstElement = arr.join('');
        whichBrand = firstElement;
        return whichBrand;
      }
    }isBrand(domainOrig);
  
var regexBrandTest = /^\w{3}/gmi;
    whichBrand = whichBrand.match(regexBrandTest);


  switch(whichBrand[0]) {
    case "gap":
       clientFormCodeURL = "GAP";
       brand_name = "gap"; 
      break;
    case "old":
     clientFormCodeURL = "OLDNAVY";
     brand_name = "on"; 
      break;
    case "ban":
     clientFormCodeURL = "BANANA%20REP";
     brand_name = "br"; 
    break;  
    case "ath":
     clientFormCodeURL = "ATHLETA";
     brand_name = "at"; 
      break;
    case "hil":
     clientFormCodeURL = "";
     brand_name = ""; 
    break;
    case "ono":
     clientFormCodeURL = "OLDNAVY";
     brand_name = "on"; 
      break;
    default:
     clientFormCodeURL = "";
     brand_name = ""; 
  }


/*

    test: {
        gap: 'https://dapply.syf.com/eapply/eapply.action?clientCode=GAP',
        on: 'https://dapply.syf.com/eapply/eapply.action?clientCode=OLDNAVY',
        br: 'https://dapply.syf.com/eapply/eapply.action?clientCode=BANANA%20REP',
        at: 'https://dapply.syf.com/eapply/eapply.action?clientCode=ATHLETA',
    },
    prod: {
        gap: 'https://apply.syf.com/eapply/eapply.action?clientCode=GAP',
        on: 'https://apply.syf.com/eapply/eapply.action?clientCode=OLDNAVY',
        br: 'https://apply.syf.com/eapply/eapply.action?clientCode=BANANA%20REP',
        at: 'https://apply.syf.com/eapply/eapply.action?clientCode=ATHLETA',
    }
}
*/ 

// Creating a hidden form
function createFormHidden(){
var form = document.createElement('form');
    form.action = "https://dapply.syf.com/eapply/eapply.action?clientCode="+clientFormCodeURL;
    form.method = "POST";
    form.target = "_blank";
    form.classList.add("sdp_saving_calc");
    form.setAttribute("style","visibility:hidden;position:absolute;left:5000em");
    document.querySelector('body').append(form);
    appendHiddenInput();
}
// Creating input field in form 
function appendHiddenInput(){
    var input = document.createElement('input');
        input.type = "hidden";
        input.name= "sdp";
        document.querySelector('.sdp_saving_calc').appendChild(input);
}

window.addEventListener('DOMContentLoaded', function(event){
    createFormHidden();
});

 var getSDP = function(){
  //API call for SDP
  if(cs_link_d_apply_now.length !== 0){
    fetch(cs_link_d_apply_now).then(function(response){ 
      return response.json()})
       .then(function(response){
         var form = document.querySelector('.sdp_saving_calc');
         var inpt = form.querySelector('input[name="sdp"]');
           if(response.SDP){
             // append the results to a hidden input value on the form and POST submit form 
                 inpt.value = response.SDP;
                 form.submit();
               }else{
                 //if no SDP empty string is ok
                 inpt.value = '';
                 form.submit();
               }
           });
          }
        };

//   Waiting for Personalization service
  var waitForPersonalization = window.setInterval(isPersAvailable, 800);
  function isPersAvailable(){
     if (window.personalizationService && personalizationService.model.personalizationData && personalizationService.model.personalizationData.personalizationInfoV1) {
        clearInterval(waitForPersonalization);
            (function(){
                var custmrPZID = personalizationService.model.personalizationData.personalizationInfoV1.customerUUID;
                cs_link_d_apply_now = window.location.origin+"/credit-card-accept/digital-applications/"+brand_name+"?&returnURL="+window.location.origin+"/&externalCustomerId="+custmrPZID;
                return cs_link_d_apply_now;
            }());
        }
    }

// END SDP Update code 

utils.waitUntil(function() {
  return jQuery('.subTotalSeparator').length > 0;
}).then(function() {
  utils.waitForElement('#shopping-bag-promo-box').then(function(element) {
    document.querySelector('#shopping-bag-promo-box').insertAdjacentHTML('beforeend',brongSavingsCalcContent);
  }).then(function(){
    jQuery('.savings_calc_test-SubTotal-Amount').html(window.salesCalc_subtotal_Global);
    jQuery('.savings_calc_test-Savings-Amount').html(window.salesCalc_savingsAmount_Global);
    jQuery('.savings_calc_test-FinalTotal-Amount').html(window.salesCalc_subtotalWithCard_Global);  
    // click event 
    document.querySelector('.savings_calc_test-box .savings_calc_test-getStartedButton1').addEventListener('click',function(e){getSDP();},false);
    });

  setTimeout(function() {
    jQuery('.savings_calc_test-getStartedButtonTracker').on('click', function() {
      wcdLib.trackValue(this, 'savingsCalc_applyNowButton', 'savingsCalc_applyNowButton', 'eVar6');
    });
    jQuery('.savings_calc_test-about-offer').on('click', function() {
      wcdLib.trackValue(this, 'savingsCalc_offerDetails', 'savingsCalc_offerDetails', 'eVar6');
    });
  });
});


jQuery(document).on('wcd_salesCalc_override:ready', function() {
  // var salesCalc_subtotal = parseFloat(window.salesCalc_subtotal_Global.split('$')[1]);

  // var salesCalc_savingsAmount = (salesCalc_nonExcludedItems_subTotal * 30) / 100;

  // salesCalc_savingsAmount = Math.floor(salesCalc_savingsAmount * 100) / 100; 

  // var salesCalc_subtotalWithCard = Math.floor((salesCalc_subtotal - salesCalc_savingsAmount) * 100) / 100;

  // window.salesCalc_subtotal_Global = '$' + salesCalc_subtotal.toFixed(2);
  // window.salesCalc_savingsAmount_Global = '-$' + salesCalc_savingsAmount.toFixed(2);
  // window.salesCalc_subtotalWithCard_Global = '$' + salesCalc_subtotalWithCard.toFixed(2);
  //assign values to display
  if (window.salesCalc_savingsAmount_Global && parseFloat(window.salesCalc_savingsAmount_Global.split('-$')[1]) > 4.99) {
    jQuery('.savings_calc_test-SubTotal-Amount').html(window.salesCalc_subtotal_Global);
    jQuery('.savings_calc_test-Savings-Amount').html(window.salesCalc_savingsAmount_Global);
    jQuery('.savings_calc_test-FinalTotal-Amount').html(window.salesCalc_subtotalWithCard_Global);
    var salesCalc_finalSavings = parseFloat(window.salesCalc_savingsAmount_Global.split('-$')[1]);
    var salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$5';
    jQuery(".savings_calc_test-box").show();
    if (salesCalc_finalSavings > 49.99) {
      salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$50+';
    } else if (salesCalc_finalSavings > 39.99) {
      salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$40';
    } else if (salesCalc_finalSavings > 29.99) {
      salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$30';
    } else if (salesCalc_finalSavings > 19.99) {
      salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$20';
    } else if (salesCalc_finalSavings > 14.99) {
      salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$15';
    } else if (salesCalc_finalSavings > 9.99) {
      salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$10';
    }
    setTimeout(function() {
      wcdLib.trackValue(this, salesCalc_finalSavingsString, salesCalc_finalSavingsString, 'eVar6');
    }, 1200);
  } else {
    var salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$0';
    setTimeout(function() {
      wcdLib.trackValue(this, salesCalc_finalSavingsString, salesCalc_finalSavingsString, 'eVar6');
    }, 1200);
    jQuery(".savings_calc_test-box").hide();
  }
});
