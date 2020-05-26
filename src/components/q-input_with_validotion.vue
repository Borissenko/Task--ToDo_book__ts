<template>
  <div>
    <div class="form-wrapper">
      <div class="form">
        <div
          v-for="(field, index) in form"
          :key="index"
          class="input"
          :class="{ width: field.width }"
        >
          <div class="input-desc">{{ field.label }}</div>
          <input
            v-model="field.value"
            v-mask="field.mask ? field.mask : ''"
            class="input-primary wide"
            :type="field.type"
            :class="{
              'input-error': $v.form[field.name].value.$error
            }"
          />
        </div>
      </div>
      <div class="buttons">
        <q-btn primary wide @click.native="submit()">Далее</q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import isPhone from '@/assets/validation.js'

//validation.js
const isPhone = v => /[+][0-9][\s][(][0-9]{3}[)][-][0-9]{3}[-][0-9]{4}/.test(v)
// export default isPhone

export default {
  validations: {
    form: {
      first_name: {
        value: { required }
      },
      last_name: {
        value: { required }
      },
      phone: {
        value: {isPhone}
      },
      email: {
        value: { required, email }
      },
      city: {
        value: { required }
      },
      street: {
        value: { required }
      },
      house: {
        value: { required }
      },
      apartment: {
        value: { required }
      }
    }
  },
  data: () => ({
    form: {
      first_name: {
        name: 'first_name',
        value: '',
        type: 'text',
        label: 'Имя',
        width: true
      },
      last_name: {
        name: 'last_name',
        value: '',
        type: 'text',
        label: 'Фамилия',
        width: true
      },
      phone: {
        name: 'phone',
        value: '',
        type: 'tel',
        label: 'Телефон',
        mask: '+7(###)-###-####',
        width: true
      },
      email: {
        name: 'email',
        value: '',
        type: 'email',
        label: 'E-mail',
        width: true
      },
      city: {
        name: 'city',
        value: '',
        type: 'text',
        label: 'Город',
        width: true
      },
      street: {
        name: 'street',
        value: '',
        type: 'text',
        label: 'Улица',
        width: true
      },
      house: {
        name: 'house',
        value: '',
        type: 'number',
        label: 'Дом',
        width: false
      },
      apartment: {
        name: 'apartment',
        value: '',
        type: 'number',
        label: 'Квартира',
        width: false
      }
    }
  }),
  computed: {
    ...mapGetters({
      GET_CLEANER_INFO: 'cleaner-registration/GET_CLEANER_INFO'
    })
  },
  mounted() {
    const {
      first_name,
      last_name,
      phone,
      email,
      city,
      street,
      house,
      apartment
    } = this.GET_CLEANER_INFO.address

    this.form.first_name.value = first_name
    this.form.last_name.value = last_name
    this.form.phone.value = phone
    this.form.email.value = email
    this.form.city.value = city
    this.form.street.value = street
    this.form.house.value = house
    this.form.apartment.value = apartment
  },
  methods: {
    ...mapMutations({
      SET_STEP: 'cleaner-registration/SET_STEP',
      SET_CLEANER_INFO: 'cleaner-registration/SET_CLEANER_INFO'
    }),
    ...mapActions({
      SHOW_NOTIFICATION: 'SHOW_NOTIFICATION'
    }),
    submit() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.SET_CLEANER_INFO({
          field: 'address',
          data: {
            apartment: this.form.apartment.value,
            house: this.form.house.value,
            street: this.form.street.value,
            city: this.form.city.value,
            email: this.form.email.value,
            phone: this.form.phone.value,
            last_name: this.form.last_name.value,
            first_name: this.form.first_name.value
          }
        })
        this.SET_STEP(1)
      } else {
        this.SHOW_NOTIFICATION('Заполните все обязательные поля')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 4.5%;
  grid-row-gap: 40px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &-wrapper {
    max-width: 880px;
    margin: auto;
  }
}
.width {
  grid-column: span 2;
}
.buttons {
  display: grid;
  margin: 65px 0;
  max-width: 145px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    max-width: 100%;
    grid-column-gap: 4.5%;
  }
}
</style>
