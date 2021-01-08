<template>
  <div>
      <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
  </div>
</template>



<script>
import VueHighcharts from "vue2-highcharts"
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';


Exporting(Highcharts)

var chartOptions = {
    chart: {
        type : "line",
        width: 350,
        height: 350,
        borderWidth : 3,
        borderColor : "#55C2FF",
        shadow : {
            color: "#000000", 
            offsetX : 3,
            offsetY : 3,
            opacity : 0.1,
            width: 10

            }

    },
    title:{
        text:"Fake news amount"
    },
    xAxis:{
        categories: ["00","01","02","03","04","05","06","07","08","09","10","11",
        "12","13","14","15","16","17","18","19","20","21","22","23"]
    },
    yAxis: {
        min: 0,
        title: {
            text: "Fake News Amount",
            align: "high"
        },
        labels: {
            overflow: "justify"
        }
    },
    plotOptions: {
        bar: {
            dataLabels:{
                enabled: true
            }
        }
    },
    legend: {
        layout: "vertical",
        align: "center",
        verticalAlign: "bottom",
        x: 400,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
        (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF",
        shadow: true,
        width: "5%"

    },
    series: [
    {
      name: "Tweets",
      data: []
    }
  ]
  

}


export default {
    components:{
        VueHighcharts
    },
    
    data(){
        return{
            options: chartOptions

        };
    },

    mounted: function(){
        this.$refs.lineCharts.delegateMethod("showLoading", " #FakeLoading....")

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'

        };
        fetch("https://dev-zephyr-300917.ew.r.appspot.com/fakenewstimes", requestOptions)
        .then(response => response.json())
        .then(result => {
            this.$refs.lineCharts.addSeries({
                name: "tweets",
                data: result.dataframe
                });
            this.$refs.lineCharts.hideLoading();

            })
        .catch(error => console.log('error', error));

    },

    methods:{

    }

}
</script>

<style>

</style>