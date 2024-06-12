<template>
  <div class="home">
    <section class="match">
      <DesktopMatchsCard
        @sortMatchsByID="
          (id:number) => {
            sortMatchsByID(id)
          }
        "
        @sortFavorite="(id: number) => {
          sortFavorite(id)
        }"
        :matchs="matchs" />
    </section>
  </div>
</template>

<script setup lang="ts">
const { getHotMatch, matchs, sortMatchsByID, sortFavorite } = useMatchs()

onMounted(async () => {
  await getHotMatch('2024-06-08')
})
</script>
<style lang="scss" scoped>
@import 'assets/styles/page/home.scss';
</style>
