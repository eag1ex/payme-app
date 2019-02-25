<template>
  <div id="template-list" class="bg-inverse m-2 p-3" v-cloak>
    <top-title v-bind:location="'/create'" v-bind:title="'Invoices'"></top-title>
    <spinner v-bind:appLoading="loading"></spinner>
    <md-table
      v-if="!loading"
      v-model="searched"
      md-sort="name"
      md-sort-order="asc"
      md-card
      md-fixed-header
      @md-selected="onSelect"
    >
      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAltLabel(count) }}</div>

        <div class="md-toolbar-section-end" @click="removeInvoice();">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-toolbar>
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
        :md-description="`Try a different search, or create a new invoice.`"
      >
        <md-button class="md-primary md-raised" @click="goTo()">Create New Invoice</md-button>
      </md-table-empty-state>

      <md-table-row
        md-selectable="multiple"
        md-auto-select
        class="row-item"
        md-with-hover
        slot="md-table-row"
        slot-scope="{ item }"
        @click="goToItem(item)"
      >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Value" md-sort-by="value">{{ printValue(item.value) }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="date">{{ niceDate(item.date) }}</md-table-cell>
      </md-table-row>
    </md-table>
    <!-- <p>Selected:</p>
    {{ selected }}-->
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
  props: ["appStatus"],
  data: () => ({
    search: null,
    searched: [],
    invoices: [],
    loading: true,
    selected: []
  }),

  created: function() {
    this.getAllInvoices();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes("invoice/getAllSuccess")) {
        this.searched = this.invoices = mutation.payload || [];
        console.log(" mutation.payload", this.searched);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
      if (mutation.type.includes("invoice/deleteSuccess")) {
        this.loading = true;
        this.getAllInvoices();
      }
    });
  },

  methods: {
    ...mapActions("invoice", {
      getAllInvoices: "getAll",
      deleteInvoice: "delete"
    }),
    goTo() {
      this.$router.push(`/create`);
    },
    goToItem(item) {
      if (item.id) {
        this.$router.push(`/item/${item.id}`);
      }
    },
    printValue(val) {
      return `$` + Number(val).toFixed(2); //Math.round(Number(val || 0));
    },
    niceDate(date) {
      return moment(date).format("DD-MM-YY, h:mm:ss a");
    },
    newInvoice() {
      window.alert("Noop");
    },
    removeInvoice() {
      const _selected = cloneDeep(this.selected) || [];
      if (_selected.length) {
        const ids = _selected.map(item => {
          return Number(item.id);
        });
        this.deleteInvoice(ids);
        this.selected = [];
        // console.log("delete selected", ids);
      } else {
        window.alert("bug.. try re-selecting again");
        this.selected = [];
      }
      //
    },

    searchByAny(items, term) {
      if (term) {
        const nameMatch = items.filter(item =>
          toLower(item.name).includes(toLower(term))
        );
        if (!isEmpty(nameMatch)) return nameMatch;

        const emailMatch = items.filter(item =>
          toLower(item.email).includes(toLower(term))
        );
        if (!isEmpty(emailMatch)) return emailMatch;

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
    },
    onSelect(items) {
      this.selected = items;
    },
    getAltLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} item${plural} selected`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>