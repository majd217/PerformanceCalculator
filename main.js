var slider = document.getElementById("myRange");
var output= document.getElementById("value");
output.innerHTML = slider.value;
slider.oninput = function(){
output.innerHTML = this.value;
}
var x = slider.value;
function changed(value){
   var x = slider.value;
   console.log(x);
   slider.style.backgroundImage = "linear-gradient(to right,rgb(188,244,39)"+ x + "%,rgb(214,214,214)"+  +x+ "%)";
}


const labels =["2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037"];

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

