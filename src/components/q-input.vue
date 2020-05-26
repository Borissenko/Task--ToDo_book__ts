<template>
  <div class="wrapper">
    <input
      :type="type"
      v-mask="mask ? mask : ''"
      :disabled="disabled"
      :class="classes"
      :value="value"
      :maxlength="maxlength"
      class="input text16"
      @mouseenter="value.length > 0 ? (focus = false) : (focus = true)"
      @mouseleave="value.length > 0 ? (focus = true) : (focus = false)"
      @input="$emit('input', $event.target.value)"
    />
    <div class="placeholder text16">{{ placeholder }}</div>
    <div v-if="error" class="error">{{ warning }}</div>
  </div>
</template>

<script>
  // универсальная форма для ввода имени, телефона, email
  //Зависимости: npm install v-mask

  export default {
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        required: true
      },
      mask: {
        type: String,
        default: ''
      },
      maxlength: {
        type: Number,
        default: 200
      },
      error: {
        type: Boolean,
        default: false
      },
      warning: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      purple: {
        type: Boolean,
        default: false
      },
      orange: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      focus: false
    }),
    computed: {
      classes() {
        return {
          'input-orange': this.orange,
          'input-purple': this.purple,
          focus: this.focus || this.value.length > 0
        }
      }
    },
    methods: {
      changeInput(target) {
        console.log(target.slice(0, 3))
        this.$emit('input', target.slice(0, 3))
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrapper {
    position: relative;
    width: 100%;

    .placeholder {
      position: absolute;
      bottom: rem(8);
      transition: transform 0.3s $InCubic, font-size 0.3s $InCubic;
      pointer-events: none;
    }
    .input {
      width: 100%;
      height: rem(56);
      box-sizing: border-box;
      padding: rem(14) 0 0;
      background: transparent;
      border: 0;
      border-radius: 0;

      &-purple {
        color: $secondary;
        border-bottom: 1px solid $verytintpurple;
        ~ .placeholder {
          color: $tintpurple;
        }

        &:hover {
          color: $secondary;
          border-bottom: 1px solid $secondary;
          /* ~ .placeholder {
            color: $secondary;
          } */
        }
      }
      &-orange {
        color: black;
        border-bottom: 1px solid #c5c4cc;
        ~ .placeholder {
          color: $darkgrey;
        }
        &:hover {
          border-bottom: 1px solid $purple;
          ~ .placeholder {
            color: $darkgrey;
          }
        }
      }
    }
  }
  .focus {
    &.input-purple {
      border-bottom: 1px solid $secondary;
      transition: all 0.3s $OutCubic;
      ~ .placeholder {
        color: $secondary !important;
      }
    }
    ~ .placeholder {
      transform: translateY(rem(-30));
      /*....*/
      font-size: rem(14);
      line-height: rem(18);
      transition: transform 0.3s $OutCubic, font-size 0.3s $OutCubic,
      color 0.3s $OutCubic;
    }
  }
  .error {
    font-size: rem(12);
    line-height: rem(14);
    color: $orange;
    position: absolute;
    bottom: rem(-22);
    @media screen and (max-width: 1024px) {
      font-size: remM(12);
      line-height: remM(14);
      bottom: remM(-22);
    }
  }

  .text16 {
    font-size: rem(14);
    line-height: rem(20);
    color: $primary-dark;
    @media screen and (max-width: 1024px) {
      font-size: remM(14);
      line-height: remM(20);
    }
  }


  $OutCubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  $InCubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);

  $verytintpurple: #bdb2ef;
  $tintpurple: #987bff;
  $purple: #5b3ed8;
  $darkgrey: #716d81;
  $secondary: #c4c0cf;
  $orange: #ee7954;
  $primary-dark: #311e69;

  @function rem($n) {
    @return #{($n / 16)}rem;
  }
  @function remM($n) {
    @return #{($n / 12)}rem;
  }
</style>
