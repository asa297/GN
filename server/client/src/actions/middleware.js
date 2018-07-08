export function validateOrder(formvalues) {
  if (formvalues) {
    let resultDiscount = 0;
    let resultCreditCharge = 0;
    let grandtotal = 0;
    let {
      seller_select,
      total,
      discount,
      credit,
      credit_charge,
      receivecash
    } = formvalues;

    if (!seller_select) {
      formvalues.seller_select = {};
      formvalues.seller_select._id = "507f1f77bcf86cd799439011";
      formvalues.seller_select.sellerName = "";
      formvalues.seller_select.sellerCom = 0;
    }



    const DC = parseInt(discount, 10);
    if (DC > 0 && DC <= 100) {
      resultDiscount = total * (DC / 100);
    }

    const credit_charge_temp = parseInt(credit_charge, 10);
    if (credit_charge_temp > 0 && credit_charge_temp <= 100) {
      resultCreditCharge = credit * (credit_charge_temp / 100);
    }

    if (total) {
      grandtotal = total;
      if (resultDiscount) {
        grandtotal = grandtotal - resultDiscount;
      }
      if (credit && resultCreditCharge) {
        grandtotal = grandtotal - credit + resultCreditCharge;
      }
    }

    formvalues.discount = resultDiscount;

    formvalues.grandtotal = grandtotal;
    formvalues.cash = grandtotal;
    formvalues.credit = credit ? credit : 0
    formvalues.changecash = receivecash - grandtotal;
    formvalues.creditcharge = resultCreditCharge;
  }

  return formvalues;
}
