
window.salesCalcTest = 'ACTIVE';
window.salesCalcTestSeg = 'A';
window.salesCalc_subtotal_Global = '';
window.salesCalc_savingsAmount_Global = '';
window.salesCalc_subtotalWithCard_Global = '';
jQuery(document).on('wcd_salesCalc_override:ready', function() {
  var salesCalc_subtotal = parseFloat(window.salesCalc_subtotal_Global.split('$')[1]);
  var salesCalc_savingsAmount = Math.floor(window.salesCalc_nonExcludedItems_subTotal_Global * 20) / 100;
  var salesCalc_subtotalWithCard = (salesCalc_subtotal - salesCalc_savingsAmount);
  window.salesCalc_subtotal_Global = '$' + salesCalc_subtotal.toFixed(2);
  window.salesCalc_savingsAmount_Global = '-$' + salesCalc_savingsAmount.toFixed(2);
  window.salesCalc_subtotalWithCard_Global = '$' + salesCalc_subtotalWithCard.toFixed(2);
  //assign values to display
  if (window.salesCalc_savingsAmount_Global && parseFloat(window.salesCalc_savingsAmount_Global.split('-$')[1]) > 4.99) {
    var salesCalc_finalSavings = parseFloat(window.salesCalc_savingsAmount_Global.split('-$')[1]);
    var salesCalc_finalSavingsString = 'savingsCalc_savingsTier_$5';
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
  }
});