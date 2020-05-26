<template>
  <div class="cart"
       v-click-outside="onBlowDoun"
  >
    <div class="cart__title">{{item.title}}</div>
    <label class="cart__status">
      <input type="checkbox" :id="item.id" v-model="status">
      Status
    </label>
    <div @click="onBlowUp(item.id)" class="cart__description">
      {{item.description | cut}}
    </div>

    <div v-show="descriptionBlowUp"
         @click="onBlowDoun"
         class="cart__description_full"
         :class="{'cart__descriptionBlowUp': descriptionBlowUp}"
    >
      <div class="cart__description_full__title">
        {{item.title}}
      </div>
      <div class="cart__description_full__text">
        {{item.description}}
      </div>
    </div>

    <div class="cart__btns">
      <button @mouseup="DELETE_ITEM(item.id)" class="cart__btn">Delete</button>
      <button @mouseup="onChangeItem(item.id)" class="cart__btn">Change</button>
    </div>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import vClickOutside from 'v-click-outside'

  export default {
    data: () => ({
      descriptionBlowUp: false
    }),
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      status: {
        get: function () {
          return Boolean(this.item.status)
        },
        set: function (newValue) {
          this.CHANGE_STATUS({id: this.item.id, newValue})
        }
      }
    },
    methods: {
      ...mapActions({
        CHANGE_STATUS: 'CHANGE_STATUS',
        DELETE_ITEM: 'DELETE_ITEM'
      }),
      onChangeItem(id) {
        this.$router.push({name: 'Add', query: {point: id}})
      },
      onBlowUp() {
        this.descriptionBlowUp = true
      },
      onBlowDoun() {
        this.descriptionBlowUp = false
      }
    },
    directives: {
      clickOutside: vClickOutside.directive
    },
    filters: {
      cut: v => v.substr(0, window.innerWidth / 10) + '... '
    }
  }
</script>

<style lang="scss" scoped>
  .cart {
    display: flex;
    flex-direction: column;
    width: 24%;
    height: 200px;
    margin-bottom: 7px;
    outline: $darkgrey 1px solid;
    overflow: hidden;

    :last-child {
      margin-right: 0;
    }

    &__title, &__status {
      height: 30px;
      font-size: 22px;
      line-height: 22px;
      padding-left: 5px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &__status {
      font-size: 16px;
      line-height: 16px;
      user-select: none;
    }

    &__description {
      padding: 5px;
      cursor: pointer;
      text-overflow: ellipsis;
      word-wrap: break-word;
      overflow: hidden;
    }

    &__description:hover {
      color: $green;
    }

    &__description_full {
      position: fixed;
      width: 40vw;
      height: 50vh;
      left: 10%;
      top: 10%;
      padding: 8%;
      background-color: $grey;
      opacity: 0;
      transition: all 1s ease;

      &__title {
        font-size: 24px;
        font-weight: 500;
        color: $secondary;
      }

      &__text {
        margin-top: 20px;
        font-size: 18px;
      }
    }

    &__descriptionBlowUp {
      opacity: 1;
      cursor: pointer;
      transition: opacity 1s ease;
    }

    &__btns {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      align-self: flex-end;
      justify-content: space-around;
      margin: auto 0 7px;

      .cart__btn {
        width: 44%;
        min-width: 70px;
        min-height: 20px;
        height: fit-content;
      }

      .cart__btn:hover {
        background-color: $secondary;
        color: white;
        transition: all ease .2s;
        cursor: pointer;
      }
    }
  }

  label, input {
    cursor: pointer;
    text-indent: 5px;
  }

</style>