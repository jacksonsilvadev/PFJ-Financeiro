<template>
  <v-layout wrap>
    <v-flex xs12>
      <div class="months-navigation">
        <div
          class="month-link"
          @click="setActiveMonth(month)"
          :class="{active: month.month == activeMonth.month}"
          :key="i"
          v-for="(month,i) in groupedMonths"
        >
          <div class="month-label">{{ month.month }}</div>
          <div class="value-label" v-money-format="month.total"></div>
        </div>
      </div>
      <div class="container-group">
        <div
          v-if="activeMonth.data && !activeMonth.data.length"
        >Você não cadastrou nenhum gasto neste mês</div>
        <template v-else>
          <expense-list-item :data="item" :key="index" v-for="(item, index) in activeMonth.data" />
        </template>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import groupBy from "lodash.groupby";
import moment from "moment";
import ExpenseListItem from "./ExpenseListItem";

export default {
  name: "ListaGastos",
  components: {
    ExpenseListItem
  },
  data() {
    return {
      expenses: [],
      activeMonth: {}
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.setActiveMonth();
  },
  computed: {
    groupedMonths() {
      let groupedMonths = [];

      const addCurrentMonth = () => {
        groupedMonths.push({
          data: [],
          total: 0,
          month: moment().format("MM/YYYY")
        });
      };

      if (this.expenses.length) {
        const months = groupBy(this.expenses, i => {
          return moment(i.createdAt).format("MM/YYYY");
        });
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = "MM/YYYY HH";

          return moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))
            ? -1
            : +1;
        });

        groupedMonths = sortedMonths.map(month => ({
          month,
          data: months[month],
          total: months[month].map(i => +i.value).reduce((a, c) => a + c, 0)
        }));

        const lastMonth = moment(
          groupedMonths[groupedMonths.length - 1].month,
          "MM/YYYY"
        );

        if (!lastMonth.isSame(moment(), "month")) {
          addCurrentMonth();
        }
      } else {
        addCurrentMonth();
      }

      return groupedMonths;
    }
  },
  methods: {
    getData() {
      const ref = this.$firebase.database().ref(`/${window.uid}`);

      ref.on("value", snapshot => {
        const values = snapshot.val();
        this.expenses = Object.keys(values).map(i => values[i]);
      });
    },
    setActiveMonth(month = null) {
      if (month) {
        this.activeMonth = month;
      } else {
        this.activeMonth = this.groupedMonths[this.groupedMonths.length - 1];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.months-navigation {
  display: flex;
  width: calc(100% + 30px);
  margin-left: -15px;
  background-color: var(--featured-dark);
  .month-link {
    padding: 15px;
    cursor: pointer;
    transition: 0.4s;
    text-align: center;
    &:hover {
      background-color: var(--featured);
    }
    &.active {
      background-color: var(--featured);
    }
    .value-label {
      color: var(--darker);
      font-size: 8px;
    }
  }
}

.container-group {
  width: calc(100% + 30px);
  overflow: hidden auto;
  height: calc(100vh - 66px);
}

.container {
  font-size: 15pt;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
