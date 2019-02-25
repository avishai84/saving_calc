
window.salesCalcTest = 'ACTIVE';
window.salesCalcTestSeg = 'A';
window.salesCalc_subtotal_Global = '';
window.salesCalc_savingsAmount_Global = '';
window.salesCalc_subtotalWithCard_Global = '';
var utils = window.optimizely.get('utils');
var wcdSavingsCalcApplyURL = "https://apply.syf.com/eapply/eapply.action?clientCode=OLDNAVY&sitecode=onbcsl0d2";
var brongSavingsCalcContent = '<div class="savings_calc_test-box"><div class="savings_calc_test-Top" style="overflow: hidden;"><div class="savings_calc_test-Card"><span style="display: inline-block;" class="savings_calc_test-cardEnrollmentIcon-ON-CBCC"></span><div class="savings_calc_test-PromotionMessage"><b>Save 20% on Old Navy items</b><br><div>with your first Old Navy Card purchase&#042;</div><div>Open a Card today!</div></div></div><div><div class="savings_calc_test-space savings_calc_test-body-a_universal savings_calc_test-preApprovalCardRow savings_calc_test-border"></div><div class="savings_calc_test-preApprovalCardRow"><span class="savings_calc_test-subTotalTitle savings_calc_test-shippingSubTotalTitle savings_calc_test-body-a_universal savings_calc_test-SubTotalText">Estimated Total</span><span class="savings_calc_test-shippingSubTotal savings_calc_test-body-a_universal savings_calc_test-SubTotal savings_calc_test-SubTotal-Amount"></span></div><div class="savings_calc_test-preApprovalCardRow savings_calc_test-border"><span class="savings_calc_test-subTotalTitle savings_calc_test-shippingSubTotalTitle savings_calc_test-saving savings_calc_test-body-a_universal">Savings</span><span class="savings_calc_test-shippingSubTotal savings_calc_test-saving savings_calc_test-body-a_universal savings_calc_test-Savings-Amount"></span></div></div><div class="savings_calc_test-Bottom"><div class="savings_calc_test-afterBar"><div class="savings_calc_test-total-space"><span class="savings_calc_test-subTotalTitle savings_calc_test-shippingSubTotalTitle savings_calc_test-withcard savings_calc_test-body-a_universal">Estimated Total with Card</span><span class="savings_calc_test-shippingSubTotal savings_calc_test-body-a_universal savings_calc_test-withcard savings_calc_test-FinalTotal-Amount"></span></div><div class="savings_calc_test-button-row"><a class="savings_calc_test-about-offer link">* Offer Details</a><span class="savings_calc_test-shippingSubTotal"><a class="savings_calc_test-getStartedButtonTracker savings_calc_test-getStartedButton savings_calc_test-getStartedButton1" href="' + wcdSavingsCalcApplyURL + '" target="_blank">APPLY NOW</a></span></div></div></div></div></div>';
utils.waitUntil(function() {
  return jQuery('.subTotalSeparator').length > 0;
}).then(function() {


  utils.waitForElement('#shopping-bag-promo-box').then(function(element) {
    document.querySelector('#shopping-bag-promo-box').insertAdjacentHTML('beforeend',brongSavingsCalcContent);
  }).then(function(){
    jQuery('.savings_calc_test-SubTotal-Amount').html(window.salesCalc_subtotal_Global);
    jQuery('.savings_calc_test-Savings-Amount').html(window.salesCalc_savingsAmount_Global);
    jQuery('.savings_calc_test-FinalTotal-Amount').html(window.salesCalc_subtotalWithCard_Global);
  });

  

  setTimeout(function() {
    jQuery('.savings_calc_test-getStartedButtonTracker').on('click', function() {
      wcdLib.trackValue(this, 'savingsCalc_applyNowButton', 'savingsCalc_applyNowButton', 'eVar6');
    });
    jQuery('.savings_calc_test-about-offer').on('click', function() {
      wcdLib.trackValue(this, 'savingsCalc_offerDetails', 'savingsCalc_offerDetails', 'eVar6');
    });
    // Add customer ID and referrer
    if (window.personalizationService && personalizationService.model.referrer) {
      var wcdSavingsCalcReferrer = encodeURIComponent(personalizationService.model.referrer);
    } else if (document.referrer) {
      var wcdSavingsCalcReferrer = document.referrer;
    }
    if (wcdSavingsCalcReferrer) {
      wcdSavingsCalcApplyURL = "https://apply.syf.com/eapply/eapply.action?clientCode=OLDNAVY&sitecode=onbcsl0d2&returnURL=" + wcdSavingsCalcReferrer;
    }
    if (window.personalizationService && personalizationService.model.personalizationData && personalizationService.model.personalizationData.personalizationInfoV1) {
      var wcdSavingsCalcCustomer = personalizationService.model.personalizationData.personalizationInfoV1.customerUUID;
      if (wcdSavingsCalcCustomer && wcdSavingsCalcReferrer) {
        wcdSavingsCalcApplyURL = "https://apply.syf.com/eapply/eapply.action?clientCode=OLDNAVY&sitecode=onbcsl0d2&returnURL=" + wcdSavingsCalcReferrer + "&externalCustomerId=" + wcdSavingsCalcCustomer;
      }
    }
    jQuery('.savings_calc_test-getStartedButton1').attr('href', wcdSavingsCalcApplyURL);
  }, 800);
});
jQuery(document).on('wcd_salesCalc_override:ready', function() {
  var salesCalc_subtotal = parseFloat(window.salesCalc_subtotal_Global.split('$')[1]);
  var salesCalc_savingsAmount = Math.floor(window.salesCalc_nonExcludedItems_subTotal_Global * 20) / 100;
  var salesCalc_subtotalWithCard = (salesCalc_subtotal - salesCalc_savingsAmount);
  window.salesCalc_subtotal_Global = '$' + salesCalc_subtotal.toFixed(2);
  window.salesCalc_savingsAmount_Global = '-$' + salesCalc_savingsAmount.toFixed(2);
  window.salesCalc_subtotalWithCard_Global = '$' + salesCalc_subtotalWithCard.toFixed(2);
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
