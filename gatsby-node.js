// const path = require("path")

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions

//   const postTemplate = require.resolve("./src/templates/blog-post.js");

//   return graphql(`
//     query {
//       allMarkdownRemark {
//         edges {
//           node {
//             id
//             html
//             frontmatter {
//               author
//               date
//               path
//               title
//             }
//           }
//         }
//       }
//     }
//   `).then(res => {
//     if (res.errors) {
//       return Promise.reject(res.errors)
//     }

//     res.data.allMarkdownRemark.edges.forEach(({ node }) => {
//       createPage({
//         path: node.frontmatter.path,
//         component: postTemplate,
//       })
//     })
//   })
// }


exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          id
          html
          frontmatter {
            author
            date
            path
            title
          }
        }
      }
    }
  `)
  data.allMarkdownRemark.nodes.forEach(node => {
    const slug = node.frontmatter.path
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/blog-post.js`)
    })
  })
}