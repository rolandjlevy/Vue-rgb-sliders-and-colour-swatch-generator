const ColourPicker = {
  template: '#colour-picker-template',
  data: () => ({
    red: 0,
    green: 0,
    blue: 0,
    coloursArray: [],
    random: false
  }),
  methods: {
    addColour(r, g, b) {
      const id = this.coloursArray.length;
      const hex = `#${this.hexColour(r,g,b)}`;
      this.coloursArray.push({rgb:`rgb(${r},${g},${b})`, hex, id});
      if (this.random) {
        this.randomise();
      }
    },
    deleteColour(id) {
      let counter = 0;
      this.coloursArray = this.coloursArray.filter(item => {
        if (item.id !== id) {
          item.id = counter++;
          return item;
        }
      });
    },
    clearAll() {
      this.coloursArray = [];
    },
    hex(value) {
      const n = Math.abs(value).toString(16);
      return n < 10 ? `0${n}` : n.toUpperCase();
    },
    hexColour(r, g, b) {
      return `${this.hex(r)}${this.hex(g)}${this.hex(b)}`;
    },
    randomNum(n) {
      return Math.round(Math.random(n) * n) -1;
    },
    randomise() {
      this.red = this.randomNum(256);
      this.green = this.randomNum(256);
      this.blue = this.randomNum(256);
    }
  },
  mounted() {
    this.randomise();
  }
}

new Vue({
  el: "#app",
  components: {
    ColourPicker
  }
});