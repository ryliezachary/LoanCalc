//Liste for submit
document.querySelector('#loan-form').addEventListener('submit',function(e){
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults,1000);

  e.preventDefault();
});

//calculate results

function calculateResults(e){
   //UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value / 100 / 12);
  const calculatedPayments = parseFloat(years.value * 12);

  //Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);

  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  }else{

    showError('Please check your numbers');

  }
}

function showError(error){
  //Create a div
  const errorDiv = document.createElement('div');

  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //add class
  errorDiv.className = 'alert alert-danger';
  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));


  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 1000);

}

//Clear error
function clearError(){
  document.querySelector('.alert').remove();
  document.getElementById('loading').style.display = 'none';
}