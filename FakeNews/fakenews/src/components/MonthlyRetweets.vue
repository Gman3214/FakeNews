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
        text:"Donalds Retweets per month"
    },
    xAxis:{
        categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    },
    yAxis: {
        min: 0,
        title: {
            text: "Tweets amount",
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
        this.$refs.lineCharts.delegateMethod("showLoading", "waiting for trump...")
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'

        };
        fetch("https://dev-zephyr-300917.ew.r.appspot.com/monthlyretweets", requestOptions)
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