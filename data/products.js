// Centralized product data store
// In a real app, replace this with a database.

const products = {
  newArrivals: [
    {
      name: "Printed Cotton Kurti",
      price: 1299,
      original: 1799,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.Zo4w05_VIgBSpc_mdzpgjgHaKX?w=1000&h=1400&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "kurtis",
    },
    {
      name: "Embroidered Silk Kurti",
      price: 1899,
      original: 2599,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.vy1b4IWZftgBSNJpoRizMQHaJ8?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "kurtis",
    },
    {
      name: "Printed Aura Kurti",
      price: 1299,
      original: 1799,
      image: "https://ik.imagekit.io/ldqsn9vvwgg/images/1585341.jpg",
      category: "kurtis",
    },
    {
      name: "Printed Zariya Kurti",
      price: 1299,
      original: 2299,
      image:
        "https://i.etsystatic.com/31482892/r/il/b8231a/5634506241/il_1080xN.5634506241_329v.jpg",
      category: "kurtis",
    },
    {
      name: "Printed Nivah Kurti",
      price: 1299,
      original: 2299,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.G8jYtzIFRSfQr4_KwW1UlAHaJS?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "kurtis",
    },
  ],
  allProducts: [
    {
      name: "Banarasi Silk Saree",
      price: 3499,
      original: 4999,
      image:
        "https://i.pinimg.com/originals/6c/31/0a/6c310a0c950262dacd447f59e057ea64.jpg",
      category: "sarees",
    },
    {
      name: "Zariyaa Saree",
      price: 3499,
      original: 4999,
      image:
        "https://i.pinimg.com/originals/be/53/92/be53924ac029d6e492585313554a4914.jpg",
      category: "sarees",
    },
    {
      name: "Meher Saree",
      price: 3499,
      original: 4999,
      image:
        "https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/p/r/prc3837.jpg",
      category: "sarees",
    },
    {
      name: "Roohani Saree",
      price: 3499,
      original: 4999,
      image:
        "https://www.exoticindiaart.com/images/products/original/textiles-2019/gaf778.webp",
      category: "sarees",
    },
    {
      name: "Nazneen Saree",
      price: 3499,
      original: 4999,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.JX37Q0akXO49cwExHfAmHQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "sarees",
    },

    {
      name: "Printed Cotton Kurti",
      price: 1299,
      original: 1799,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.Zo4w05_VIgBSpc_mdzpgjgHaKX?w=1000&h=1400&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "kurtis",
    },
    {
      name: "Embroidered Silk Kurti",
      price: 1899,
      original: 2599,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.vy1b4IWZftgBSNJpoRizMQHaJ8?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "kurtis",
    },
    {
      name: "Printed Aura Kurti",
      price: 1299,
      original: 1799,
      image: "https://ik.imagekit.io/ldqsn9vvwgg/images/1585341.jpg",
      category: "kurtis",
    },
    {
      name: "Printed Zariya Kurti",
      price: 1299,
      original: 2299,
      image:
        "https://i.etsystatic.com/31482892/r/il/b8231a/5634506241/il_1080xN.5634506241_329v.jpg",
      category: "kurtis",
    },
    {
      name: "Printed Nivah Kurti",
      price: 1299,
      original: 2299,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.G8jYtzIFRSfQr4_KwW1UlAHaJS?rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "kurtis",
    },
    {
      name: "Straight Fit Kurti Set",
      price: 1799,
      original: 2299,
      image:
        "https://www.beyoung.in/blog/wp-content/uploads/2023/05/Three-quarter-sleeves-design-Kurti-748x1080.jpg",
      category: "sets",
    },
    {
      name: "Floral Rayon Palazzo Set",
      price: 1799,
      original: 2299,
      image:
        "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/10546080/2019/9/5/834b3c03-8f62-48aa-87f3-874b3fe1e0441567666550723-Embroidered-Straight-Lehariya-Kurta-1191567666549515-1.jpg",
      category: "sets",
    },
    {
      name: "Anarkali Kurti with Palazzo",
      price: 1799,
      original: 2299,
      image:
        "https://cdn.shopclues.com/images/detailed/81789/126337905_JKPLZ2906other1_1504045312.jpg",
      category: "sets",
    },
    {
      name: "Embroidered Kurti Palazzo Set",
      price: 1799,
      original: 2299,
      image:
        "https://images.cbazaar.com/images/pure-cotton-thread-work-kurta-palazzo-set-krsdhs23wcks002pi-u.jpg",
      category: "sets",
    },
    {
      name: "Printed Cotton Palazzo Set",
      price: 1799,
      original: 2299,
      image: "https://assets0.mirraw.com/images/8163300/43_zoom.jpg?1595858845",
      category: "sets",
    },
  ],
  summerCollection: [
    {
      name: "Lightweight Cotton Top",
      price: 1899,
      original: 1299,
      image:
        "https://www.beyoung.in/blog/wp-content/uploads/2023/05/Three-quarter-sleeves-design-Kurti-748x1080.jpg",
      category: "kurtis",
    },
    {
      name: "Soft Rayon Kurti",
      price: 1499,
      original: 999,
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/5/306793254/OF/PB/RL/126322701/designer-cotton-anarkali-kurti-500x500.jpeg",
      category: "dresses",
    },
    {
      name: "Everyday Cotton Top",
      price: 1499,
      original: 1299,
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/7/328024123/CM/AP/QJ/126322701/whatsapp-image-2023-07-22-at-10-29-52-pm-13-500x500.jpeg",
      category: "dresses",
    },  
      {
      name: "Printed Linen Kurti",
      price: 1499,
      original: 1299,
      image:
        "https://i.etsystatic.com/27277651/r/il/14ff9c/5836428331/il_1080xN.5836428331_31l7.jpg",
      category: "dresses",
    },  
      {
      name: "Breezy Georgette Top",
      price: 1499,
      original: 1299,
      image:
        "https://i.etsystatic.com/37650100/r/il/f4cef0/5099381638/il_1080xN.5099381638_9gjw.jpg",
      category: "dresses",
    },
  ],
};

module.exports = { products };
