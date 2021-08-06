const data = [
  {
    Cheese: 22.2,
    CHOCOLATE: 10.3,
    Impulse: 1.5,
    period: '2021_26',
  },
  {
    Cheese: 21.8,
    CHOCOLATE: 9.8,
    Impulse: 1.5,
    period: '2021_27',
  },
  {
    Cheese: 21.2,
    CHOCOLATE: 9.7,
    Impulse: 1.4,
    period: '2021_28',
  },
];

const calculateTotal = (array) =>
  array.map((e) => {
    e.total =
      Object.values(e).reduce(
        (accumulator, currentValue) => (accumulator += currentValue),
        0
      ) / 3;
    return e;
  });

const groupData = (keys, dataWithTotal) =>
  keys
    .filter((k) => k !== 'period')
    .map((k) => {
      let temp = {
        label: k,
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      };
      temp.data = dataWithTotal.map((elt) => elt[k]);
      return temp;
    });

(function generateGraph() {
  let dataWithTotal = [];

  let filterdData = [...data].map((elm) => {
    const { period, ...rest } = elm;
    return rest;
  });

  dataWithTotal = calculateTotal(filterdData);
  const labels = data.map((element) => element['period']);
  let keys = Object.keys(dataWithTotal[0]);
  const graphValues = groupData(keys, dataWithTotal);

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: graphValues,
    },
  });
})();
