const ColourSlider = {
  template: '#colour-slider-template',
  data: () => ({
    vmodel: 0
  }),
  props: {
    col: {
      type: String,
      default: ''
    }
  },
  watch: {
    vmodel: function (value) {
      this.$parent.$emit('slidervalue', { col: this.col, value });
    }
  }
}

const UtilsMixin = {
  methods: {
    hex(value) {
      const n = Math.abs(value).toString(16);
      return n < 10 ? `0${n}` : n.toUpperCase();
    },
    randomNum(n) {
      return Math.round(Math.random(n) * n) -1;
    },
    hexColour(r, g, b) {
      return `${this.hex(r)}${this.hex(g)}${this.hex(b)}`;
    },
    randomise() {
      this.red = this.randomNum(256);
      this.green = this.randomNum(256);
      this.blue = this.randomNum(256);
    }
  }
}

const ColourPicker = {
  template: '#colour-picker-template',
  data: () => ({
    red: 0,
    green: 0,
    blue: 0,
    coloursArray: [],
    random: false
  }),
  mixins: [UtilsMixin],
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
    }
  },
  mounted() {
    this.randomise();
    this.$on('slidervalue', ({col, value}) => {
      this[col] = value;
    });
  }
}

new Vue({
  el: "#app",
  components: {
    ColourPicker,
    ColourSlider
  }
});