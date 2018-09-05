export function validateOrder(formvalues) {
  if (formvalues) {
    let resultDiscount = 0;
    let resultCreditCharge = 0;
    let grandtotal = 0;
    let { total, discount, credit, credit_charge, receivecash } = formvalues;

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
        grandtotal = grandtotal - credit;
      }
    }

    formvalues.discount = resultDiscount;
    formvalues.discountPercent = DC;

    formvalues.grandtotal = grandtotal;
    formvalues.cash = grandtotal;
    formvalues.credit = credit ? Number(credit) : 0;
    formvalues.creditchargePercent = credit_charge_temp;
    formvalues.changecash = receivecash - grandtotal;
    formvalues.creditcharge = resultCreditCharge;
    formvalues.receivecash = Number(receivecash);
  }

  return formvalues;
}
