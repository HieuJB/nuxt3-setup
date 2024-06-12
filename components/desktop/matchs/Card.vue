<template>
  <div class="match__card" v-for="(item, index) in Object.keys(matchs)" :key="index">
    <div class="match__card-header">
      <div class="match__card-flat">
        <div @click="toggleFavorite(index)">
          <DesktopMatchsStar />
        </div>
        <CommonBaseImage
          class="base-image"
          :src="getFlatByCountry(Object.values(matchs)[index][0].competition_cluster)" />
        <div class="competition-name">{{ Object.values(matchs)[index][0]?.competition_name }}</div>
      </div>
      <div class="match__card-header-right">
        <i @click="$emit('sortMatchsByID', item)" class="fa fa-sort-amount-desc" aria-hidden="true"></i>
        <CommonBaseButton @click="toggleMatchList(index)">
          <i :class="['fa ', showList[index] ? 'fa-caret-up' : 'fa-caret-down']" aria-hidden="true"></i>
        </CommonBaseButton>
      </div>
    </div>

    <transition name="fade">
      <div class="match__list" v-if="showList[index]">
        <div class="match__item" v-for="(item, key) in Object.values(matchs)[index]" :key="key">
          <div class="match__item-date">
            <DesktopMatchsStar v-model="item.isFavorite" />
            <div class="date">{{ dayjs(item.start_date).format('DD:MM:YYYY') }}</div>
          </div>

          <div class="match__item-name">
            <div class="match__item-name-left">
              <span>{{ item.home_team }}</span>
            </div>
            <div class="match__item-name-center">{{ item.result }}</div>
            <div class="match__item-name-right">{{ item.away_team }}</div>
          </div>

          <div class="match__item-status">
            <div class="match__item-status-left">{{ item.result }}</div>
            <div class="match__item-status-center">-</div>
            <div class="match__item-status-right">
              <i class="fa fa-user-o" aria-hidden="true"></i>
              <input type="checkbox" :v-model="selected" checked />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const { matchs } = defineProps({
  matchs: Object
})

const emit = defineEmits(['sortFavorite'])

const selected = ref(true)

const showList = ref([true])

const showListFavorite = ref([])

const toggleFavorite = (index: number) => {
  showListFavorite.value[index] = !showListFavorite.value[index]
  emit('sortFavorite', {
    id: index,
    status: showListFavorite.value[index]
  })
}

const toggleMatchList = (index: number) => {
  showList.value[index] = !showList.value[index]
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/desktop/hotmatch.scss';
input[type='checkbox'] {
  accent-color: rgba(0, 128, 0, 0.57);
}
</style>
