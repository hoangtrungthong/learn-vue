function damage(min, max) {
  let value = Math.floor(Math.random() * (max - min)) + min;
  if (value > (max + min) / 2) {
    value += value;
  }

  return value;
}

const app = Vue.createApp({
  data() {
    return {
      playerHeal: 100,
      monsterHeal: 100,
      damePlayer: 0,
      dameMonster: 0,
      disabled: false,
    };
  },
  methods: {
    attackMonster() {
      this.damePlayer = damage(8, 3);
      this.monsterHeal -= this.damePlayer;
      this.attackPlayer();
      this.healRemaining();
    },
    attackPlayer() {
      this.dameMonster = damage(10, 8);
      this.playerHeal -= this.dameMonster;
    },
    healRemaining() {
      if (this.playerHeal <= 0) {
        this.playerHeal = 0;
      }

      if (this.monsterHeal <= 0) {
        this.monsterHeal = 0;
      }
    },
    heal() {
      this.playerHeal += 100 - this.playerHeal;
      this.disabled = true;
    },
  },
}).mount("#game");
