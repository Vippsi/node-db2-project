exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: "1GNDS13S522490478",
          make: "audi",
          model: "R8",
          mileage: 2000,
          transmission: null,
          titleStatus: null,
        },
        {
          vin: "1B3EL46X26N241824",
          make: "bmw",
          model: "i135",
          mileage: 50000,
          transmission: null,
          titleStatus: "clean",
        },
        {
          vin: "1GKDS13S462186156",
          make: "Nissan",
          model: "Skyline R34",
          mileage: 500,
          transmission: null,
          titleStatus: null,
        },
        {
          vin: "TEST SEEDS",
          make: "Nissan",
          model: "Skyline R34",
          mileage: 500,
          transmission: null,
          titleStatus: null,
        },
      ]);
    });
};
