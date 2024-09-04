const POINTS = [
  {
    x: 14,
    y: 54,
  },
  {
    x: 1,
    y: 2,
  },
  {
    x: 43,
    y: 51,
  },
];

const RANGE = 10;

const getPointsInRange = (points, x, y, range) => {
  points.forEach((p) => {
    const _x = p.x;
    const _y = p.y;

    if (
      Math.pow(
        Math.pow(Math.abs(_x - x), 2) + Math.pow(Math.abs(_y - y), 2),
        0.5
      ) <= range
    ) {
      console.log(_x, _y);
    }
  });
};

getPointsInRange(POINTS, 5, 5, RANGE);
