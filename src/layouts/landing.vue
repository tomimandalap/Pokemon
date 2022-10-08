<template>
  <div class="layout-landing">
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand href="#">
        <img src="@/assets/img/logo.png" width="120" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto">
          <b-nav-form>
            <b-form-input placeholder="Cari"></b-form-input>
            <!-- <b-input-group-append>
                <b-button variant="light" style="border-radius: 0">
                  Cari
                </b-button>
              </b-input-group-append> -->
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="layout-default-content">
      <RouterView />
    </div>
  </div>
</template>
