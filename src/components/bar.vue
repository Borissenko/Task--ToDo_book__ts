<template>
  <div class="bar">
    <div class="bar__filter-title">
      Search the name of task
    </div>
    <input v-model="filters.name"
           type="text"
           class="bar__filter-input"
           @input="changeFilter"
    >
    <div class="bar__status-title">
      Select status of tasks
    </div>

    <label class="bar__radio">
      <input @click="changeFilter" type="radio" value="all" v-model="filters.status">
      All
    </label>
    <label class="bar__radio">
      <input @click="changeFilter" type="radio" value="done" v-model="filters.status">
      Done
    </label>
    <label class="bar__radio">
      <input @click="changeFilter" type="radio" value="" v-model="filters.status">
      <div>On the road</div>
    </label>

    <button @click="onMakeItem('add group')" class="bar__btn-add-group">Add new group of tasks</button>
    <button @click="onMakeItem('add task')" class="bar__btn-add-task">Add new task</button>
  </div>

</template>

<script>
  export default {
    data: () => ({
      filters: {
        name: '',
        status: 'all'
      }
    }),
    methods: {
      changeFilter() {
        this.$emit('changeFilter', this.filters)
      },
      onMakeItem(point) {
        this.$router.push({path: '/add', query: {point}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bar {
    display: grid;
    grid-template-rows: 50px 50px 50px 20px;
    grid-template-columns: minmax(100px, 300px) 100px 100px 100px;
    align-items: center;
    user-select: none;

    &__filter-title {
      grid-row: 1;
      grid-column: 1;
    }

    &__filter-input {
      grid-row: 1;
      grid-column: 2 / span 3;
      height: 20px;
    }

    &__radio, &__radio input {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      cursor: pointer;
    }

    &__btn-add-group {
      grid-row: 3;
      grid-column: 1;
      justify-self: flex-start;
      width: 99%;
    }

    &__btn-add-task {
      grid-row: 3;
      grid-column: 2 / span 3;
      justify-self: flex-end;
      width: 99%;
    }

    &__btn-add-group:hover, &__btn-add-task:hover {
      background-color: $secondary;
      color: white;
      transition: all ease .2s;
      cursor: pointer;
    }
  }
</style>