<template>
  <div id="template-list" class="bg-inverse m-2 p-3">
    <div class="w-100">
      <h1 class="md-headline mb-2">Invoices</h1>
    </div>

    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <!-- <div class="md-toolbar-section-start">
          <h1 class="md-title">Invoices</h1>
        </div>-->
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search name, value, or date"
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No invoices found"
        :md-description="`No invoice found for this '${search}' query. Try a different search term or create a new invoice.`"
      >
        <md-button class="md-primary md-raised" @click="newInvoice">Create New Invoice</md-button>
      </md-table-empty-state>

      <md-table-row
        class="row-item"
        md-with-hover
        slot="md-table-row"
        slot-scope="{ item }"
        @click="goToItem(item)"
      >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Value" md-sort-by="value">{{ printValue(item.value) }}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="date">{{ niceDate(item.date) }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as moment from "moment";
import { isEmpty, cloneDeep } from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

export default {
  name: "TableSearch",
  data: () => ({
    search: null,
    searched: [],
    invoices: []
  }),

  created: function() {
    this.getAllInvoices();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes("invoice/getAllSuccess")) {
        this.searched = this.invoices = mutation.payload || [];
      }
    });
  },

  methods: {
    ...mapActions("invoice", {
      getAllInvoices: "getAll"
    }),
    goToItem(item) {
      if (item.id) {
        this.$router.push(`/item/${item.id}`);
      }
    },
    printValue(val) {
      return `$` + Math.round(Number(val || 0));
    },
    niceDate(date) {
      return moment(date).format("DD-MM-YY, h:mm:ss a");
    },
    newInvoice() {
      window.alert("Noop");
    },
    searchByAny(items, term) {
      if (term) {
        const nameMatch = items.filter(item =>
          toLower(item.name).includes(toLower(term))
        );
        if (!isEmpty(nameMatch)) return nameMatch;

        const dateMatch = items.filter(item => {
          return (
            this.niceDate(item.date || "")
              .toString()
              .indexOf(term) !== -1
          );
        });
        if (!isEmpty(dateMatch)) return dateMatch;

        const valueMatch = items.filter(item =>
          toLower((item.value || "").toString()).includes(toLower(term))
        );
        if (!isEmpty(valueMatch)) return valueMatch;

        return [];
      }
      return items;
    },
    searchOnTable() {
      this.searched = this.searchByAny(this.invoices, this.search);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>