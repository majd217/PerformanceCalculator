
const durationSlider = document.getElementById("myRange2");
const labels =["2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041","2042"];
var selectedButton = "trustbtn";
const growbtn = document.getElementById("growbtn");
const trustbtn = document.getElementById("trustbtn");
const pushbtn = document.getElementById("pushbtn");
const mtlinvestval = document.getElementById("mtlinvestval");
const durationval = document.getElementById("durationval");
const slider = document.getElementById("myRange");
const totalAmount = document.getElementById("growthamount");
const portfolioVal = document.getElementById("portfolioval");
var growthPercentage = 1.0321;
const eingezahltVal = document.getElementById("eingezahltVal");
const renditeVal = document.getElementById("renditeVal");
const gesamtVal = document.getElementById("gesamtVal");



document.getElementById(selectedButton).style.opacity="1.0";

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
    const unselectedopacity = "0.6";
    growbtn.style.opacity = unselectedopacity;
    pushbtn.style.opacity = unselectedopacity;
    trustbtn.style.opacity = unselectedopacity;
    element.style.opacity = "1.0";
    percentagePerMonth(slider.value); 
    const view = (growthPercentage -1)*100;
    portfolioVal.innerHTML = (Math.round(view * 100) / 100)+"%";
    

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
      

      // var formatteDfinalVal = new Intl.NumberFormat("de-DE", {
      //   style: "currency",
      //   currency: "EUR"}).format(Math.round(finalVal * 100) / 100);
      
      //   var formattedEingezahltVal = formatter.format(Math.round(amountsaved * 100) / 100);
      

      myChart.config.data.datasets[0].data = [];
      myChart.config.data.datasets[1].data = [];
      myChart.config.data.datasets[2].data = [];
      var amountsaved = 0;
      var finalVal = 0;
      for(let i = 0 ; i < numOfYears; i++)
      {
        var compoundInterest = 0;
        for(let j = 0; j <= i ; j++)
        {
          compoundInterest += Math.pow(growthPercentage,j)
        }
        finalVal = growthPercentage * amountPerYear * compoundInterest ;
        amountsaved = amountPerYear * (i+1);
        myChart.config.data.datasets[0].data.push((Math.round(amountsaved * 100) / 100));
        myChart.config.data.datasets[1].data.push(Math.round((finalVal - amountsaved) * 100) / 100);
        myChart.config.data.datasets[2].data.push(Math.round(finalVal * 100) / 100);

      }
      console.log(finalVal);
      totalAmount.innerHTML = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(Math.round(finalVal * 100) / 100);
      eingezahltVal.innerHTML = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(amountsaved) ;
      gesamtVal.innerHTML =  new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(finalVal);
      renditeVal.innerHTML =  new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format((finalVal - amountsaved));
      
      myChart.update();
    }
     

    const commonStyles =
    {
      barThickness: 7,
      borderRadius: 50,
      borderSkipped: false,
    }

    // const labelToolTip = [data.datasets[0].data,data.datasets[2].data,data.datasets[2].data];
    const data = {
      labels : labels,
      datasets: [

        {
          data: [],
          backgroundColor: '#48348A',
          fillColor: '#48348A',
            ...commonStyles,
        },
        {
          data: [],
          backgroundColor: 'transparent',
          fillColor :'transparent',
          borderColor: 'transparent',
            ...commonStyles,
        },
        {
          data: [],
          backgroundColor: '#B7CB75',
          borderColor: '#B7CB75',
          fillColor:'#B7CB75',
            ...commonStyles,
        }
    ]
    };

    const customTitle = {
      id: 'customTitle',
      beforeLayout: (chart, args, opts) => {
        const { ctx } = chart;   
        if (opts.x.display == true) {
          ctx.font = opts.x.font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif'
          const { width } = ctx.measureText(opts.x.text);
          chart.options.layout.padding.right = width * 1.3;
        }

        if (opts.y.display == true) {
          ctx.font = opts.y.font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif'
          const { fontBoundingBoxAscent,fontBoundingBoxDescent } = ctx.measureText(opts.y.text);
          let height = fontBoundingBoxAscent + fontBoundingBoxDescent;
          chart.options.layout.padding.top = height * 2;
        }

      },
      afterDraw: (chart, args, opts) => {
        const { ctx, scales: { x, y }, chartArea: { top, bottom, left, right } } = chart;
        
        if (opts.x.display) {
          ctx.fillStyle = opts.x.color || Chart.defaults.color
          ctx.font = opts.x.font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif'
          ctx.fillText(opts.x.text, (right + (opts.x.offsetX || 0)), (bottom + ((opts.x.offsetY * -1) || 0)))
        }
        
        if(opts.y.display) {
          ctx.fillStyle = opts.y.color || Chart.defaults.color
          ctx.font = opts.y.font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif'
          ctx.fillText(opts.y.text, opts.y.offsetX || 3, (top + ((opts.y.offsetY * -1) || -15)))
        }
      }
    }

    const options = {
      plugins: { 
        tooltip: {
          callbacks: {
              label: function(context) {
                if (context.parsed.y !== null) {
                      return new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(context.parsed.y);
                }
              },  
          }
        },

        legend: { display: false },
        customTitle: {
          y: {
            display: true,
            text: 'Wert in €',
          },
          x: {
            display: false,
          }
        },
      },
      responsive: true,
      
      interaction: {
            mode: 'index', 
      },
      
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          display: true,
          drawBorder: false,
          lineWidth: 0.5,
          stacked: false,
          grid: {
            display: true,
          },
        },
      },
    };
    // config 
    const config = {
      type: 'bar',
      data:data,
      options:options,
      plugins: [customTitle]
    };

    // render init block
    const myChart = new Chart(
    document.getElementById('myChart'),
    config
    );

    percentagePerMonth(slider.value);

