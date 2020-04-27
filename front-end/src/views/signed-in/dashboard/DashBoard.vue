<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text
            >AQUI VAI TER O FILTRO DO DASHBOARD COM AS PRINCIPAIS
            MÉTRICAS!</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <chartist
            id="test"
            :data="lineChart.data"
            :event-handlers="lineChart.eventHandlers"
            :options="lineChart.options"
            :ratio="lineChart.ratio"
            :responsive-options="lineChart.responsiveOptions"
            :type="lineChart.type"
            style="max-height: 500px;"
          />
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <chartist
            id="test"
            :data="pieChart.data"
            :event-handlers="pieChart.eventHandlers"
            :options="pieChart.options"
            :ratio="pieChart.ratio"
            :responsive-options="pieChart.responsiveOptions"
            :type="pieChart.type"
            style="max-height: 500px;"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    lineChart: {
      data: {
        labels: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez"
        ],
        series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
      },
      eventHandlers: null,
      options: {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
      ratio: "1px",
      responsiveOptions: [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function(value) {
                return value[0];
              }
            }
          }
        ]
      ],
      type: "Bar"
    },
    pieChart: {
      data: {
        series: [
          {
            value: 20,
            name: "Series 1",
            meta: "Meta One"
          },
          {
            value: 10,
            name: "Series 2",
            meta: "Meta Two"
          },
          {
            value: 70,
            name: "Series 3",
            meta: "Meta Three"
          }
        ]
      },
      eventHandlers: null,
      options: {
        donut: true,
        donutWidth: 60,
        showLabel: true
      },
      responsiveOptions: [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function(value) {
                return value[0];
              }
            }
          }
        ]
      ],
      type: "Pie"
    }
  })
};
</script>

<style>
.ct-label {
  color: inherit;
  opacity: 0.7;
  font-size: 0.975rem;
  font-weight: 100;
}

.ct-grid {
  stroke: rgba(48, 48, 48, 0.2);
}

.ct-series-a .ct-point,
.ct-series-a .ct-line,
.ct-series-a .ct-bar,
.ct-series-a .ct-slice-donut {
  stroke: rgba(122, 33, 33, 0.8);
}

.ct-series-a .ct-slice-pie,
.ct-series-a .ct-area {
  fill: rgba(255, 255, 255, 0.4);
}
</style>
