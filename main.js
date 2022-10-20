
const durationSlider = document.getElementById("myRange2");
const labels =["2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041"];
var selectedButton = "trustbtn";
const growbtn = document.getElementById("growbtn");
const trustbtn = document.getElementById("trustbtn");
const pushbtn = document.getElementById("pushbtn");
const mtlinvestval = document.getElementById("mtlinvestval");
const durationval = document.getElementById("durationval");
const slider = document.getElementById("myRange");
const totalAmount = document.getElementById("growthamount");

document.getElementById(selectedButton).style.backgroundColor="rgb(214,214,214)";


  function slidersChanged(element){
     const filledPercentage = 100 * (element.value - element.min)/(element.max-element.min); 
     element.style.backgroundImage = "linear-gradient(to right,#B7CB75 "+ filledPercentage + "%,rgb(214,214,214)"+  filledPercentage + "%)";
  }

  function chartChanged(years){
    const rangeValue =  labels.slice(0,years);
    myChart.config.data.labels = rangeValue;
    myChart.update();
    percentagePerMonth(slider.value);
  }
        
  function growthSelector(element){
    selectedButton = element.id;
    growbtn.style.backgroundColor = "#B7CB75";
    pushbtn.style.backgroundColor = "#B7CB75";
    trustbtn.style.backgroundColor = "#B7CB75";
    element.style.backgroundColor = "rgb(214,214,214)";
    percentagePerMonth(slider.value); 
  }

  function mtlinvestvalUpdate(value){
    mtlinvestval.innerHTML = value + "% / " + Math.trunc(1071.5 * value / 100)+" €";
  }

  function durationvalUpdate(value){
    durationval.innerHTML = value + " Jahre";

  }

   function percentagePerMonth(value){
      let numOfYears = durationSlider.value;
      console.log(numOfYears);
      var savedAmount = (1071.428571 * value / 100);
      let amountPerYear = savedAmount * 12;
      var growthPercentage = 1.0321;

      switch(selectedButton){
        case "growbtn":
          {
            growthPercentage = 1.0526;
            break;
          }
          case "pushbtn":
          {
            growthPercentage = 1.0731;
            break;
          }
          
          default:
          case "trustbtn":
          {
            growthPercentage = 1.0321;
            break;
          }

      }
      myChart.config.data.datasets[0].data = [];
      var finalVal = 0;
      for(let i = 0 ; i < numOfYears; i++)
      {
        var compoundInterest = 0;
        for(let j = 0; j <= i ; j++)
        {
          compoundInterest += Math.pow(growthPercentage,j)
        }
        finalVal = growthPercentage * amountPerYear * compoundInterest ;
        myChart.config.data.datasets[0].data.push(finalVal);
      }
      console.log(finalVal);
      totalAmount.innerHTML = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(Math.trunc(finalVal * 100) / 100);
      
      myChart.update();
    }


        
const data = {
  labels : labels,
  datasets: [{
  data: [],
  backgroundColor: [
    'rgb(183, 203, 117)',
    'rgb(183, 203, 117)',
    'rgb(183, 203, 117)',
    'rgb(183, 203, 117)',
    'rgb(183, 203, 117)',
    'rgb(183, 203, 117)',
    'rgb(183, 203, 117)',
  ],
  borderColor: [
  'rgb(183, 203, 117)',
  'rgb(183, 203, 117)',
  'rgb(183, 203, 117)',
  'rgb(183, 203, 117)',
  'rgb(183, 203, 117)',
  'rgb(183, 203, 117)',
  'rgb(183, 203, 117)',
  ],
  borderWidth: 1,
  borderRadius:100,
  borderSkipped:false,
  barPercentage: .2,
}]
};

// config 
const config = {
type: 'bar',
data,
options: {
  plugins:{
      legend:{
        display:false
      }
  },
  scales: {
    y: {
      beginAtZero: false,
      display:false
    }
  }
}
};

// render init block
const myChart = new Chart(
document.getElementById('myChart'),
config
);

percentagePerMonth(slider.value);
