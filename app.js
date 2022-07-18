function damage(min, max) {
  let value = Math.floor(Math.random() * (max - min)) + min;
  if (value > (max + min) / 2) {
    value += value;
  }

  return value;
}

function disableButton(playerHeal, monsterHeal) {
  if (playerHeal <= 0 || monsterHeal <= 0) {
    return true;
  }
}

const app = Vue.createApp({
  data() {
    return {
      playerHeal: 100,
      monsterHeal: 100,
      damePlayer: 0,
      dameMonster: 0,
      disabled: false,
      currentRound: 0,
      winner: null,
      logMessages: [],
      specialAttacked: false,
    };
  },
  watch: {
    playerHeal(value) {
      if (value <= 0 && this.monsterHeal <= 0) {
        this.winner = 'draw'
      } else if (value <= 0) {
        this.winner = 'monster'
      }
    },
    monsterHeal(value) {
      if (value <= 0 && this.playerHeal <= 0) {
        this.winner = 'draw'
      } else if (value <= 0) {
        this.winner = 'player'
      }
    }
  },
  computed: {
    monsterBar() {
      return { width: this.monsterHeal + '%' };
    },
    playerBar() {
      return { width: this.playerHeal + '%' };
    },
    countRound() {
      return this.currentRound % 3 !== 0 && this.specialAttacked;
    }
  },
  methods: {
    startGame() {
      this.monsterHeal = 100;
      this.playerHeal = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
      this.disabled = false;
    },
    attackMonster() {
      this.currentRound++;
      this.damePlayer = damage(8, 3);
      this.monsterHeal -= this.damePlayer;
      this.attackPlayer();
      this.healRemaining();
      this.logMessage('player', 'attack', this.damePlayer);
      disableButton(this.playerHeal, this.monsterHeal);
      this.specialAttacked = false;
    },
    attackPlayer() {
      this.dameMonster = damage(10, 8);
      this.playerHeal -= this.dameMonster;
      this.logMessage('monster', 'attack', this.dameMonster);
    },
    healRemaining() {
      if (this.playerHeal <= 0) {
        this.playerHeal = 0;
        this.disabled = true;
      }

      if (this.monsterHeal <= 0) {
        this.monsterHeal = 0;
        this.disabled = true;
      }
    },
    heal() {
      this.playerHeal += 100 - this.playerHeal;
      this.disabled = true;
    },
    specialAttack() {
      this.currentRound++;
      let dameMonster = damage(19, 12)
      this.monsterHeal -= dameMonster;
      this.attackPlayer();
      this.logMessage('player', 'ulti', dameMonster);
      disableButton(this.playerHeal, this.monsterHeal);
      this.specialAttacked = true;
    },
    surrender() {
      this.winner = 'monster';
      this.disabled = true;
    },
    logMessage(who, type, value) {
      this.logMessages.unshift({
        who,
        type,
        value
      })
    }
  },
}).mount("#game");
