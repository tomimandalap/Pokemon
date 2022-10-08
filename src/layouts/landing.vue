<template>
  <div class="layout-landing">
    <b-navbar toggleable="sm" type="dark" variant="danger" fixed="top">
      <b-navbar-brand href="#">
        <img src="@/assets/img/logo.png" width="120" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto">
          <b-form-input placeholder="Cari" class="my-2"></b-form-input>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="layout-default-content">
      <RouterView />
    </div>
  </div>
</template>
