<template>
  <div class="dui-page">
    <div class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">Button</div>
        <div class="dui-icon__back" @click="$router.back()"></div>
      </div>
    </div>
    <div class="padding margin-top bg-white grid">
      <div class="col-2 padding-xs">
        <button class="dui-button lg bg-red">large</button>
      </div>
      <div class="col-3 padding-xs">
        <button class="dui-button bg-red">default</button>
      </div>
      <div class="col-3 padding-xs">
        <button class="dui-button sm line-red round">small</button>
      </div>
      <div class="col-3 padding-xs">
        <button class="dui-button xs bg-df">xsmall</button>
      </div>
    </div>
    <div class="padding margin-top bg-white">
      <button class="dui-button block lg bg-red">large</button>
      <button class="dui-button block bg-red margin-top">default</button>
      <button class="dui-button block sm line-red round margin-top">small</button>
      <button class="dui-button block xs line-orange margin-top">xsmall</button>
    </div>
  </div>
</template>
