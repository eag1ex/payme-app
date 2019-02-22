<template>
  <div id="template-list">
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Invoices</h1>
        </div>

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
        <md-button class="md-primary md-raised" @click="newUser">Create New Invoice</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Value" md-sort-by="value">{{ printValue(item.value) }}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="date">{{ niceDate(item.date) }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { users } from "../libs/mock-data/users";
import * as moment from "moment";
import { isEmpty } from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

export default {
  name: "TableSearch",
  data: () => ({
    search: null,
    searched: [],
    users: users
  }),
  // watch: {
  //   users: function(val) {
  //     this.users.sort((a, b) => {
  //       return new Date(a.date).getTime() - new Date(b.date).getTime();
  //     });
  //   }
  // },
  methods: {
    printValue(val) {
      return `$` + Math.round(Number(val || 0));
    },
    niceDate(date) {
      return moment(date).format("DD-MM-YY, h:mm:ss a");
    },
    newUser() {
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
      this.searched = this.searchByAny(this.users, this.search);
    }
  },
  created() {
    this.searched = this.users;
  }
};
</script>

<style lang="scss" scoped>
</style>