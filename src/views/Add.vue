<template>
  <div class="add">
    <div class="title">
      Enter new fields to your task
    </div>

    <form @submit.prevent="makeItem" class="form">
      <div v-for="(field, ind) in fields" class="form__field">
        <div class="form__title">
          Enter your {{field}}
        </div>
        <input v-model="forms[field]"
               type="text"
               class="form__input"
               :placeholder=field
        >
      </div>
      <button class="form__btn">
        Accept it
      </button>
    </form>
    <button @click="onAbort" class="abort-btn">
      Abort
    </button>
  </div>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import {mapGetters, mapActions} from 'vuex'
  import {Forms, Task} from '@/types'

  interface VuexBindings {
    ACCEPT_ITEM: () => Task;
  }

  export default (Vue as VueConstructor<Vue & VuexBindings>).extend({
    data: () => ({
      forms: {
        groupName: '',
        id: null,
        title: '',
        status: false,
        description: ''
      } as Forms
    }),
    computed: {
      ...mapGetters({
        ACCEPT_ITEM: 'ACCEPT_ITEM'
      }),
      fields() {
        if (this.$route.query.point === 'add group')
          return ['groupName']
        return ['groupName', 'title', 'description']
      },
    },
    methods: {
      ...mapActions({
        MAKE_TASK: 'MAKE_TASK'
      }),
      makeItem() {
        this.MAKE_TASK(this.forms)
          .then(() => this.$router.push('/todo'))
      },
      onAbort() {
        this.$router.push('/todo')
      }
    },
    created() {
      if (typeof this.$route.query.point === "number")
        this.forms = {...this.ACCEPT_ITEM(this.$route.query.point)}
    }
  })
</script>

<style lang="scss" scoped>
  .add {
    display: flex;
    flex-direction: column;
    max-width: 700px;
    margin: 40px auto;
    border: $secondary 1px dashed;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      font-size: 18px;
      font-weight: 500;
      line-height: 40px;
      text-transform: uppercase;
    }

    .form {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 40px auto 0;

      &__field {
        display: grid;
        grid-auto-rows: 40px;
        grid-template-columns: 40% 60%;
        align-items: center;
        justify-items: center;
        margin-top: 10px;

        .form__title {
          font-size: 16px;
          font-weight: 400;
        }

        .form__input {
          width: 90%;
          height: 30px;
          text-indent: 20px;
        }
      }

      &__btn {
        width: 60%;
        height: 30px;
        margin: 80px auto 20px;
        text-indent: 20px;
      }

      &__btn:hover {
        background-color: $secondary;
        color: white;
        transition: all ease .2s;
        cursor: pointer;
      }
    }

    .abort-btn {
      width: 60%;
      height: 30px;
      margin: 0 auto 30px;
    }

    .abort-btn:hover {
      background-color: $secondary;
      color: white;
      transition: all ease .2s;
      cursor: pointer;
    }
  }
</style>