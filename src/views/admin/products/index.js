const layout = require("../layout");

module.exports = ({ products }) => {
  const renderdProducts = products
    .map(
      (product) => `
      <div>${product.title}</div>
    `
    )
    .join("");
  return layout({
    content: `
      <h1 class="title">Products</h1>
      ${renderdProducts}
    `,
  });
};
