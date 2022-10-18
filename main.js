
var durationSlider = document.getElementById("myRange2");
const labels =["2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037"];
var selectedButton = "trustbtn";
const growbtn = document.getElementById("growbtn");
const trustbtn = document.getElementById("trustbtn");
const pushbtn = document.getElementById("pushbtn");
document.getElementById(selectedButton).style.backgroundColor="rgb(214,214,214)";


  function slidersChanged(element){
     const filledPercentage = 100*(element.value - element.min)/(element.max-element.min); 
     element.style.backgroundImage = "linear-gradient(to right,#B7CB75 "+ filledPercentage + "%,rgb(214,214,214)"+  filledPercentage + "%)";
  }

  function chartChanged(years){
    const rangeValue =  labels.slice(0,years);
    myChart.config.data.labels = rangeValue;
    myChart.update();
  }
        
  function growthSelector(element){
    selectedButton = element.id;
    growbtn.style.backgroundColor = "#B7CB75";
    pushbtn.style.backgroundColor = "#B7CB75";
    trustbtn.style.backgroundColor = "#B7CB75";
    element.style.backgroundColor = "rgb(214,214,214)";
    percentagePerMonth(document.getElementById("myRange").value); 
  }


   function percentagePerMonth(value){
      let numOfYears = durationSlider.value;
      console.log(numOfYears);
      let savedAmount = (1000 * value) / 100;
      let amountPerYear = savedAmount * 12;
      var growthPercentage = 1.0321;

      switch(selectedButton){
        case "growbtn":
          {
            growthPercentage = 1.0556;
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
        var temp = amountPerYear;
        myChart.config.data.datasets.forEach((dataset) => 
        {
          for(let i = 0 ; i < numOfYears; i++)
          {
            temp = growthPercentage * temp;
            dataset.data[i] = temp;
          }
        });
        myChart.update();
      }


        


const data = {
  labels : labels,
  datasets: [{
  data: [371.556, 383.482, 395.792, 408.497, 421.610, 435.144, 449.112, 463.528, 478.408, 493.764,509.614, 525.973, 542.857,560.282, 578.268, 596.830],
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
      beginAtZero: true,
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

