new Vue({
  el: '#app',
  data: {
    url: 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD',
    requestTimeOut: 300,
    timeToUpdate: 0,
    displayingTime: '0:00',
    coinsData: [],
  },
  created: function() {
    this.timeToUpdate = this.requestTimeOut;
    this.getData();
    this.updateTimer();
    setInterval(this.updateTimer, 1000);
  },
  methods: {
    getData() {
      axios.get(this.url)
        .then(response => {
          const sortedData = response.data.Data;

          sortedData.sort(function(a, b) {
            if (a.RAW.USD.PRICE < b.RAW.USD.PRICE) {
              return 1;
            } else {
              return -1;
            }
          });

          this.coinsData = sortedData;
        });
      console.log('Data updated');
      setTimeout(this.getData, this.requestTimeOut * 1000);
    },
    updateTimer() {
      if (this.timeToUpdate === 0) this.timeToUpdate = this.requestTimeOut;

      let minutes = Math.floor(this.timeToUpdate / 60);
      let seconds = this.timeToUpdate % 60;

      if (seconds < 10) seconds = `0${seconds}`;

      this.displayingTime = `${minutes}:${seconds}`;

      --this.timeToUpdate;
    },
    getFullUrl(url) {
      return `https://www.cryptocompare.com${url}`;
    },
  }
});