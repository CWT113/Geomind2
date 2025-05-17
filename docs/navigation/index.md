---
layout: doc
layoutClass: m-nav-layout
sidebar: false
footer: false
prev: false
next: false
outline: [2, 3, 4]
---

<style src="/.vitepress/theme/style/navigation.css"></style>

<script setup>
import { NAV_DATA } from '/settings/navigation.mts'
</script>

# 编程导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
