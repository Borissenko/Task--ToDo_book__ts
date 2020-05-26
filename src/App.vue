<template>
  <div class="main">
    <hr>
    <div class="bar">
      <div class="bar__title">
        ToDo
      </div>
      <div @click="onLogout"
           v-if="$route.path === '/todo'"
           class="bar__logout"
      >
        logout
      </div>
    </div>
    <hr>
    <router-view/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    methods: {
      ...mapActions([
        'DELETE_TOKEN'
      ]),
      onLogout() {
        this.DELETE_TOKEN()
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/down';

  .main {
    max-width: 1200px;
    margin: 40px auto 0;

    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      padding: 0 20px;

      &__title {
        font-size: 20px;
        font-weight: 800;
        color: $green;
      }

      &__logout {
        font-size: 16px;
        font-weight: 800;
        color: $secondary;
        text-transform: uppercase;
        cursor: pointer;
      }

      &__logout:hover {
        color: $very;
      }

      &__logout:active {
        color: $secondary_2;
      }
    }
  }
</style>
