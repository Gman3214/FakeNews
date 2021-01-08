<template>
  <div >
    <img id="Hover" width="150" height="150" alt="Trumptwitter" @click="playMusic" src="../assets/Component 7 – 1.png">
    <h1 >Donald Trump Stats</h1>
    <h6 >*press donald for him to sing*</h6>


    <div id="grid">
      <MonthlyRetweets></MonthlyRetweets>
      <MonthlyTweets></MonthlyTweets>
      <TweetsByTOD></TweetsByTOD>
      <FakeNewsTimes></FakeNewsTimes>
    </div>
    <img id="underTweets" src="../assets/Component 11 – 1.png">


  </div>
</template>

<script>
import FakeNewsTimes from './FakeNewsTimes.vue';
import MonthlyRetweets from './MonthlyRetweets.vue';
import MonthlyTweets from './MonthlyTweets.vue';
import TweetsByTOD from './TweetsByTOD.vue';
//import {Howl}  from 'howler';

export default {
  components:{
    MonthlyTweets,
    MonthlyRetweets,
    TweetsByTOD,
    FakeNewsTimes
  },

  data: () => {
    return({
      music : new Audio(require('../assets/dontstop.mp3'))
      })
  },

  methods:{
    playMusic: function () {
      if (this.music.paused){
        this.music.play()
        this.music.volume = 0.3
      }
      else{
        this.music.pause()
      }
    }
  },

  name: 'DonaldTrump',
  
}
</script>

<style scoped>
#grid{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
}

@media all and (max-width: 50em) {
#grid{
  position: relative;
  display: grid;
  align-items: center;
  justify-content: center;
  column-gap: 10px;

}
#underTweets{
  margin: -7%;
  width: 100%;
}
}


#underTweets{
  margin: -7%;
}

#Hover{
  animation-name: DonaldHover;
  animation-timing-function: ease-in-out;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  zoom: 90%;
}

@keyframes DonaldHover {
  0% {transform: translateY(10px);}
  50% {transform: translateY(20px);}
  100% {transform: translateY(10px);}

}
</style>
