"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Marlee",
          lastName: "McGee",
          email: "demo@user.io",
          username: "Demo-lition",
          profilePic: "image.url",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Sebasian",
          lastName: "Quackington",
          email: "user1@user.io",
          username: "Quackington",
          profilePic: "image.url",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Mohammad",
          lastName: "McDuck",
          email: "user2@user.io",
          username: "NotAQuack",
          profilePic: "image.url",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Melody",
          lastName: "O",
          email: "user3@user.io",
          username: "Waddelton",
          profilePic: "image.url",
          hashedPassword: bcrypt.hashSync("password4"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2", "FakeUser3"],
        },
      },
      {}
    );
  },
};
