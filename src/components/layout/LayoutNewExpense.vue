<template>
  <div>
    <div class="w-100 d-flex justify-content-center">
      <button class="btn btn-lg btn-outline-primary" @click="showModal = !showModal">
        <i class="fa fa-plus"></i> Novo gasto
      </button>
    </div>

    <!-- Modal -->
    <form @submit.prevent="submit()">
      <div class="modal fade" :class="{show: showModal}">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Adicionar um novo gasto</h5>
              <button type="button" class="close" @click="closeModal()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label for>Descrição:</label>
                  <input type="text" class="form-control" v-model="form.description" required />
                </div>
                <div class="form-group col-4">
                  <label for>Valor (R$):</label>
                  <input type="text" class="form-control" v-model="form.value" required />
                </div>
                <div class="form-group flex-column col-12 d-flex align-items-center">
                  <input
                    type="file"
                    ref="input"
                    class="d-none"
                    accept="image/*"
                    @change="handleFile($event)"
                  />
                  <button
                    type="button"
                    class="btn w-50 btn-outline-secondary"
                    @click="openFileDialog()"
                  >Adicionar Recibo</button>

                  <div class="mt-2" v-if="form.receipt">
                    {{ form.receipt.name }}
                    <button
                      type="button"
                      @click="form.receipt = ''"
                      class="btn badge badge light"
                    >
                      <i class="fa fa-trash text-danger"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal()">Fechar</button>
              <button type="submit" class="btn btn-primary">
                <template v-if="loading" :disabled="loading">
                  <i class="fa fa-spin fa-spinner"></i>
                  Adicionando...
                </template>
                <template v-else>Adicionar</template>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="modal-backdrop fade" :class="{show: showModal}" v-if="showModal"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      loading: false,
      form: {
        description: "",
        value: "",
        receipt: ""
      }
    };
  },
  computed: {
    fileName() {
      const { receipt } = this.form;

      if (receipt) {
        const split = receipt.name.split(".");

        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    }
  },
  methods: {
    async submit() {
      this.$root.$emit("Spinner::show");
      this.loading = true;
      try {
        const ref = this.$firebase.database().ref(window.uid);
        const id = ref.push().key;

        if (this.form.receipt) {
          const snapshot = await this.$firebase
            .storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.receipt);

          this.form.receipt = await snapshot.ref.getDownloadURL();
        }

        const payload = {
          id,
          ...this.form,
          createdAt: new Date().getTime()
        };

        ref.child(id).set(payload, err => {
          if (err) {
            this.$root.$emit("Notification::show", {
              type: "danger",
              message: "Não foi possível inserir o  gasto, tente novamente."
            });
            this.loading = false;
          } else {
            this.$root.$emit("Notification::show", {
              type: "success",
              message: "Gasto inserido com sucesso."
            });
            this.closeModal();
            this.loading = false;
          }
        });
      } catch (err) {
        this.$root.$emit("Notification::show", {
          type: "danger",
          message: "Não foi possível inserir o  gasto, tente novamente."
        });
        this.loading = false;
      } finally {
        this.$root.$emit("Spinner::hide");
        this.loading = false;
      }
    },
    closeModal() {
      this.showModal = false;
    },
    openFileDialog() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleFile(ev) {
      this.form.receipt = ev.target.files[0];
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  color: var(--dark);
}
</style>
