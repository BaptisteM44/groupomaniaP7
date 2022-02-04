module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.STRING
          },
          // imageUrl: {
          //   type: Sequelize.BLOB
          // },
          published: {
            type: Sequelize.BOOLEAN
          }
    });
    return Post
}

// module.exports = (sequelize, Sequelize) => {
//     const Tutorial = sequelize.define("tutorial", {
//       title: {
//         type: Sequelize.STRING
//       },
//       description: {
//         type: Sequelize.STRING
//       },
//       published: {
//         type: Sequelize.BOOLEAN
//       }
//     });
  
//     return Tutorial;
//   };